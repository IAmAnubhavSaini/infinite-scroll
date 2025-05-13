import React, {useEffect, useState, useCallback, useRef} from 'react';
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
import {CircularProgress} from "@material-ui/core";
import {CookieConsent} from "./components/CookieConsent";
import ViewersWarning from "./components/ViewersWarning";
import {useScroll} from "./lib/scroll.hooks";
import ErrorBoundary from './components/ErrorBoundary';
import debounce from 'lodash/debounce';

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
    const isLoadingRef = useRef(false); // Use ref to track loading state without causing rerenders
    const currentPageRef = useRef(1);
    // const photos = photosToImages(initialData.photos.photo);
    const {saveSearchTerm, fetchSearchTerms} = useSearchTerms();
    const {shouldLoadMore, resetTrigger} = useScroll(0.8);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            if (!searchTerm) return;

            try {
                const apiUrl = searchApi(searchTerm);
                fetch(apiUrl)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then((data: FlickrApiResponse) => {
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
            } catch (e) {
                setAppState(s => ({
                    ...s,
                    error: e as Error,
                    hasError: true,
                    isLoading: false
                }));
            }
        }, 300),
        []
    );

    // This function is for subsequent loading during scroll
    const fetchRecentFromNetwork = useCallback((page: number, perPage: number) => {
        // Skip if already loading to prevent multiple simultaneous requests
        if (isLoadingRef.current) return; 
        
        isLoadingRef.current = true;
        setAppState(s => ({...s, isLoading: true}));
        
        fetch(recentApi(page, perPage))
            .then(res => res.json())
            .then((data: FlickrApiResponse) => {
                currentPageRef.current = page + 1;
                setAppState(s => ({
                    ...s,
                    isLoading: false,
                    recentPhotos: [...s.recentPhotos, ...photosToImages(data.photos.photo)],
                    isInSearch: false,
                    isInRecent: true,
                    page: currentPageRef.current
                }));
                isLoadingRef.current = false;
                resetTrigger(); // Reset the scroll trigger after loading more content
            })
            .catch(e => {
                setAppState(s => ({
                    ...s,
                    error: e,
                    hasError: true,
                    isLoading: false,
                }));
                isLoadingRef.current = false;
            });
    }, [resetTrigger]); // Removed appState.isLoading from deps

    // This function is for the initial load - doesn't have the loading check
    const initialFetchFromNetwork = useCallback((page: number, perPage: number) => {
        if (isLoadingRef.current) return;
        
        isLoadingRef.current = true;
        setAppState(s => ({...s, isLoading: true}));
        
        fetch(recentApi(page, perPage))
            .then(res => res.json())
            .then((data: FlickrApiResponse) => {
                currentPageRef.current = page + 1;
                setAppState(s => ({
                    ...s,
                    isLoading: false,
                    recentPhotos: [...s.recentPhotos, ...photosToImages(data.photos.photo)],
                    isInSearch: false,
                    isInRecent: true,
                    page: currentPageRef.current
                }));
                isLoadingRef.current = false;
                resetTrigger();
            })
            .catch(e => {
                setAppState(s => ({
                    ...s,
                    error: e,
                    hasError: true,
                    isLoading: false,
                }));
                isLoadingRef.current = false;
            });
    }, [resetTrigger]);

    // Effect for initial load - runs only once
    useEffect(() => {
        initialFetchFromNetwork(1, appState.perPage);
        const searchTerms = fetchSearchTerms() || [];
        setAppState(state => ({...state, searchTerms}));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Effect to update search terms
    useEffect(() => {
        if (appState.isInSearch) {
            const st = fetchSearchTerms() || [];
            setAppState(state => ({...state, searchTerms: st}));
        }
    }, [appState.isInSearch, fetchSearchTerms]);

    // Effect to handle infinite scroll
    useEffect(() => {
        if (shouldLoadMore && appState.isInRecent && !isLoadingRef.current) {
            fetchRecentFromNetwork(currentPageRef.current, appState.perPage);
        }
    }, [shouldLoadMore, appState.isInRecent, appState.perPage, fetchRecentFromNetwork]);

    const activateSearch = useCallback((searchTerm: string) => {
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            setAppState(state => ({
                ...state,
                isLoading: true,
                isInSearch: true,
                isInRecent: false,
                currentSearchTerm: searchTerm
            }));
            debouncedSearch(searchTerm);
        }
    }, [saveSearchTerm, debouncedSearch]);

    const deactivateSearch = useCallback(() => {
        setAppState(state => ({
            ...state, 
            isInSearch: false, 
            isInRecent: true
        }));
        // Reset the scroll trigger when switching back to recent view
        resetTrigger();
    }, [resetTrigger]);

    return (
        <ErrorBoundary>
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
                    {!appState.isInSearch && appState.isInRecent && (
                        <ErrorBoundary>
                            <Photos photos={appState.recentPhotos}/>
                        </ErrorBoundary>
                    )}
                    {appState.isInSearch && !appState.isInRecent && (
                        <ErrorBoundary>
                            <Photos photos={appState.searchPhotos}/>
                        </ErrorBoundary>
                    )}
                    {appState.isLoading && <CircularProgress/>}
                </div>
            </React.Fragment>
        </ErrorBoundary>
    );
}

export default App;
