// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add form validation and submission
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Initialize character counter for textarea
        initCharacterCounter();
        
        // Initialize form animations
        initFormAnimations();
    }
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // Collect form data
    const formData = collectFormData(form);
    
    // Simulate form submission (replace with actual API call)
    simulateFormSubmission(formData)
        .then(response => {
            showFormSuccess(form);
            form.reset();
        })
        .catch(error => {
            showFormError(form, 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        })
        .finally(() => {
            hideLoadingState(submitBtn);
        });
}

// Validate contact form
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError({ target: field });
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    // Validate email
    if (fieldType === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    // Validate phone number
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    // Validate minimum length for message
    if (fieldName === 'message' && value && value.length < 10) {
        showFieldError(field, 'الرسالة يجب أن تكون على الأقل 10 أحرف');
        return false;
    }
    
    // Add success styling
    field.style.borderColor = 'var(--success)';
    setTimeout(() => {
        field.style.borderColor = '';
    }, 2000);
    
    return true;
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    const errorMsg = field.parentNode.querySelector('.field-error');
    
    if (errorMsg) {
        errorMsg.remove();
    }
    
    field.style.borderColor = '';
}

// Show field error
function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-xs);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    `;
    
    // Add error icon
    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-exclamation-circle';
    errorDiv.insertBefore(errorIcon, errorDiv.firstChild);
    
    // Insert error after field
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--error)';
    
    // Focus field
    field.focus();
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number format
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Collect form data
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Form submitted successfully' });
            } else {
                reject({ error: true, message: 'Network error' });
            }
        }, 2000);
    });
}

// Show loading state
function showLoadingState(submitBtn) {
    const originalText = submitBtn.textContent;
    submitBtn.setAttribute('data-original-text', originalText);
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>
        جار الإرسال...
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';
}

// Hide loading state
function hideLoadingState(submitBtn) {
    const originalText = submitBtn.getAttribute('data-original-text');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
}

// Show form success message
function showFormSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--success), #059669);
            color: white;
            padding: var(--space-xl);
            border-radius: var(--radius-lg);
            text-align: center;
            margin-bottom: var(--space-xl);
            box-shadow: var(--shadow-lg);
            animation: slideInDown 0.5s ease-out;
        ">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: var(--space-md);"></i>
            <h3 style="margin-bottom: var(--space-sm);">تم إرسال رسالتك بنجاح!</h3>
            <p style="opacity: 0.9; margin: 0;">سنتواصل معك في أقرب وقت ممكن</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove success message after 8 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.style.animation = 'slideOutUp 0.5s ease-in';
            setTimeout(() => {
                successDiv.remove();
            }, 500);
        }
    }, 8000);
}

// Show form error message
function showFormError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--error), #dc2626);
            color: white;
            padding: var(--space-xl);
            border-radius: var(--radius-lg);
            text-align: center;
            margin-bottom: var(--space-xl);
            box-shadow: var(--shadow-lg);
            animation: slideInDown 0.5s ease-out;
        ">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: var(--space-md);"></i>
            <h3 style="margin-bottom: var(--space-sm);">خطأ في الإرسال</h3>
            <p style="opacity: 0.9; margin: 0;">${message}</p>
        </div>
    `;
    
    form.parentNode.insertBefore(errorDiv, form);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove error message after 6 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutUp 0.5s ease-in';
            setTimeout(() => {
                errorDiv.remove();
            }, 500);
        }
    }, 6000);
}

// Initialize character counter for textarea
function initCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea) {
        const maxLength = 1000;
        const minLength = 10;
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: var(--font-size-sm);
            color: var(--gray-500);
            margin-top: var(--space-xs);
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        // Update counter
        function updateCounter() {
            const currentLength = messageTextarea.value.length;
            counter.textContent = `${currentLength}/${maxLength} حرف`;
            
            if (currentLength < minLength) {
                counter.style.color = 'var(--error)';
                counter.textContent += ` (الحد الأدنى ${minLength} أحرف)`;
            } else if (currentLength > maxLength * 0.9) {
                counter.style.color = 'var(--warning)';
            } else {
                counter.style.color = 'var(--gray-500)';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        messageTextarea.addEventListener('paste', setTimeout(updateCounter, 0));
        
        // Initial count
        updateCounter();
        
        // Set max length
        messageTextarea.setAttribute('maxlength', maxLength);
    }
}

// Initialize form animations
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
    
    // Add focus animations to inputs
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
}

// Add additional animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    .form-success, .form-error {
        animation-fill-mode: both;
    }
`;
document.head.appendChild(animationStyles);

// Export functions for potential external use
window.contactFunctions = {
    initContactForm,
    validateContactForm,
    validateField,
    showFormSuccess,
    showFormError
};