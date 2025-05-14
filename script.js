// Mobile Nav Toggle (Hamburger Menu)
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link (optional)
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// ===== IMPROVED FORM SUBMISSION ===== //
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable button to prevent double-submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form), // Uses FormData instead of JSON
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            // Success: Replace form with a message
            form.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thanks for your message!</h3>
                    <p>I'll get back to you soon.</p>
                </div>
            `;
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        alert('Error: Message not sent. Please email me directly at alqama043@gmail.com');
        console.error(error);
    } finally {
        submitButton.disabled = false;
    }
});
