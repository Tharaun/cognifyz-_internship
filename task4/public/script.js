document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('password-strength');
    const confirmPasswordError = document.getElementById('confirmPassword-error');

    // Password Strength Validation
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strengthRegex = {
            weak: /[a-z]/,
            medium: /(?=.[a-z])(?=.[A-Z])(?=.*\d)/,
            strong: /(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%*?&])/,
        };

        if (strengthRegex.strong.test(password)) {
            passwordStrength.textContent = 'Strong password!';
            passwordStrength.style.color = 'green';
        } else if (strengthRegex.medium.test(password)) {
            passwordStrength.textContent = 'Medium strength password.';
            passwordStrength.style.color = 'orange';
        } else {
            passwordStrength.textContent = 'Weak password!';
            passwordStrength.style.color = 'red';
        }
    });

    // Confirm Password Validation
    confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
        } else {
            confirmPasswordError.textContent = '';
        }
    });

    // Forgot Password Section Toggle
    document.getElementById('forgot-password-link').addEventListener('click', (e) => {
        e.preventDefault();
        const section = document.getElementById('forgot-password-section');
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    });
});