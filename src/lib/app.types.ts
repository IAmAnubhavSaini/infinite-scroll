type ImageURLs = {
    small: string;
    medium: string;
}
type Image = {
    url: ImageURLs;
    title?: string;
    alt: string;
}

type LoadingState = {
    isLoading: boolean;
    loadingMessage: string;
}
type ErrorState = {
    hasError: boolean;
    errorMessage: string;
    error?: Error;
}
type SearchState = {
    searchPhotos: Image[];
    isInSearch: boolean;
    searchTerms: string[];
    currentSearchTerm: string;
}
type RecentState = {
    recentPhotos: Image[];
    isInRecent: boolean;
    page: number;
    perPage: number;
}

type ScrollState = {
    scrollTop: number;
}

type GlobalAppState = {} & LoadingState & ErrorState & SearchState & RecentState;

type PhotosProps = {
    photos: Image[];
}

type SearchBarProps = {
    activateSearch: Function;
    deactivateSearch: Function;
} & SearchState;

type TopBarProps = {
    searchProps: SearchBarProps
}

export type {
    ImageURLs,
    Image,
    LoadingState,
    ErrorState,
    SearchState,
    RecentState,
    GlobalAppState,
    PhotosProps,
    SearchBarProps,
    TopBarProps
};
