import {Alert, AlertTitle, Button} from "@material-ui/core";
import {useCookiesConsent} from "../lib/localStorage.hooks";
import {useState} from "react";

function CookieConsent() {
    const {saveConsent, rejectConsent, isRejected, clearConsent, isAccepted} = useCookiesConsent();
    const [accepted, setAccepted] = useState(isAccepted());
    const [rejected, setRejected] = useState(isRejected());

    function onAcceptConsent() {
        if (!isAccepted()) {
            setAccepted(true);
            setRejected(false);
            clearConsent();
            saveConsent();
        }
    }

    function onRejectConsent() {
        if (!isRejected()) {
            setAccepted(false);
            setRejected(true);
            clearConsent();
            rejectConsent();
            window.close();
        }
    }

    function onClearConsent() {
        setRejected(false);
        setAccepted(false);
        clearConsent();
    }

    return <div className="cookie-consent-container">
        {!accepted &&
        <div>
            <Alert severity={rejected ? "warning" : "info"} variant="outlined">
                <AlertTitle>Cookies Consent</AlertTitle>
                We use necessary cookies, localStorage for site to function. — <strong>We don't track users or
                behavior.</strong>
                <div className="button-container">
                    <Button variant="contained" color="success" onClick={onAcceptConsent}>Accept</Button>
                    <Button onClick={onRejectConsent} variant="outlined" color="error">Reject</Button>
                    <Button onClick={onClearConsent} variant="outlined">Clear consent</Button>
                </div>
            </Alert>
        </div>
        }
    </div>;
}

export {CookieConsent};
