import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  const openModal = () => {
    document.getElementById('contactModal').style.display = 'block';
  };

  return (
    <section id="contact" className="section">
      <h2>{t('Contact Us')}</h2>
      <p>{t('If you have any questions or need assistance, please contact us at')} <a href="mailto:support@attestationmanager.com">support@attestationmanager.com</a> {t('or click the button below to open the contact form.')}</p>
      <button onClick={openModal}>{t('Contact Form')}</button>
    </section>
  );
};

export default Contact;
