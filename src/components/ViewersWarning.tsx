import React, {useState} from "react";
import {Alert, AlertTitle, Button} from "@material-ui/core";
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
            <Alert severity="error" variant="outlined">
                <AlertTitle>Warning: Unfiltered content.</AlertTitle>
                This application fetches images from public service.<br/>
                People may choose to upload disturbing content, containing but not limited to:<br/>
                <strong>sexual, child abuse, self-harm, gore, mutilation etc.</strong>
                <br/>
                Continue only if you are okay with this.
                <div className="button-container">
                    <Button variant="contained" color="success" onClick={handleAccept}>
                        I understand. Let me continue to app anyway.
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Close the browser tab/window.
                    </Button>
                </div>
            </Alert>
        </div>
        }
    </div>;
}

export default ViewersWarning;
