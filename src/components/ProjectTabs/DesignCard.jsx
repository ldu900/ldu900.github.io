import { useState } from 'react';
import styles from './DesignCard.module.css';

export default function DesignCard({ item }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrap}${hasError ? ` ${styles.fallback}` : ''}`}>
        {!hasError && (
          <img
            src={item.image}
            alt={item.title}
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.description}</p>
      </div>
    </div>
  );
}
