/* =========================
   DOM ELEMENTS
========================= */

const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const toast = document.getElementById("toast");

const themeToggle = document.getElementById("themeToggle");

/* =========================
   CHARACTER SETS
========================= */

const UPPERCASE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const LOWERCASE =
  "abcdefghijklmnopqrstuvwxyz";

const NUMBERS  =
  "0123456789";

const SYMBOLS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?";

/* =========================
   UPDATE LENGTH DISPLAY
========================= */

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

/* =========================
   RANDOM CHARACTER
========================= */

const getRandomChar = (characters) => {
  return characters[
    Math.floor(Math.random() * characters.length)
  ];
};

/* =========================
   PASSWORD GENERATOR
========================= */

const generatePassword = () => {
  let availableCharacters = "";

  if (uppercaseCheck.checked) {
    availableCharacters += UPPERCASE;
  }

  if (lowercaseCheck.checked) {
    availableCharacters += LOWERCASE;
  }

  if (numbersCheck.checked) {
    availableCharacters += NUMBERS;
  }

  if (symbolsCheck.checked) {
    availableCharacters += SYMBOLS;
  }

  if (availableCharacters.length === 0) {
    showToast(
      "Select at least one character type!"
    );

    passwordInput.value = "";
    return;
  }

  const passwordLength =
    Number(lengthSlider.value);

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    password += getRandomChar(
      availableCharacters
    );
  }

  passwordInput.value = password;

  evaluateStrength(password);
};

/* =========================
   PASSWORD STRENGTH
========================= */

const evaluateStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password))
    score++;

  if (score <= 2) {
    strengthText.textContent = "Weak";

    strengthBar.style.width = "33%";
    strengthBar.style.background =
      "#ff4757";
  }

  else if (score <= 4) {
    strengthText.textContent = "Medium";

    strengthBar.style.width = "66%";
    strengthBar.style.background =
      "#f7b731";
  }

  else {
    strengthText.textContent = "Strong";

    strengthBar.style.width = "100%";
    strengthBar.style.background =
      "#00d084";
  }
};

/* =========================
   COPY PASSWORD
========================= */

const copyPassword = async () => {

  if (!passwordInput.value) {
    showToast(
      "Generate a password first!"
    );
    return;
  }

  try {
    await navigator.clipboard.writeText(
      passwordInput.value
    );

    showToast(
      "Password copied successfully!"
    );

  } catch (error) {

    showToast(
      "Copy failed. Try again."
    );

    console.error(error);
  }
};

/* =========================
   TOAST
========================= */

const showToast = (message) => {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};

/* =========================
   DARK / LIGHT MODE
========================= */

const applyTheme = (theme) => {

  if (theme === "light") {

    document.body.classList.add(
      "light-mode"
    );

    themeToggle.textContent = "☀️";

  } else {

    document.body.classList.remove(
      "light-mode"
    );

    themeToggle.textContent = "🌙";
  }
};

const savedTheme =
  localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {

  const currentTheme =
    document.body.classList.contains(
      "light-mode"
    )
      ? "light"
      : "dark";

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  applyTheme(newTheme);

  localStorage.setItem(
    "theme",
    newTheme
  );
});

/* =========================
   EVENTS
========================= */

generateBtn.addEventListener(
  "click",
  generatePassword
);

copyBtn.addEventListener(
  "click",
  copyPassword
);

/* =========================
   INITIAL PASSWORD
========================= */

generatePassword();