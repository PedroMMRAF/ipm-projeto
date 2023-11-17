import styles from "./MovieCard.module.css";

export default function MovieCard({
    className,
    title,
    image,
    onClick,
    width = 200,
}) {
    return (
        <div
            className={className + " " + styles.card}
            onClick={onClick}
            style={{
                minWidth: width,
                maxWidth: width,
                minHeight: width * 1.5,
                maxHeight: width * 1.5,
            }}
        >
            <img className={styles.cardImg} src={image} alt={title} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{title}</div>
            </div>
        </div>
    );
}
