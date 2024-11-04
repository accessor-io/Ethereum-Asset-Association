import React from 'react';

const ContactModal = () => {
  const closeModal = () => {
    document.getElementById('contactModal').style.display = 'none';
  };

  return (
    <div id="contactModal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Contact Us</h2>
        <form>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" required /><br /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required /><br /><br />
          <label htmlFor="message">Message:</label><br />
          <textarea id="message" name="message" required></textarea><br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
