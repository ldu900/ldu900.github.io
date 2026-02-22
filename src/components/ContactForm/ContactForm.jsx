import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL_FORM = {
  company: '',
  email: '',
  contact: '',
  project: '',
  budget: '',
  requirements: '',
};

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 11;
}

function validateEmail(email) {
  return /^[\w-.+]+@[\w-]+\.[\w-.]+$/.test(email);
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company, email, contact, project, budget, requirements } = form;

    if (!company) { alert('회사명(요청자명)을 입력하세요.'); return; }
    if (!project) { alert('프로젝트명을 입력하세요.'); return; }
    if (!contact) { alert('연락처를 입력하세요.'); return; }
    if (!validatePhone(contact)) { alert('올바른 연락처 형식을 입력하세요. (예: 010-1234-5678)'); return; }
    if (!email) { alert('이메일을 입력하세요.'); return; }
    if (!validateEmail(email)) { alert('올바른 이메일 주소를 입력하세요. (예: moldoo.studio@gmail.com)'); return; }
    if (!requirements) { alert('문의사항을 입력하세요.'); return; }

    setIsLoading(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        company,
        project,
        contact,
        sender: email,
        budget: budget || '미입력',
        requirements,
      });
      alert('문의가 정상적으로 전송되었습니다. 빠른 시간 내에 연락드리겠습니다.');
      setForm(INITIAL_FORM);
    } catch {
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p>
          새로운 프로젝트에 대해 이야기 나누고 싶으시다면 언제든지
          연락주세요.<br />
          최고의 결과물로 보답하겠습니다.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="company">회사명</label>
            <input
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="회사명을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요 (예: moldoo.studio@gmail.com)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact">연락처</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="연락처를 입력하세요 (예: 010-1234-5678)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="project">프로젝트명</label>
            <input
              type="text"
              id="project"
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="프로젝트명을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="budget">
              예산 <span className={styles.optional}>(선택사항)</span>
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="예산을 입력하세요 (예: 100만원)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="requirements">문의사항</label>
            <textarea
              id="requirements"
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="문의사항을 자세히 입력하세요"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className={`cta-button ${styles.submitBtn}`}
            disabled={isLoading}
          >
            {isLoading ? '전송 중...' : '문의하기'}
          </button>
        </form>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            📧{' '}
            <a href="mailto:moldoo.studio@gmail.com">moldoo.studio@gmail.com</a>
          </div>
          <div className={styles.contactItem}>📍 서울특별시 봉천동 949-18 206호</div>
        </div>
      </div>
    </section>
  );
}
