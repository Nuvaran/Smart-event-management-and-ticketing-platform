/**
 * Form Validation Utilities
 * Provides reusable validation functions for the entire application
 */

/**
 * Email Validation
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Password Validation
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid
 */
function validatePasswordFormat(password) {
    return password && password.length >= 6;
}

/**
 * Phone Number Validation
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
function validatePhoneFormat(phone) {
    if (!phone) return true;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Name Validation
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
function validateNameFormat(name) {
    return name && name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name);
}

/**
 * URL Validation
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
function validateURLFormat(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Required Field Validation
 * @param {string} value - Value to validate
 * @returns {boolean} - True if not empty
 */
function validateRequired(value) {
    return value && value.trim().length > 0;
}

/**
 * Min Length Validation
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} - True if meets minimum length
 */
function validateMinLength(value, minLength) {
    return value && value.length >= minLength;
}

/**
 * Max Length Validation
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if within maximum length
 */
function validateMaxLength(value, maxLength) {
    return !value || value.length <= maxLength;
}

/**
 * Pattern Validation
 * @param {string} value - Value to validate
 * @param {RegExp} pattern - Pattern to match
 * @returns {boolean} - True if matches pattern
 */
function validatePattern(value, pattern) {
    return pattern.test(value);
}

/**
 * Number Validation
 * @param {string|number} value - Value to validate
 * @returns {boolean} - True if valid number
 */
function validateNumber(value) {
    return !isNaN(value) && value !== null && value !== '';
}

/**
 * Integer Validation
 * @param {string|number} value - Value to validate
 * @returns {boolean} - True if valid integer
 */
function validateInteger(value) {
    return Number.isInteger(Number(value));
}

/**
 * Price/Currency Validation
 * @param {string|number} value - Value to validate
 * @returns {boolean} - True if valid price
 */
function validatePrice(value) {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    return priceRegex.test(value) && parseFloat(value) > 0;
}

/**
 * Date Validation
 * @param {string} dateString - Date string to validate (YYYY-MM-DD)
 * @returns {boolean} - True if valid date
 */
function validateDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Future Date Validation
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if date is in the future
 */
function validateFutureDate(dateString) {
    const date = new Date(dateString);
    return date > new Date();
}

/**
 * Past Date Validation
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if date is in the past
 */
function validatePastDate(dateString) {
    const date = new Date(dateString);
    return date < new Date();
}

/**
 * Match Fields Validation
 * @param {string} value1 - First value
 * @param {string} value2 - Second value
 * @returns {boolean} - True if values match
 */
function validateFieldsMatch(value1, value2) {
    return value1 === value2;
}

/**
 * Checkbox Required Validation
 * @param {HTMLInputElement} checkbox - Checkbox element
 * @returns {boolean} - True if checked
 */
function validateCheckboxRequired(checkbox) {
    return checkbox && checkbox.checked;
}

/**
 * File Size Validation
 * @param {File} file - File to validate
 * @param {number} maxSizeInMB - Maximum size in MB
 * @returns {boolean} - True if within size limit
 */
function validateFileSize(file, maxSizeInMB) {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
}

/**
 * File Type Validation
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} - True if file type is allowed
 */
function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}

/**
 * Display Error Message
 * @param {string} elementId - ID of error element
 * @param {string} message - Error message
 */
function displayError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        element.style.display = 'block';
    }
}

/**
 * Clear Error Message
 * @param {string} elementId - ID of error element
 */
function clearErrorMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.add('hidden');
        element.style.display = 'none';
    }
}

/**
 * Display Success Message
 * @param {string} elementId - ID of success element
 * @param {string} message - Success message
 */
function displaySuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        element.style.display = 'block';
    }
}

/**
 * Sanitize HTML Input
 * @param {string} input - HTML string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeHTML(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Debounce Function
 * Useful for real-time validation to prevent excessive function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format Phone Number
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
}

/**
 * Format Date
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @param {string} format - Desired format (e.g., 'DD/MM/YYYY')
 * @returns {string} - Formatted date
 */
function formatDate(dateString, format = 'DD/MM/YYYY') {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
}

/**
 * Format Currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (e.g., 'USD', 'ZAR')
 * @returns {string} - Formatted currency
 */
function formatCurrency(amount, currency = 'ZAR') {
    const formatter = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: currency
    });
    return formatter.format(amount);
}

/**
 * Export all functions to global scope
 */
window.FormValidation = {
    validateEmailFormat,
    validatePasswordFormat,
    validatePhoneFormat,
    validateNameFormat,
    validateURLFormat,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validatePattern,
    validateNumber,
    validateInteger,
    validatePrice,
    validateDateFormat,
    validateFutureDate,
    validatePastDate,
    validateFieldsMatch,
    validateCheckboxRequired,
    validateFileSize,
    validateFileType,
    displayError,
    clearErrorMessage,
    displaySuccess,
    sanitizeHTML,
    debounce,
    formatPhoneNumber,
    formatDate,
    formatCurrency
};