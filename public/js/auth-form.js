/**
 * Authentication Form Handler
 * Handles form submission, validation, and user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Setup login form if on login page
    if (loginForm) {
        setupLoginForm();
    }

    // Setup register form if on register page
    if (registerForm) {
        setupRegisterForm();
    }
});

/**
 * Setup Login Form
 */
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Real-time validation on input change
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Clear error on input
    emailInput.addEventListener('focus', () => clearError('emailError'));
    passwordInput.addEventListener('focus', () => clearError('passwordError'));

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            showLoadingState();
            // Form will be submitted to backend
            setTimeout(() => {
                form.submit();
            }, 500);
        }
    });
}

/**
 * Setup Register Form
 */
function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    const inputs = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        agreeTerms: document.getElementById('agreeTerms')
    };

    // Real-time validation
    inputs.firstName.addEventListener('blur', validateFirstName);
    inputs.lastName.addEventListener('blur', validateLastName);
    inputs.email.addEventListener('blur', validateEmail);
    inputs.phone.addEventListener('blur', validatePhone);
    inputs.password.addEventListener('blur', validatePassword);
    inputs.confirmPassword.addEventListener('blur', validateConfirmPassword);
    inputs.agreeTerms.addEventListener('change', validateTerms);

    // Clear errors on focus
    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('focus', () => {
                clearError(input.id + 'Error');
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateRegisterForm()) {
            showLoadingState();
            // Form will be submitted to backend
            setTimeout(() => {
                form.submit();
            }, 500);
        }
    });
}

/**
 * Validation Functions
 */

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');

    if (!email) {
        showError('emailError', 'Email address is required');
        return false;
    }

    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        return false;
    }

    clearError('emailError');
    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');

    if (!password) {
        showError('passwordError', 'Password is required');
        return false;
    }

    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return false;
    }

    clearError('passwordError');
    return true;
}

function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim();

    if (!firstName) {
        showError('firstNameError', 'First name is required');
        return false;
    }

    if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        return false;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
        showError('firstNameError', 'First name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }

    clearError('firstNameError');
    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();

    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        return false;
    }

    if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        return false;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
        showError('lastNameError', 'Last name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }

    clearError('lastNameError');
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();

    if (!phone) {
        clearError('phoneError');
        return true;
    }

    if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
        showError('phoneError', 'Please enter a valid phone number');
        return false;
    }

    clearError('phoneError');
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        return false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        return false;
    }

    clearError('confirmPasswordError');
    return true;
}

function validateTerms() {
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!agreeTerms) {
        showError('termsError', 'You must agree to the terms and conditions');
        return false;
    }

    clearError('termsError');
    return true;
}

/**
 * Form-wide Validation Functions
 */

function validateLoginForm() {
    let isValid = true;

    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;

    return isValid;
}

function validateRegisterForm() {
    let isValid = true;

    if (!validateFirstName()) isValid = false;
    if (!validateLastName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    if (!validateTerms()) isValid = false;

    return isValid;
}

/**
 * Utility Functions
 */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        element.style.display = 'block';
    }
}

function clearError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.add('hidden');
        element.style.display = 'none';
    }
}

function showLoadingState() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.disabled = true;
        document.getElementById('btnText').textContent = 'Signing in...';
        document.getElementById('btnSpinner').classList.remove('hidden');
    }
    
    if (registerBtn) {
        registerBtn.disabled = true;
        document.getElementById('btnText').textContent = 'Creating account...';
        document.getElementById('btnSpinner').classList.remove('hidden');
    }
}

/**
 * Export functions for inline script usage
 */
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.validateFirstName = validateFirstName;
window.validateLastName = validateLastName;
window.validatePhone = validatePhone;
window.validateConfirmPassword = validateConfirmPassword;
window.validateTerms = validateTerms;
window.showError = showError;
window.clearError = clearError;
window.isValidEmail = isValidEmail;