/**
 * @typedef {{ email?: { error?: string }, password?: { error?: string } }} FormState
 */

/**
 * @type {RegExp}
 */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @type {FormState}
 */
const signInFormState = {
  email: {
    error: '',
  },
  password: {
    error: '',
  },
};

/**
 *
 * @description Validate email, return error message
 * @param {string} email
 * @returns {string}
 */
function validateEmail(email) {
  if (email.trim() === '') {
    return 'Không được để trống email';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Email không hợp lệ';
  }
  if (email.trim().length > 320) {
    return 'Email không được dài quá 320 kí tự';
  }
  return '';
}

/**
 *
 * @description Validate password, return error message
 * @param {string} password
 * @returns {string}
 */
function validatePassword(password) {
  if (password.trim() === '') {
    return 'Không được để trống mật khẩu';
  }
  return '';
}

/**
 * @type {HTMLInputElement}
 */
const emailInput = document.querySelector('.text-field.email input');
/**
 * @type {HTMLDivElement}
 */
const emailErrorMessageContainer = document.querySelector(
  '.text-field.email .error-message'
);

emailInput.addEventListener('input', function (inputEvent) {
  /**
   * @type {string}
   */
  const emailValue = inputEvent.target.value;
  const emailError = validateEmail(emailValue);
  updateState({ email: { error: emailError } });
});

/**
 * @type {HTMLInputElement}
 */
const passwordInput = document.querySelector('.text-field.password input');
/**
 * @type {HTMLDivElement}
 */
const passwordErrorMessageContainer = document.querySelector(
  '.text-field.password .error-message'
);

passwordInput.addEventListener('input', function (inputEvent) {
  /**
   * @type {string}
   */
  const passwordValue = inputEvent.target.value;
  const passwordError = validatePassword(passwordValue);
  updateState({ password: { error: passwordError } });
});

/**
 * @param {FormState} newState
 */
function updateState(newState) {
  Object.assign(signInFormState, newState);
  emailErrorMessageContainer.innerHTML = newState?.email?.error ?? '';
  passwordErrorMessageContainer.innerHTML = newState?.password?.error ?? '';
}

const signInForm = document.forms[0];
signInForm.addEventListener('submit', function (submitEvent) {
  submitEvent.preventDefault();
  const emailError = validateEmail(emailInput.value);
  const passwordError = validatePassword(passwordInput.value);
  updateState({
    email: { error: emailError },
    password: { error: passwordError },
  });
  if (emailError === '' && passwordError === '') {
    this.submit();
  }
});
