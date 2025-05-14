const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalHTML = contactForm.innerHTML;
    const statusDiv = document.getElementById('formStatus');

    // 1. reCAPTCHA Validation
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Please complete the reCAPTCHA verification!</p>
          </div>
        `;
      } else {
        alert("Please complete the reCAPTCHA!");
      }
      document.querySelector('.g-recaptcha')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 2. Prepare for submission
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      // 3. Create FormData and append reCAPTCHA
      const formData = new FormData(contactForm);
      formData.append('g-recaptcha-response', recaptchaResponse);

      // 4. Send data
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(await response.text());

      // 5. Success handling
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Thanks for your message!</h3>
            <p>I'll get back to you soon.</p>
          </div>
        `;
      }
      contactForm.reset();
      grecaptcha.reset(); // Reset reCAPTCHA
    } catch (error) {
      // 6. Error handling
      console.error('Form error:', error);
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Failed to send. Please try again or email me directly at 
              <a href="mailto:alqama043@gmail.com">alqama043@gmail.com</a>
            </p>
          </div>
        `;
      }
    } finally {
      // 7. Reset UI
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message';
    }
  });
}
