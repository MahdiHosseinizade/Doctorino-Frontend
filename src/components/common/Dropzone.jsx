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
    height: "100%",
    padding: "5px",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "#c5a401",
    borderRadius: "10px",
};

const fileDialogActiveStyle = {
    borderColor: '#000',
    borderWidth: '4px',
}

const focusedStyle = {
    borderColor: '#2196f3',
    borderWidth: '4px',
};

const acceptStyle = {
    borderColor: '#00e676',
    borderWidth: '4px',
};

const rejectStyle = {
    borderColor: '#ff1744',
    borderWidth: '4px',
};


function Dropzone({ CssBaseLine, handleFile, imageToShow, ...props}) {

    const onDrop = (acceptedFiles) => {
        if (handleFile) {
            handleFile(acceptedFiles);
        }
    }

    const {
        getRootProps,
        getInputProps,
        isFileDialogActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: { 'image/*': [] }, onDrop, multiple: false });

    let style = useMemo(() => ({
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(isFileDialogActive ? fileDialogActiveStyle : {}),
    }), [
        isFocused,
        isDragAccept,
        isDragReject,
        isFileDialogActive,
    ]);

    if (!CssBaseLine) {
        style = { ...style, ...baseStyle }
    }


    return (
        <Box className="dropzone-container">
            <div {...getRootProps({ style: style, className: 'dropzone' })}>
                <input {...getInputProps()} />
                {imageToShow && !imageToShow.includes("default") ?

                    <img src={imageToShow} className="dropzone-image" /> :

                    <CloudUploadIcon color="primary" fontSize='large' />
                }
            </div>
        </Box>
    );
}

export default Dropzone;