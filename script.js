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
                    Message sent successfully! will get back to you soon.
                </div>
            `;
            form.reset();
        } else {
            // Get Formspree's error message if available
            const errorData = await response.json();
            throw new Error(errorData.error || 'Submission failed');
        }
    } catch (error) {
        console.error('Form error:', error);
        statusDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                ${error.message || 'Failed to send. Please try again later.'}
            </div>
        `;
    } finally {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
});
