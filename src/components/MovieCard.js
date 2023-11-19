import styles from "./MovieCard.module.css";

export default function MovieCard({ className = "", title, image, onClick = () => {}, style = {} }) {
    return (
        <div className={className + " " + styles.card} onClick={onClick} style={style}>
            <img className={styles.cardImg} src={image} alt={title} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{title}</div>
            </div>
        </div>
    );
}
