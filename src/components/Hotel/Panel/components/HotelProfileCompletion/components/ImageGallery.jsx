import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import Dropzone from '../../../../../common/Dropzone';
import React, { useContext } from 'react';
import './ImageGallery.css'
import { toast } from 'react-toastify';
import ImagesSwiper from './ImagesContainer';
import { useEffect, useState } from 'react';
import useAxios from "../../../../../../utils/useAxios";
import AuthContext from "../../../../../../context/AuthContext";
import { baseURL } from '../../../../../../utils/useAxios';


const DropzoneStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "200px",
    padding: "5px",
    borderStyle: "dotted",
    borderWidth: "4px",
    borderColor: "#c5a401",
    borderRadius: "10px",
    cursor: "pointer",
}

const ImageGallery = ({ hotel_id, loading, setLoading }) => {

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [popupImage, setPopupImage] = useState(null);
    const [images, setImages] = useState([]);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [deleteImagePopupOpen, setDeleteImagePopupOpen] = useState(false);

    const api = useAxios();
    const { authData } = useContext(AuthContext);

    function fetchImages() {

        setLoading(false);

        api.get(`/api/hotel/${hotel_id}/`,
            {
                headers: {
                    "Authorization": `Bearer ${authData?.access}`
                }
            }
        ).then(res => {
            setImages(res.data.images);
            console.log(res.data.images);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (loading) {
            fetchImages();
        }
    }, [loading, images, hotel_id])


    function handleFile(files) {

        if (files.length !== 1) {
            toast.error('فایل انتخاب شده معتبر نیست', { position: 'top-right', autoClose: 2000 });
            return;
        }

        let image = files[0];

        setSelectedImage(image);
        setPopupImage(URL.createObjectURL(image));
        setOpen(true);
    }

    function sendImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('hotel', hotel_id);

        api.post(`/api/hotel/image/`, formData, { 'headers': { 'Authorization': `Bearer ${authData?.access}` } })
            .then(res => {
                setImages([...images, res.data]);
                toast.success('تصویر با موفقیت آپلود شد', { position: 'top-right', autoClose: 2000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('مشکلی در آپلود تصویر پیش آمده است', { position: 'top-right', autoClose: 2000 });
            })
    }

    function handleAccept() {
        sendImage(selectedImage);
        handleClose();
    }

    function handleCancel() {
        handleClose();
    }

    function handleClose() {
        setOpen(false);
    }

    function handleDeleteImage(image) {
        setDeleteImagePopupOpen(true);
        setImageToDelete(image);
    }

    function deleteImage() {
        setDeleteImagePopupOpen(false);
        api.delete(`/api/hotel/image/${imageToDelete.id}/`, { 'headers': { 'Authorization': `Bearer ${authData?.access}` } })
            .then(res => {
                setImages(images.filter(img => img.id !== imageToDelete.id));
                setImageToDelete(null);
                toast.success('تصویر با موفقیت حذف شد', { position: 'top-right', autoClose: 2000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('مشکلی در حذف تصویر پیش آمده است', { position: 'top-right', autoClose: 2000 });
            })
    }

    return (
        <Container>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12} sm={12} md={12}>
                    <Dropzone CssBaseLine={true} handleFile={handleFile} iconColor={"hotel"} BaseStyle={DropzoneStyle} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>
                            آیا می خواهید تصویر اضافه شود؟
                        </DialogTitle>
                        <DialogContent>
                            <img src={popupImage} className="popup-image" alt="selected image" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancel} variant="outlined">لغو</Button>
                            <Button onClick={handleAccept} color="success" variant="outlined" autoFocus>ذخیره تصویر</Button>
                        </DialogActions>
                    </Dialog>

                    <ImagesSwiper images={images} deleteImage={handleDeleteImage} />

                    <Dialog
                        open={deleteImagePopupOpen}
                        onClose={() => setDeleteImagePopupOpen(false)}
                    >
                        <DialogTitle>
                            آیا می خواهید تصویر حذف شود؟
                        </DialogTitle>
                        <DialogContent>
                            <img src={imageToDelete ? (imageToDelete.image.includes(baseURL) ? imageToDelete.image : baseURL + imageToDelete.image) : null} className="popup-image" alt="image to delete" />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setDeleteImagePopupOpen(false)} variant="outlined">لغو</Button>
                            <Button onClick={deleteImage} color="error" variant="outlined" autoFocus>حذف تصویر</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ImageGallery;
