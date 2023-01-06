import {
    Card,
    Typography,
    Rating,
    Box,
} from '@mui/material';
import React, { useState } from 'react';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import theme from '../../../assets/theme/defaultTheme';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';


function ReviewCard({ voter, score, text }) {
    const [voterInfo, setVoterInfo] = useState();

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
                    {score > 2 ? 
                        <SentimentSatisfiedAltOutlinedIcon 
                            sx={{
                                color: theme.palette.secondary.main,
                                marginRight: "5px",
                            }}
                        /> : 
                        <SentimentDissatisfiedOutlinedIcon 
                            sx={{
                                color: theme.palette.error.main,
                                marginRight: "5px",
                            }}
                        />
                    }
                    <Rating
                        value={score}
                        readOnly={true}
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
                    <MessageOutlinedIcon sx={{
                        marginBottom: "-8px",
                        marginRight: "5px",
                    }} /> {text}
                </Typography>
            </Box>
        </>
    )
}

export default ReviewCard;
