import React from 'react';

const Contact = () => {
  const openModal = () => {
    document.getElementById('contactModal').style.display = 'block';
  };

  return (
    <section id="contact" className="section">
      <h2>Contact Us</h2>
      <p>If you have any questions or need assistance, please contact us at <a href="mailto:support@attestationmanager.com">support@attestationmanager.com</a> or click the button below to open the contact form.</p>
      <button onClick={openModal}>Contact Form</button>
    </section>
  );
};

export default Contact;
