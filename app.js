function localStorageAdd(keyName, value) {
  return localStorage.setItem(keyName, JSON.stringify(value));
}

function localStorageGet(keyName) {
  const key = localStorage.getItem(keyName);
  return JSON.parse(key);
}

// todo list

const checkboxEls = document.querySelectorAll(".todo-checkbox");
const listEl = document.querySelector(".todo-list");

checkboxEls.forEach((e) => {
  if (localStorageGet(e.getAttribute("name")) === "true") {
    e.setAttribute("checked", "");
  }
});

listEl.addEventListener("click", (event) => {
  if (event.target.getAttribute("type") === "checkbox") {
    if (event.target.getAttribute("checked") === null) {
      event.target.setAttribute("checked", "");
    } else if (event.target.getAttribute("checked") === "") {
      event.target.removeAttribute("checked");
    }

    checkboxEls.forEach((e) => {
      if (e.getAttribute("checked") === "") {
        localStorageAdd(e.getAttribute("name"), "true");
      }

      if (e.getAttribute("checked") === null) {
        localStorageAdd(e.getAttribute("name"), "false");
      }
    });
  }
});

// form

const nameInputEl = document.getElementById("name");
const passwordInputEl = document.getElementById("password");
const submitButtonEl = document.querySelector(".form-button");

nameInputEl.value = localStorageGet("userName");
passwordInputEl.value = localStorageGet("userPassword");

submitButtonEl.addEventListener("click", (e) => {
  e.preventDefault();

  localStorageAdd("userName", nameInputEl.value);
  localStorageAdd("userPassword", passwordInputEl.value);

  nameInputEl.value = "";
  passwordInputEl.value = "";
});

// saved pages

const savedListEl = document.querySelector(".saved-list");
const savedButtonEl = document.querySelector(".saved-button");
const savedInputEl = document.querySelector(".saved-input");
let links = localStorageGet("links") || [];

function addLinks() {
  savedListEl.innerHTML = "";
  links.forEach((e) => {
    const liEL = document.createElement("li");
    const linkEl = document.createElement("p");
    const closeButtonEl = document.createElement("button");

    liEL.classList.add("saved-item");
    linkEl.classList.add("saved-link");
    closeButtonEl.classList.add("saved-close-button");

    linkEl.textContent = e;
    closeButtonEl.textContent = "delete";

    liEL.append(linkEl, closeButtonEl);
    savedListEl.append(liEL);

    closeButtonEl.addEventListener("click", (event) => {
      links.splice(links.indexOf(linkEl.textContent), 1);
      liEL.remove();
      localStorageAdd("links", links);
    });
  });
}

savedButtonEl.addEventListener("click", (e) => {
  e.preventDefault();
  links.push(savedInputEl.value);
  localStorageAdd("links", links);
  addLinks();
});

addLinks();

// phone list

const phoneFormEl = document.querySelector(".phone-form");
const phoneNameEl = document.getElementById("phoneName");
const phoneSurnameEl = document.getElementById("phoneSurname");
const phonePhoneEl = document.getElementById("phonePhone");
const phoneEmailEl = document.getElementById("phoneEmail");
const phoneAddButtonEl = document.querySelector(".phone-add");
const contactsListEL = document.querySelector(".contacts-list");

let contacts = localStorageGet("contacts") || [];

phoneAddButtonEl.addEventListener("click", (e) => {
  const user = {
    name: phoneNameEl.value,
    surname: phoneSurnameEl.value,
    phone: phonePhoneEl.value,
    email: phoneEmailEl.value,
  };

  contacts.push(user);
  localStorageAdd("contacts", contacts);
  addContacts()
});

function addContacts() {
  contacts.forEach((e) => {
    const user = {
      name: e.name,
      surname: e.surname,
      phone: e.phone,
      email: e.email,
    };

    const item = document.createElement("li");
    const name = document.createElement("p");
    const surname = document.createElement("p");
    const phone = document.createElement("p");
    const email = document.createElement("p");
    const deleteButton = document.createElement("button");

    name.textContent = e.name;
    surname.textContent = e.surname;
    phone.textContent = e.phone;
    email.textContent = e.email;
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", (e) => {
      contacts.forEach((item, index) => {
        if (JSON.stringify(item) === JSON.stringify(user)) {
          contacts.splice(index, 1);
          contactsListEL.innerHTML = ""; 
          addContacts()
        }
      });
    });

    item.append(name, surname, phone, email, deleteButton);
    contactsListEL.append(item);
  });
}
addContacts()