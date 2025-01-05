document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('password-strength');
    const confirmPasswordError = document.getElementById('confirmPassword-error');

    // Password Strength Validation
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;

        // Regex patterns for password strength
        const strengthRegex = {
            weak: /[a-zA-Z]/, // At least one letter
            medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, // At least one lowercase, one uppercase, and one digit with min 6 characters
            strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, // Medium + at least one special character with min 8 characters
        };

        // Checking password strength
        if (strengthRegex.strong.test(password)) {
            passwordStrength.textContent = 'Strong password!';
            passwordStrength.style.color = 'green';
        } else if (strengthRegex.medium.test(password)) {
            passwordStrength.textContent = 'Medium strength password.';
            passwordStrength.style.color = 'orange';
        } else if (strengthRegex.weak.test(password)) {
            passwordStrength.textContent = 'Weak password!';
            passwordStrength.style.color = 'red';
        } else {
            passwordStrength.textContent = 'Invalid password.';
            passwordStrength.style.color = 'red';
        }
    });

    // Confirm Password Validation
    confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordError.style.color = 'red';
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
