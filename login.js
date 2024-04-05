function loginPage() {
  const contentArticle = document.getElementById("content");

  console.log("Loading account page content...");

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Log in';
  formTitle.setAttribute('class', 'form__title');

  const form = document.createElement('form');
  form.setAttribute('class', 'form__login');
  form.method = 'post';

  const usernameLabel = document.createElement('label');
  usernameLabel.textContent = 'Username:';
  usernameLabel.setAttribute('class', 'form__label');
  usernameLabel.setAttribute('for', 'name');

  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('class', 'form__input');
  usernameInput.type = 'text';
  usernameInput.id = 'name';
  usernameInput.name = 'name';
  usernameInput.required = true;

  const passwordLabel = document.createElement('label');
  passwordLabel.textContent = 'Password:';
  passwordLabel.setAttribute('class', 'form__label');
  passwordLabel.setAttribute('for', 'password');

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('class', 'form__input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  passwordInput.required = true;

  const submitButton = document.createElement('input');
  submitButton.setAttribute('class', 'form__submit');
  submitButton.type = 'submit';
  submitButton.value = 'Submit';

  // Append elements to form
  form.appendChild(usernameLabel);
  form.appendChild(usernameInput);
  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  // Append form elements to content
  contentArticle.appendChild(formTitle);
  contentArticle.appendChild(form);

  console.log("Account page content loaded.");
}