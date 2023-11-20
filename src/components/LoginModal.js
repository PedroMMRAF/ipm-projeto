import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

export function useLoginState() {
    return useState(null);
}

export default function LoginModal({ loginState, showState }) {
    const [loggedIn, setLoggedIn] = loginState;
    const [show, setShow] = showState;

    useEffect(() => {
        setLoggedIn(window.localStorage.getItem("loggedIn") == "true");
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log("Storage change", event.detail.value);
            if (loggedIn != event.detail.value) setLoggedIn(event.detail.value);
        };

        window.addEventListener("loggedIn", handleStorageChange);

        return () => {
            window.removeEventListener("loggedIn", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (loggedIn == null) return;

        const prevValue = window.localStorage.getItem("loggedIn") == "true";
        if (prevValue == loggedIn) return;

        window.localStorage.setItem("loggedIn", loggedIn);
        window.dispatchEvent(new CustomEvent("loggedIn", { detail: { value: loggedIn } }));
    }, [loggedIn]);

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="d-flex flex-nowrap align-items-center">
                        <Form.Label className="p-0 m-2 w-25">Username</Form.Label>
                        <Form.Control className="m-2" type="text" placeholder="Enter your username" />
                    </Form.Group>

                    <Form.Group className="d-flex flex-nowrap align-items-center">
                        <Form.Label className="p-0 m-2 w-25">Password</Form.Label>
                        <Form.Control className="m-2" type="password" placeholder="Enter your password" />
                    </Form.Group>

                    <Form.Control
                        type="button"
                        className="mt-3 btn btn-primary"
                        value="Login"
                        onClick={() => {
                            setLoggedIn(true);
                            setShow(false);
                        }}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
}
