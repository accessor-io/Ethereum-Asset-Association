import React, { useState } from 'react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <div>
        <h3 onClick={() => toggleFAQ(1)}>What is the Attestation Manager Service?</h3>
        <p className={openFAQ === 1 ? 'show' : ''}>The Attestation Manager Service allows users to create and manage groups of blockchain addresses securely and efficiently.</p>
      </div>
      <div>
        <h3 onClick={() => toggleFAQ(2)}>How do I register a group?</h3>
        <p className={openFAQ === 2 ? 'show' : ''}>To register a group, you need to connect your wallet and pay the registration fee. The group hash will be generated based on your address and a nonce.</p>
      </div>
      <div>
        <h3 onClick={() => toggleFAQ(3)}>Can I add multiple addresses to a group?</h3>
        <p className={openFAQ === 3 ? 'show' : ''}>Yes, you can add multiple addresses to a group by paying the address fee for each address you want to add.</p>
      </div>
    </section>
  );
};

export default FAQ;
