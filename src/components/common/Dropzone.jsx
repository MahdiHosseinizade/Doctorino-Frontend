import { Box } from '@mui/material';
import React from 'react';
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "300px",
    padding: "5px",
    border: "2px dashed #c5a401",
    borderRadius: "10px",
    // fill all the space that is available
    flex: 1
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


function Dropzone(props) {

    // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'image/*': [] } });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    return (
        <Box className="dropzone-container">
            <div {...getRootProps({ style: style, className: "dropzone" })}>
                <input {...getInputProps()} />
                {props.image && !props.image.includes("default") ?
                    <img src={props.image} className="dropzone-image" /> :
                    <CloudUploadIcon color="primary" fontSize='large'/>
                }
            </div>
        </Box>
    );
}

export default Dropzone;