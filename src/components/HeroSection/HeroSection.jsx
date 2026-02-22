import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2 className={styles.heroText}>
          <span className={styles.heroTitle}>
            We do more, <span className={styles.heroTitleBold}>Moldoo</span>
          </span>
          <span className={styles.heroSubtitle}>
            고객의 니즈 그 이상을 실현하는 올라운더 크리에이티브 그룹
          </span>
        </h2>
      </div>
    </section>
  );
}
