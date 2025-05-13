import {_nTo_z} from "../lib/photo.utils";
import Modal from "./Modal";

interface PreviewProps {
    open: boolean;
    handleClose: () => void;
    url: string;
    title: string | undefined;
    alt: string;
}

function Preview({ open, handleClose, url, title, alt }: PreviewProps) {
    const fullUrl = _nTo_z(url);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
        >
            <div className="preview-container">
                <h2 id="modal-title" className="preview-title">
                    {title}
                </h2>
                <div>
                    <img 
                        src={fullUrl} 
                        alt={`${title} at ${fullUrl}`}
                        className="preview-image"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default Preview;