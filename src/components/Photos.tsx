import * as React from 'react';
import {styled} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Image, PhotosProps} from '../lib/app.types';
import {Modal, Stack, Typography} from '@material-ui/core';
import Preview from "./Preview";

const ImageContainer = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function Photos(props: PhotosProps) {


    const {photos} = props;
    const stacks = [
        photos.filter((_, i: number) => i % 4 === 0),
        photos.filter((_, i: number) => i % 4 === 1),
        photos.filter((_, i: number) => i % 4 === 2),
        photos.filter((_, i: number) => i % 4 === 3),
    ];
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                {stacks.map((images: Image[], stackIndex: number) => {
                    return (
                        <Grid item xs={3} key={`photos-grid-${stackIndex}`}>
                            <Stack spacing={2} key={`photos-stack-${stackIndex}`}>
                                {images.map((photo: Image, index: number) => {
                                    return (
                                        <Photo
                                            photo={photo}
                                            index={index}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>

        </Box>
    );
}

export default Photos;

function Photo(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {photo, index} = props;
    return (
        <ImageContainer key={`image-container-${index}`}>
            <img src={photo.url.small}
                 alt={photo.alt}
                 title={`${photo.title} at ${photo.url.small}`}
                 style={{width: '100%'}}
                 onClick={handleOpen}
            />
            {open &&
            <Preview
                open={open}
                handleClose={handleClose}
                alt={photo.alt}
                url={photo.url.medium}
                title={photo.title}
            />
            }
        </ImageContainer>
    );
}