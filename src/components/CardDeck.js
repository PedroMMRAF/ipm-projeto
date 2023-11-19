import React, { useRef } from "react";

import { Button } from "react-bootstrap";

import styles from "./CardDeck.module.css";

const CardDeck = {
    Horizontal: ({ cardItems = [], childItem }) => {
        const containerRef = useRef(null);

        const scroll = (scrollStep) => {
            const container = containerRef.current;

            if (container) {
                container.scrollTo({
                    top: 0,
                    left: container.scrollLeft + scrollStep * container.offsetWidth,
                    behavior: "smooth",
                });
            }
        };

        return (
            <div className={styles.scrollableHorizontal}>
                <Button
                    variant="secondary"
                    style={{ marginRight: "1rem" }}
                    className={styles.scrollButton}
                    onClick={() => scroll(-1)}
                >
                    <i className="bi bi-chevron-left"></i>
                </Button>
                <div ref={containerRef} className={"p-0 overflow-auto " + styles.cardDeckHorizontal}>
                    {cardItems.map((element, index) => (
                        <div
                            key={index}
                            style={{
                                marginLeft: index === 0 ? "0" : "1rem",
                            }}
                        >
                            {childItem(element)}
                        </div>
                    ))}
                </div>
                <Button
                    variant="secondary"
                    style={{ marginLeft: "1rem" }}
                    className={styles.scrollButton}
                    onClick={() => scroll(1)}
                >
                    <i className="bi bi-chevron-right"></i>
                </Button>
            </div>
        );
    },
    Vertical: ({ className, style = {}, cardItems = [], childItem, ...params }) => {
        const containerRef = useRef(null);

        const scroll = (scrollStep) => {
            const container = containerRef.current;

            if (container) {
                container.scrollTo({
                    top: container.scrollTop + scrollStep * container.offsetHeight,
                    behavior: "smooth",
                });
            }
        };

        return (
            <div {...params} className={styles.scrollableVertical + " " + className} style={style}>
                <Button
                    variant="secondary"
                    style={{ marginBottom: "1rem" }}
                    className={styles.scrollButton}
                    onClick={() => scroll(-1)}
                >
                    <i className="bi bi-chevron-up"></i>
                </Button>
                <div ref={containerRef} className={"p-0 overflow-auto " + styles.cardDeckVertical}>
                    {cardItems.map((element, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop: index === 0 ? "0" : "1rem",
                            }}
                        >
                            {childItem(element)}
                        </div>
                    ))}
                </div>
                <Button
                    variant="secondary"
                    style={{ marginTop: "1rem" }}
                    className={styles.scrollButton}
                    onClick={() => scroll(1)}
                >
                    <i className="bi bi-chevron-down"></i>
                </Button>
            </div>
        );
    },
};

export default CardDeck;
