document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const backToFormBtn = document.getElementById('backToForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('formStatus');

            // Clear previous status messages
            if (statusDiv) statusDiv.innerHTML = '';

            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch('https://formspree.io/f/mjkwpqnb', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    throw new Error(await response.text());
                }
            } catch (error) {
                console.error('Form submission error:', error);
                if (statusDiv) {
                    statusDiv.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>Failed to send. Please email me directly at 
                                <a href="mailto:alqama043@gmail.com">alqama043@gmail.com</a>
                            </p>
                        </div>
                    `;
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }

    // Back to form button
    if (backToFormBtn) {
        backToFormBtn.addEventListener('click', function() {
            document.getElementById('successMessage').style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
