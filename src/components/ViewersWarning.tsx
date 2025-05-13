import React, {useState} from "react";
import {useViewersWarning} from "../lib/localStorage.hooks";

function ViewersWarning() {
    const {accept, reject, isAccepted} = useViewersWarning();
    const [accepted, setAccepted] = useState(isAccepted());

    const handleClose = () => {
        setAccepted(false);
        reject();
        window.close();
    };

    const handleAccept = () => {
        setAccepted(true);
        accept();
    };
    
    return <div className="viewers-warning-container">
        {!accepted &&
        <div>
            <div className="alert alert-error">
                <div className="alert-title">Warning: Unfiltered content.</div>
                <p>
                    This application fetches images from public service.<br/>
                    People may choose to upload disturbing content, containing but not limited to:<br/>
                    <strong>sexual, child abuse, self-harm, gore, mutilation etc.</strong>
                    <br/>
                    Continue only if you are okay with this.
                </p>
                <div className="button-container">
                    <button className="btn btn-error" onClick={handleAccept}>
                        I understand. Let me continue to app anyway.
                    </button>
                    <button className="btn btn-outline-error" onClick={handleClose}>
                        Close the browser tab/window.
                    </button>
                </div>
            </div>
        </div>
        }
    </div>;
}

export default ViewersWarning;
