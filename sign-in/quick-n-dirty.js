var signInForm = document.forms[0];
signInForm.addEventListener('submit', function (submitEvent) {
  submitEvent.preventDefault();
  var emailInput = document.querySelector('.text-field.email input');
  var emailErrorMessageContainer = document.querySelector('.text-field.email .error-message');
  var passwordInput = document.querySelector('.text-field.password input');
  var passwordErrorMessageContainer = document.querySelector('.text-field.password .error-message');

  var email = emailInput.value;
  var password = passwordInput.value;
  var emailError = '';
  var passwordError = '';

  if (email.trim() === '') {
    emailError = 'Không được để trống email';
  } else if (!EMAIL_REGEX.test(email)) {
    emailError = 'Email không hợp lệ';
  } else if (email.trim().length > 320) {
    emailError = 'Email không được dài quá 320 kí tự';
  } else {
    emailError = '';
  }

  if (password.trim() === '') {
    passwordError = 'Không được để trống mật khẩu';
  } else {
    passwordError = '';
  }

  emailErrorMessageContainer.innerHTML = emailError;
  passwordErrorMessageContainer.innerHTML = passwordError;
  if (emailError === '' && passwordError === '') {
    this.submit();
  }
});
