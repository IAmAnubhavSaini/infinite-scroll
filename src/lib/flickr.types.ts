
type FlickrPhoto = {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
}

type FlickrPhotos = {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: FlickrPhoto[];

}
type FlickrApiResponse = {
    photos: FlickrPhotos;
    stat: string;
}

export type {FlickrPhoto, FlickrPhotos, FlickrApiResponse};
