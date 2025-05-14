document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('formStatus');
    
    // Clear previous messages
    statusDiv.innerHTML = '';
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        const response = await fetch('https://formspree.io/f/mjkwpqnb', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success - hide form, show success message
            form.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
        } else {
            throw new Error('Server responded with error');
        }
    } catch (error) {
        // Show user-friendly error message
        statusDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to send. Please check your connection and try again.</p>
            </div>
        `;
        console.error('Form error:', error);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
});
