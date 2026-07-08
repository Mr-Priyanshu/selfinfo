/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - Contact Form Handler v2.0
 * ------------------------------------------------------------- */

export const FormHandler = {
  form: null,
  statusEl: null,
  submitBtn: null,

  init(formElement) {
    if (!formElement) return;
    this.form = formElement;
    this.statusEl = document.getElementById('form-status');
    this.submitBtn = document.getElementById('form-submit-btn');

    // Attach listeners
    this.form.addEventListener('submit', this.onSubmit.bind(this));
    
    // Live validation check on blur
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  },

  validateField(input) {
    let isValid = true;
    const errorMsg = input.parentElement.querySelector('.error-msg');

    if (input.required && !input.value.trim()) {
      isValid = false;
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
      }
    }

    if (!isValid) {
      input.classList.remove('border-slate-800', 'focus:border-cyberCyan');
      input.classList.add('border-red-500');
      if (errorMsg) errorMsg.classList.remove('hidden');
    } else {
      input.classList.remove('border-red-500', 'border-slate-800');
      input.classList.add('border-green-500');
      if (errorMsg) errorMsg.classList.add('hidden');
    }

    return isValid;
  },

  clearFieldError(input) {
    const errorMsg = input.parentElement.querySelector('.error-msg');
    input.classList.remove('border-red-500', 'border-green-500');
    input.classList.add('border-slate-800');
    if (errorMsg) errorMsg.classList.add('hidden');
  },

  async onSubmit(event) {
    event.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let formIsValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      this.updateStatus("Please resolve form issues before submitting.", "text-red-500");
      return;
    }

    // Capture values
    const data = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      message: document.getElementById('contact-message').value
    };

    // Simulate Server Connection
    this.setSubmitting(true);
    this.updateStatus("Routing data packets...", "text-cyberCyan");

    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success feedback
      this.updateStatus("Data packets routed successfully! Talk soon.", "text-green-500");
      this.form.reset();
      
      // Reset input green highlights after 3 seconds
      setTimeout(() => {
        inputs.forEach(input => this.clearFieldError(input));
        this.updateStatus("", "");
      }, 4000);

    } catch (err) {
      this.updateStatus("Failed to establish server connection. Try again.", "text-red-500");
    } finally {
      this.setSubmitting(false);
    }
  },

  setSubmitting(isSubmitting) {
    if (isSubmitting) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `Sending... <i class="fa-solid fa-circle-notch animate-spin ml-2"></i>`;
      this.submitBtn.classList.add('opacity-70');
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane ml-2"></i>`;
      this.submitBtn.classList.remove('opacity-70');
    }
  },

  updateStatus(message, colorClass) {
    if (!this.statusEl) return;
    this.statusEl.className = `text-xs font-mono mt-2 ${colorClass}`;
    this.statusEl.textContent = message;
  }
};
