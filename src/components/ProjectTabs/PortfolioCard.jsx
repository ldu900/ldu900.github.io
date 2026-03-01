import { useInView } from 'react-intersection-observer';
import styles from './PortfolioCard.module.css';

export default function PortfolioCard({ video, eager = false }) {
  const { ref, inView } = useInView({ rootMargin: '200px', triggerOnce: true });

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.videoWrap}>
        {(eager || inView) && (
          <iframe
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{video.caption}</h3>
      </div>
    </div>
  );
}
