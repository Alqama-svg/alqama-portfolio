document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('formStatus');
            const successMessage = document.getElementById('successMessage');

            // Disable button during submission
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json'
                    }
                });

                if (response.ok) {
            // Show success message and hide form
            form.style.display = 'none';
            successMessage.style.display = 'block';
            form.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
        // Show error message
            const errorElement = document.createElement('div');
            errorElement.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to send. Please email me directly at <a href="mailto:alqama043@gmail.com">alqama043@gmail.com</a></p>
                </div>
            `;
            form.appendChild(errorElement);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
