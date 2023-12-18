const qSel = function (selector) {
  return document.querySelector(selector);
};

const qSelAll = function (selector) {
  return document.querySelectorAll(selector);
};

const byClass = function (selector) {
  return document.getElementsByClassName(selector);
};

const byId = function (selector) {
  return document.getElementById(selector);
};

const validationMessage = [
  {
    id: 1,
    message: "Name is required",
  },
  {
    id: 2,
    message: "Name must be minimum 3 character",
  },
  {
    id: 3,
    message: "Surname  is required",
  },
  {
    id: 4,
    message: "Surname  must be minimum 3 character",
  },
  {
    id: 5,
    message: "Phone  is required",
  },
  {
    id: 6,
    message: "phone number must be 7 character",
  },
  {
    id: 7,
    message: "Email  is required",
  },
  {
    id: 8,
    message: "Please write your email",
  },
  {
    id: 9,
    message: "Password is required",
  },
  {
    id: 10,
    message: "Password must be 7 character",
  },
  {
    id: 11,
    message: "Password must contain  minimum 1 number",
  },
  {
    id: 12,
    message: "Password must contain at least 1 capital letter",
  },
  {
    id: 13,
    message: "Please confirm your password",
  },
  {
    id: 14,
    message: "Passwords doesn't match",
  },
];

const btn = byId("registerBtn");
const form = byId("form");
const username = byId("name");
const surname = byId("srnm");
const phone = byId("phn");
const email = byId("email");
const password = byId("psw");
const repassword = byId("repsw");

const checkThreeCharacter = (text) => text.length >= 3;
const checkSevenCharacter = (text) => text.length >= 7;

const isValidEmail = (email) => {
  const elements = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return elements.test(String(email).toLowerCase());
};

const checkHasNumber = function (text) {
  let symbolOfText;
  for (let i = 0; i < text.length; i++) {
    symbolOfText = text.charAt(i);
    if (isFinite(symbolOfText)) {
      return true;
    }
  }
  return false;
};

const checkHasUpperWord = function (text) {
  let symbolOfText;
  for (let i = 0; i < text.length; i++) {
    symbolOfText = text.charAt(i);
    const upperSymbol = symbolOfText.toUpperCase();
    if (symbolOfText == upperSymbol && isNaN(symbolOfText)) {
      return true;
    }
  }
  return false;
};

const nonEmpty = function (text) {
  if (text == "") {
    return true;
  }
  return false;
};

// const createdSpan = function (validationText) {
//   let span = document.createElement("span");
//   span.classList.add("text-danger", "mt-3");
//   span.style.display = "inline-block";
//   span.innerHTML = validationText;
//   return span;
// };

// const removeSpan = () => {
//   const formChildren = form.children;
//   Array.from(formChildren).forEach((formChild) => {
//     if (
//       formChild.classList.contains("text-danger") &&
//       formChild.tagName == "SPAN"
//     ) {
//       formChild.remove();
//     }
//   });
// };

const setError = (element, message) => {
  console.log("Setting error for element:", element);

  const inputControl = element.parentElement;

  if (!inputControl) {
    console.error("Parent element not found for:", element);
    return;
  }

  const errorDisplay = inputControl.querySelector(".error");

  if (!errorDisplay) {
    console.error("Error display element not found inside:", inputControl);
    return;
  }

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

btn.onclick = function (event) {
  const nameValue = username.value.trim();
  const surnameValue = surname.value.trim();
  const phoneValue = phone.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const repasswordValue = repassword.value.trim();
  debugger;
  event.preventDefault(); // Prevent the default form submission behavior
  if (nonEmpty(nameValue)) {
    setError(username, validationMessage[0].message);
  } else if (!checkThreeCharacter(nameValue)) {
    setError(username, validationMessage[1].message);
  } else {
    setSuccess(username);
  }
  if (nonEmpty(surnameValue)) {
    setError(surname, validationMessage[2].message);
  } else if (!checkThreeCharacter(surnameValue)) {
    setError(surname, validationMessage[3].message);
  } else {
    setSuccess(surname);
  }
  if (nonEmpty(phoneValue)) {
    setError(phone, validationMessage[4].message);
  } else if (!checkSevenCharacter(phoneValue)) {
    setError(phone, validationMessage[5].message);
  } else {
    setSuccess(phone);
  }

  if (nonEmpty(emailValue)) {
    setError(email, validationMessage[6].message);
  } else if (!isValidEmail(emailValue)) {
    setError(email, validationMessage[7].message);
  } else {
    setSuccess(email);
  }
  if (nonEmpty(passwordValue)) {
    setError(password, validationMessage[8].message);
  } else if (!checkSevenCharacter(passwordValue)) {
    setError(password, validationMessage[9].message);
  } else if (!checkHasNumber(passwordValue)) {
    setError(password, validationMessage[10].message);
  } else if (!checkHasUpperWord(passwordValue)) {
    setError(password, validationMessage[11].message);
  } else {
    setSuccess(password);
  }
  if (nonEmpty(repasswordValue)) {
    setError(repassword, validationMessage[12].message);
  } else if (repasswordValue != passwordValue) {
    setError(repassword, validationMessage[13].message);
  } else {
    setSuccess(repassword);
  }
};
