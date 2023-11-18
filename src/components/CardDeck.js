import React, { useRef } from "react";

import MovieCard from "@/components/MovieCard";

import styles from "./CardDeck.module.css";

const CardDeck = {
    Horizontal: ({ cardItems = [], childItem }) => {
        const containerRef = useRef(null);

        // Smooth scrolling with easing

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
                <button style={{ marginRight: "1rem" }} className={styles.scrollButton} onClick={() => scroll(-1)}>
                    <i className="bi bi-arrow-left"></i>
                </button>
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
                <button style={{ marginLeft: "1rem" }} className={styles.scrollButton} onClick={() => scroll(1)}>
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
        );
    },
    Vertical: ({ className, style = {}, cardItems = [], childItem, ...params }) => {
        const containerRef = useRef(null);

        // Smooth scrolling with easing
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
                <button style={{ marginBottom: "1rem" }} className={styles.scrollButton} onClick={() => scroll(-1)}>
                    <i className="bi bi-arrow-up"></i>
                </button>
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
                <button style={{ marginTop: "1rem" }} className={styles.scrollButton} onClick={() => scroll(1)}>
                    <i className="bi bi-arrow-down"></i>
                </button>
            </div>
        );
    },
};

export default CardDeck;
