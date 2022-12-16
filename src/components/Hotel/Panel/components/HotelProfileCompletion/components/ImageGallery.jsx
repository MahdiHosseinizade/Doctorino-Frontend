import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import Dropzone from '../../../../../common/Dropzone';
import React from 'react';
import './ImageGallery.css'
import { toast } from 'react-toastify';
import ImagesSwiper from './ImagesContainer';

const ImageGallery = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [popupImage, setPopupImage] = React.useState(null);
    const [images, setImages] = React.useState([]);
    const [imageToDelete, setImageToDelete] = React.useState(null);
    const [deleteImagePopupOpen, setDeleteImagePopupOpen] = React.useState(false);

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

    function handleAccept() {
        setImages([...images, selectedImage]);
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
        setImages(images.filter(img => img !== imageToDelete));
        setImageToDelete(null);
    }

    return (
        <Container>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12} sm={12} md={12}>
                    <Dropzone CssBaseLine={true} handleFile={handleFile} />
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
                            <Button onClick={handleCancel} color="error" variant="outlined">لغو</Button>
                            <Button onClick={handleAccept} variant="outlined" autoFocus>ذخیره تصویر</Button>
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
                            <img src={imageToDelete && URL.createObjectURL(imageToDelete)} className="popup-image" alt="image to delete" />
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
