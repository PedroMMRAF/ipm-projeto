import styles from "@/styles/MovieCard.module.css";

export default function MovieCard({ title, image, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img className={styles.cardImg} src={image} alt={title} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{title}</div>
            </div>
        </div>
    );
}
