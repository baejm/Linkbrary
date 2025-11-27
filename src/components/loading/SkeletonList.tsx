import styles from "./skeleton.module.css";

export default function SkeletonList() {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrap}>
        <div className={styles.thumbnail} />
      </div>

      <div className={styles.info}>
        <div className={styles.lineSm} />
        <div className={styles.lineMd} />
        <div className={styles.lineLg} />
        <div className={styles.lineSm} />
      </div>
    </div>
  );
}
