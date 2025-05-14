const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalHTML = contactForm.innerHTML; // Backup for reset

    // reCAPTCHA validation
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA!");
      return; // Stop if reCAPTCHA isn't completed
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const formData = new FormData(contactForm);
      formData.append('g-recaptcha-response', recaptchaResponse); // Add reCAPTCHA token

      
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Server error');

      // Success
      contactForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>Thanks for your message!</h3>
          <p>I'll get back to you soon.</p>
        </div>
      `;
    } catch (error) {
      // Error: Restore form + show inline message
      contactForm.innerHTML = originalHTML;
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>Failed to send. Please email me directly at 
          <a href="mailto:alqama043@gmail.com">alqama043@gmail.com</a>
        </p>
      `;
      contactForm.prepend(errorDiv);
      console.error('Form error:', error);
    } finally {
      submitButton.disabled = false;
    }
  });
}
