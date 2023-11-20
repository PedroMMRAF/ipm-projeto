import { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { Rating, Typography } from "@mui/material";

export default function ReviewModal({ movie, show, onClose, onChange }) {
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0);

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
                    value={reviewRating}
                    onChange={(_, reviewValue) => setReviewRating(reviewValue)}
                />
                <p></p>
                <textarea
                    id="textarea"
                    style={{ width: "100%" }}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        onClose();
                        onChange(reviewRating, reviewText);
                    }}
                >
                    Review
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
