import styles from "./MovieCard.module.css";

export default function MovieCard({ className = "", title, poster, onClick = () => { }, style = {} }) {
    return (
        <div
            className={className + " " + styles.card}
            onClick={onClick}
            style={style}
        >
            <img className={styles.cardImg} src={poster} alt={title} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{title}</div>
            </div>
        </div>
    );
}
