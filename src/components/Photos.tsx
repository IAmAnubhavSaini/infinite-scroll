import * as React from 'react';
import {styled} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Image, PhotosProps} from '../lib/app.types';
import {Stack} from '@material-ui/core';

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
                                        <ImageContainer key={`image-container-${index}`}>
                                            <img src={photo.url.small}
                                                 alt={photo.alt}
                                                 title={`${photo.title} at ${photo.url.small}`}
                                                 style={{width: '100%'}}
                                            />
                                        </ImageContainer>
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
