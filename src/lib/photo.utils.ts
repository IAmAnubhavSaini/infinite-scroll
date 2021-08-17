import {FlickrPhoto} from "./flickr.types";
import {Image, ImageURLs} from "./app.types";


const PHOTO_SIZE = {
    thumbnail75: '_s',
    thumbnail150: '_q',
    thumbnail100: '_t',
    small240: '_m',
    small320: '_n',
    small400: '_w',
    medium500: '',
    medium640: '_z',
    medium800: '_c'
};

function photosToUrls(photos: FlickrPhoto[]): ImageURLs[] {
    return photos.map(makeUrl);
}

function makeUrl(photo: FlickrPhoto): ImageURLs {
    return {
        small: `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}${PHOTO_SIZE.small320}.jpg`,
        medium: `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}${PHOTO_SIZE.medium800}.jpg`
    };
}

function photosToImages(photos: FlickrPhoto[]): Image[] {
    return photos.map((p: FlickrPhoto) => {
        const url = makeUrl(p);
        const alt = p.title;
        const title = `${p.title}`;
        return {url, alt, title};
    });
}

function _nTo_z(url: string): string {
    return url.replace('_n', '_z');
}

export {makeUrl, photosToUrls, photosToImages, _nTo_z};
