import styles from "./ActorCard.module.css";

export default function ActorCard({ className, name, character, image, onClick = () => { }, width = 150 }) {
    return (
        <div
            className={className + " " + styles.card}
            onClick={onClick}
            style={{
                width: width,
                height: width * 1.5,
            }}
        >
            <img className={styles.cardImg} src={image} alt={name} />
            <div className={styles.overlay}>
                <div className={styles.cardText}>{name}</div>
                <div className={styles.cardSubText}>{character}</div>
            </div>
        </div>
    );
}
