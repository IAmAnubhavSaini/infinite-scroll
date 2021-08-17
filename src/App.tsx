import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import initialData from './photos.data.json';
import './styles/App.css';
import {GlobalAppState} from "./lib/app.types";
import {photosToImages} from "./lib/photo.utils";
import Photos from "./components/Photos";
import {TopBar} from './components/TopBar';
import {useSearchTerms} from "./lib/localStorage.hooks";
import {recentApi, searchApi} from "./lib/flickr.apis";
import {FlickrApiResponse} from "./lib/flickr.types";
import {CircularProgress, debounce} from "@material-ui/core";
import {CookieConsent} from "./components/CookieConsent";
import ViewersWarning from "./components/ViewersWarning";
import {useScroll} from "./lib/scroll.hooks";

const defaultState: GlobalAppState = {
    isLoading: true,
    loadingMessage: '',
    hasError: false,
    errorMessage: '',
    error: undefined,
    recentPhotos: [],
    searchPhotos: [],
    isInSearch: false,
    isInRecent: false,
    searchTerms: [],
    currentSearchTerm: '',
    page: 1,
    perPage: 52,
};

function App() {
    const [appState, setAppState] = useState(defaultState);
    // const photos = photosToImages(initialData.photos.photo);
    const {saveSearchTerm, fetchSearchTerms} = useSearchTerms();
    const {scrollTop} = useScroll();

    function fetchRecentFromNetwork(page: number, perPage: number) {
        fetch(recentApi(page, perPage))
            .then(res => res.json())
            .then((data: FlickrApiResponse) => {
                setAppState(s => ({
                    ...s,
                    isLoading: false,
                    recentPhotos: [...appState.recentPhotos, ...photosToImages(data.photos.photo)],
                    isInSearch: false,
                    isInRecent: true,
                    page: page + 1
                }));
            })
            .catch(e => {
                setAppState(s => ({
                    ...s,
                    error: e,
                    hasError: true,
                    isLoading: false,
                }));
            });
    }

    useEffect(() => {
        // This effect fires only once, when we load due to empty dependency list.
        fetchRecentFromNetwork(appState.page, appState.perPage);
        setAppState(state => ({...state, searchTerms: fetchSearchTerms() || []}));
    }, []);

    useEffect(() => {
        const st = fetchSearchTerms() || [];
        setAppState(state => ({...state, searchTerms: st}));
    }, [appState.isInSearch]);

    useEffect(() => {
        if (appState.isInRecent) {
            // debounce(() => fetchRecentFromNetwork(appState.page, appState.perPage), 100);
            fetchRecentFromNetwork(appState.page, appState.perPage)
        }
    }, [scrollTop]);

    function activateSearch(searchTerm: string) {
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            setAppState(state => ({
                ...state,
                isLoading: true,
                isInSearch: true,
                isInRecent: false,
                currentSearchTerm: searchTerm
            }));

            fetch(searchApi(searchTerm))
                .then(res => res.json())
                .then((data: FlickrApiResponse) => {
                    console.log(data);
                    setAppState(s => ({
                        ...s,
                        isLoading: false,
                        searchPhotos: photosToImages(data.photos.photo),
                        isInSearch: true,
                        isInRecent: false
                    }));
                })
                .catch(e => {
                    setAppState(s => ({
                        ...s,
                        error: e,
                        hasError: true,
                        isLoading: false
                    }));
                });
        }
    }

    function deactivateSearch() {
        setAppState(state => ({...state, isInSearch: false, isInRecent: true}));
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <div className="App">
                <TopBar searchProps={{
                    isInSearch: appState.isInSearch,
                    searchTerms: appState.searchTerms,
                    searchPhotos: appState.searchPhotos,
                    activateSearch,
                    deactivateSearch,
                    currentSearchTerm: appState.currentSearchTerm
                }}/>
                <CookieConsent/>
                <ViewersWarning/>
                {!appState.isInSearch && appState.isInRecent && <Photos photos={appState.recentPhotos}/>}
                {appState.isInSearch && !appState.isInRecent && <Photos photos={appState.searchPhotos}/>}
                {appState.isLoading && <CircularProgress/>}
            </div>
        </React.Fragment>
    );
}

export default App;
