import { useEffect, useState, useCallback, useRef } from 'react';
import './styles/App.css';
import './styles/components.css';
import { GlobalAppState } from "./lib/app.types";
import { photosToImages } from "./lib/photo.utils";
import Photos from "./components/Photos";
import { TopBar } from './components/TopBar';
import { useSearchTerms } from "./lib/localStorage.hooks";
import { recentApi, searchApi } from "./lib/flickr.apis";
import { FlickrApiResponse } from "./lib/flickr.types";
import { CookieConsent } from "./components/CookieConsent";
import ViewersWarning from "./components/ViewersWarning";
import { useScroll } from "./lib/scroll.hooks.js";
import ErrorBoundary from './components/ErrorBoundary';
import { debounce } from './lib/debounce.js';

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
    const isLoadingRef = useRef(false);
    const currentPageRef = useRef(1);
    const { saveSearchTerm, fetchSearchTerms } = useSearchTerms();
    const { shouldLoadMore, resetTrigger } = useScroll(0.8);

    const deactivateSearch = useCallback(() => {
        setAppState(state => ({
            ...state,
            isInSearch: false,
            isInRecent: true,
            searchPhotos: [],
            currentSearchTerm: '',
            hasError: false,
            error: undefined
        }));
        resetTrigger();
    }, [resetTrigger]);

    // Debounced search function with improved error handling
    const debouncedSearch = useCallback(
        debounce(async (searchTerm: string) => {
            if (!searchTerm?.trim()) {
                setAppState(s => ({
                    ...s,
                    isLoading: false,
                    searchPhotos: [],
                    isInSearch: false,
                    isInRecent: true
                }));
                return;
            }

            try {
                const apiUrl = searchApi(searchTerm);
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }

                const data: FlickrApiResponse = await response.json();

                if (!data?.photos?.photo) {
                    throw new Error('Invalid response format from Flickr API');
                }

                setAppState(s => ({
                    ...s,
                    isLoading: false,
                    searchPhotos: photosToImages(data.photos.photo),
                    isInSearch: true,
                    isInRecent: false,
                    hasError: false,
                    error: undefined
                }));
            } catch (e) {
                console.error('Search error:', e);
                setAppState(s => ({
                    ...s,
                    error: e as Error,
                    hasError: true,
                    isLoading: false,
                    searchPhotos: []
                }));
            }
        }, 300),
        []
    );

    const activateSearch = useCallback((searchTerm: string) => {
        if (!searchTerm?.trim()) {
            deactivateSearch();
            return;
        }

        saveSearchTerm(searchTerm);
        setAppState(state => ({
            ...state,
            isLoading: true,
            isInSearch: true,
            isInRecent: false,
            currentSearchTerm: searchTerm,
            hasError: false,
            error: undefined
        }));
        debouncedSearch(searchTerm);
    }, [saveSearchTerm, debouncedSearch, deactivateSearch]);

    // This function is for subsequent loading during scroll
    const fetchRecentFromNetwork = useCallback((page: number, perPage: number) => {
        // Skip if already loading to prevent multiple simultaneous requests
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        setAppState(s => ({ ...s, isLoading: true }));

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
        setAppState(s => ({ ...s, isLoading: true }));

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
        setAppState(state => ({ ...state, searchTerms }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Effect to update search terms - only when search terms are saved
    useEffect(() => {
        const st = fetchSearchTerms() || [];
        if (appState.isInSearch && JSON.stringify(st) !== JSON.stringify(appState.searchTerms)) {
            setAppState(state => ({ ...state, searchTerms: st }));
        }
    }, [appState.isInSearch]); // Remove fetchSearchTerms from dependencies

    // Effect to handle infinite scroll
    useEffect(() => {
        if (shouldLoadMore && appState.isInRecent && !isLoadingRef.current) {
            fetchRecentFromNetwork(currentPageRef.current, appState.perPage);
        }
    }, [shouldLoadMore, appState.isInRecent, appState.perPage, fetchRecentFromNetwork]);

    return (
        <ErrorBoundary>
            <div className="App">
                <TopBar searchProps={{
                    isInSearch: appState.isInSearch,
                    searchTerms: appState.searchTerms,
                    searchPhotos: appState.searchPhotos,
                    activateSearch,
                    deactivateSearch,
                    currentSearchTerm: appState.currentSearchTerm
                }} />
                <CookieConsent />
                <ViewersWarning />
                {appState.hasError && (
                    <div className="error-message">
                        Error: {appState.error?.message || 'Something went wrong'}
                    </div>
                )}
                {!appState.isInSearch && appState.isInRecent && (
                    <ErrorBoundary>
                        <Photos photos={appState.recentPhotos} />
                    </ErrorBoundary>
                )}
                {appState.isInSearch && !appState.isInRecent && (
                    <ErrorBoundary>
                        <Photos photos={appState.searchPhotos} />
                    </ErrorBoundary>
                )}
                {appState.isLoading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;
