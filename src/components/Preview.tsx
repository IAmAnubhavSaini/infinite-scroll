import {_nTo_z} from "../lib/photo.utils";
import {Modal, Typography} from "@material-ui/core";

function Preview(props: any) {
    const url = _nTo_z(props.url);

    return (
        <div onClick={e => e.stopPropagation()} style={{position: "relative"}}>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
            >
                <div style={{
                    border: "thick solid white",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    boxShadow: "2px 2px 5px black",
                    color: "white",
                    borderRadius: "4px"
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div style={{
                            backgroundColor: 'black',
                            padding: "0.5rem"
                        }}>
                            {props.title}
                        </div>
                    </Typography>

                    <div>
                        <img src={url} alt={`${props.title} at ${url}`}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Preview;