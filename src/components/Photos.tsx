import * as React from 'react';
import {Image, PhotosProps} from '../lib/app.types';
import Preview from "./Preview";

function Photos(props: PhotosProps) {
    const {photos} = props;
    const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());
    const [visibleCount, setVisibleCount] = React.useState(4); // Start with 4 images (1 per column)

    // Create stacks for the masonry layout
    const stacks = [
        photos.filter((_, i: number) => i % 4 === 0),
        photos.filter((_, i: number) => i % 4 === 1),
        photos.filter((_, i: number) => i % 4 === 2),
        photos.filter((_, i: number) => i % 4 === 3),
    ];

    // Handle image load completion
    const handleImageLoaded = (photoKey: string) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(photoKey);
            
            // If all current visible images are loaded, show more
            if (newSet.size >= visibleCount && visibleCount < photos.length) {
                // Add 4 more images (1 per column)
                setTimeout(() => setVisibleCount(prev => prev + 4), 100);
            }
            return newSet;
        });
    };

    return (
        <div className="photos-grid">
            {stacks.map((images: Image[], stackIndex: number) => (
                <div className="photos-column" key={`photos-column-${stackIndex}`}>
                    <div className="photos-stack">
                        {images.map((photo: Image, index: number) => {
                            const globalIndex = index * 4 + stackIndex;
                            if (globalIndex >= visibleCount) return null;

                            const photoKey = `photo-${stackIndex}-${index}-${photo.url.small.substring(photo.url.small.lastIndexOf('/') + 1)}`;
                            return (
                                <Photo
                                    key={photoKey}
                                    photo={photo}
                                    index={index}
                                    photoKey={photoKey}
                                    onLoad={handleImageLoaded}
                                    isVisible={globalIndex < visibleCount}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Photos;

interface PhotoProps {
    photo: Image;
    index: number;
    photoKey: string;
    onLoad: (photoKey: string) => void;
    isVisible: boolean;
}

function Photo(props: PhotoProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {photo, photoKey, onLoad, isVisible} = props;
    
    const handleImageLoad = () => {
        onLoad(photoKey);
    };

    if (!isVisible) return null;
    
    return (
        <div className="photo-container">
            <img 
                src={photo.url.small}
                alt={photo.alt}
                title={`${photo.title} at ${photo.url.small}`}
                className="photo-image"
                onClick={handleOpen}
                loading="lazy"
                onLoad={handleImageLoad}
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
        </div>
    );
}
