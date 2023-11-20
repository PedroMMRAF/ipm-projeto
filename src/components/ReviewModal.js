import { Button, Modal } from "react-bootstrap";
import { Rating, Typography } from "@mui/material";

export default function ReviewModal({ movie, show, onClose, value, onChange }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontFamily: "'Source Sans Pro',Arial,sans-serif" }}>
                    Rate {movie["title"]}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Typography component="legend">Give us your opinion</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(_, newValue) => {
                        onChange(newValue);
                    }}
                />
                <p></p>
                <textarea id="textarea" style={{ width: "100%" }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Review
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
