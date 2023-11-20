import styles from "./MovieCard.module.css";

export default function MovieCard({ className, title, poster, onClick = () => { }, width = "200px" }) {
    return (
        <div
            className={className + " " + styles.card}
            onClick={onClick}
            style={{
                width: width,
                height: `calc(${width} * 1.5)`,
            }}
        >
            <img className={styles.cardImg} src={poster} alt={title} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{title}</div>
            </div>
        </div>
    );
}
