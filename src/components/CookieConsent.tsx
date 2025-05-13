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
            <div className={`alert ${rejected ? "alert-warning" : "alert-info"}`}>
                <div className="alert-title">Cookies Consent</div>
                <p>
                    We use necessary cookies, localStorage for site to function. — <strong>We don't track users or
                    behavior.</strong>
                </p>
                <div className="button-container">
                    <button className="btn btn-success" onClick={onAcceptConsent}>Accept</button>
                    <button className="btn btn-error" onClick={onRejectConsent}>Reject</button>
                    <button className="btn btn-outline" onClick={onClearConsent}>Clear consent</button>
                </div>
            </div>
        </div>
        }
    </div>;
}

export {CookieConsent};
