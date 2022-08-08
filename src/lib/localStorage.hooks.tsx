import {useCallback} from "react";

const SEARCH_TERMS_KEY = 'SEARCH_TERMS';
const COOKIES_CONSENT_KEY = 'COOKIES_CONSENT';
const COOKIES_CONSENT_ACCEPTED = 'cookie_consent_accepted';
const COOKIES_CONSENT_REJECTED = 'cookie_consent_rejected';

const VIEWERS_WARNING_KEY = 'VIEWERS_WARNING';
const VIEWERS_WARNING_ACCEPTED = 'viewers_warning_accepted';
const VIEWERS_WARNING_REJECTED = 'viewers_warning_rejected';


function featureAvailable() {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('feature_test', 'yes');
            if (localStorage.getItem('feature_test') === 'yes') {
                localStorage.removeItem('feature_test');
                // localStorage is enabled
                return true;
            } else {
                // localStorage is disabled
                return false;
            }
        } catch (e) {
            // localStorage is disabled
            return false;
        }
    } else {
        // localStorage is not available
        return false;
    }
}

function exists(key: string) {
    if (featureAvailable()) {
        return localStorage.getItem(key) !== null;
    }
}

function append<T>(key: string, value: T) {
    if (featureAvailable()) {
        if (exists(key)) {
            let values = JSON.parse(localStorage.getItem(key) as string);
            if (!values.includes(value)) {
                values.push(value);
            } else {
                values = [...values.slice(0, values.indexOf(value)), ...values.slice(values.indexOf(value) + 1), value];
            }
            localStorage.setItem(key, JSON.stringify(values));
        } else {
            const values = [value];
            localStorage.setItem(key, JSON.stringify(values));
        }
    }
}

function useCookiesConsent() {
    function saveConsent() {
        localStorage.setItem(COOKIES_CONSENT_KEY, COOKIES_CONSENT_ACCEPTED);
    }

    function fetchConsent() {
        return localStorage.getItem(COOKIES_CONSENT_KEY);
    }

    function rejectConsent() {
        localStorage.setItem(COOKIES_CONSENT_KEY, COOKIES_CONSENT_REJECTED);
    }

    function clearConsent() {
        localStorage.removeItem(COOKIES_CONSENT_KEY);
    }

    function isAccepted() {
        return localStorage.getItem(COOKIES_CONSENT_KEY) === COOKIES_CONSENT_ACCEPTED;
    }

    function isRejected() {
        return localStorage.getItem(COOKIES_CONSENT_KEY) === COOKIES_CONSENT_REJECTED;
    }

    return {saveConsent, fetchConsent, clearConsent, rejectConsent, isRejected, isAccepted};
}

function useSearchTerms() {
    const saveSearchTerm =  useCallback(function (searchTerm: string) {
        if (searchTerm && searchTerm.length >= 3) {
            append<string>(SEARCH_TERMS_KEY, searchTerm);
        }
    }, []);

    function fetchSearchTerms(): string[] {
        return JSON.parse(localStorage.getItem(SEARCH_TERMS_KEY) as string);
    }

    function clearSearchTerms() {
        localStorage.removeItem(SEARCH_TERMS_KEY);
    }

    return {saveSearchTerm, fetchSearchTerms, clearSearchTerms};
}

function useViewersWarning() {
    function accept() {
        localStorage.setItem(VIEWERS_WARNING_KEY, VIEWERS_WARNING_ACCEPTED);
    }

    function reject() {
        localStorage.setItem(VIEWERS_WARNING_KEY, VIEWERS_WARNING_REJECTED);
    }

    function isAccepted() {
        return localStorage.getItem(VIEWERS_WARNING_KEY) === VIEWERS_WARNING_ACCEPTED;
    }

    return {accept, reject, isAccepted};
}

export {useSearchTerms, useCookiesConsent, useViewersWarning};
