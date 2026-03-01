import { services } from '../../data/services';
import styles from './ServicesGrid.module.css';

export default function ServicesGrid() {
  return (
    <section className={styles.section}>
      <h2 className="section-title">SERVICES</h2>
      <div className={styles.grid}>
        {services.map((s) => (
          <div key={s.title} className={styles.card}>
            <div className={styles.icon}>
              <img src={s.icon} alt={s.title} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
