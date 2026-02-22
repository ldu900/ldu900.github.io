import { useSearchParams } from 'react-router-dom';
import { videos } from '../../data/videos';
import { designItems } from '../../data/designs';
import PortfolioCard from './PortfolioCard';
import DesignCard from './DesignCard';
import styles from './ProjectTabs.module.css';

const EAGER_COUNT = 3;

export default function ProjectTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'film';

  const setTab = (tab) => setSearchParams({ tab });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <button
            className={`${styles.tabBtn}${activeTab === 'film' ? ` ${styles.active}` : ''}`}
            onClick={() => setTab('film')}
          >
            FILM<span className={styles.asterisk}>*</span>
          </button>
          <button
            className={`${styles.tabBtn}${activeTab === 'design' ? ` ${styles.active}` : ''}`}
            onClick={() => setTab('design')}
          >
            DESIGN<span className={styles.asterisk}>*</span>
          </button>
        </div>

        <div className={styles.main}>
          <div className={`${styles.tabContent}${activeTab === 'film' ? ` ${styles.active}` : ''}`}>
            <div className={styles.board}>
              {videos.map((video, index) => (
                <PortfolioCard key={video.src} video={video} eager={index < EAGER_COUNT} />
              ))}
            </div>
          </div>

          <div className={`${styles.tabContent}${activeTab === 'design' ? ` ${styles.active}` : ''}`}>
            <div className={styles.designBoard}>
              {designItems.map((item) => (
                <DesignCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
