// Update the form submission handler in script.js
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.querySelector('#contactForm .btn');
    const statusDiv = document.getElementById('formStatus');

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    statusDiv.innerHTML = '';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusDiv.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    Message sent successfully
                </div>
            `;
            form.reset();
            
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        statusDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to send. Please try again or email me at
                <a href="mailto:alqama043@gmail.com">alqama043@gmail.com</a>
            </div>
        `;
    } finally {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
});
