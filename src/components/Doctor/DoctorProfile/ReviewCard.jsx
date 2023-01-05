import {
    Card,
    Typography,
    Rating,
    Box,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import theme from '../../../assets/theme/defaultTheme';

function ReviewCard({ voter, score, text }) {

    const [loading, setLoading] = useState(true);
    const [voterInfo, setVoterInfo] = useState();

    useEffect(() => {
        if (loading) {

        }
    }, [loading])


    return (
        <>
            <Box
                sx={{
                    padding: "10px",
                }}
            >
                <Typography sx={{
                    marginBottom: "10px",
                }}>
                    کاربر: <span>    </span> {voter}
                </Typography>
                <Typography sx={{
                    marginBottom: "10px",
                }}>
                    <Rating
                        value={score}
                        readOnly="true"
                        sx={{
                            color: theme.palette.doctor.main,
                        }}
                        icon={<ThumbUpAlt fontSize="inherit" />}
                        emptyIcon={<ThumbDownAltOutlinedIcon fontSize="inherit" />}
                    />
                </Typography>
                <Typography variant='body2' sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                }}>
                    {text}
                </Typography>
            </Box>
        </>
    )
}

export default ReviewCard;
