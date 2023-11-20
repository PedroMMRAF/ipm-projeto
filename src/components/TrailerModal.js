import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function TrailerModal({ movie, show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Body>
                <div className="video-responsive">
                    <iframe
                        style={{ width: "100%", aspectRatio: "16/9" }}
                        src={`https://www.youtube.com/embed/${movie["trailer"]}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}
