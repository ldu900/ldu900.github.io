import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/assets/logo/logo.svg" alt="Moldoo studio logo" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>
            몰입의 순간을 디자인하다, 몰두 스튜디오(Moldoo Studio)
          </div>
          <div className={styles.subtitle}>
            감각적인 영상 제작과 정교한 디자인 솔루션을 통해 브랜드의 다각적인 가치를 시각화합니다.
          </div>
          <div className={styles.content}>
            몰두 스튜디오는 영상 콘텐츠와 디자인의 경계를 허무는 크리에이티브 팀입니다.<br />
            우리는 브랜드의 아이덴티티를 가장 잘 드러낼 수 있는 최적의 결과물을 위해 두 가지 핵심 축을 운용합니다.<br />
            시선을 사로잡는 '영상 제작'과 브랜드의 실체를 완성하는 '디자인'입니다.<br />
            '젊은 감각'과 '체계적인 꼼꼼함'을 바탕으로 모든 프로젝트에 깊이 몰두하여,<br />
            파트너사가 기대하는 그 이상의 완성도와 만족감을 선사합니다.
          </div>
        </div>
      </div>
    </section>
  );
}
