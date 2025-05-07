let inputsUser = document.querySelector(".input-group-user.d-none");
let inputUserRePassword = document.getElementById("inputUserRePassword");
let inputUserName = document.getElementById("inputUserName");
let submitBtn = document.getElementById("submitBtn");
let logOutBtn = document.getElementById("logOutBtn")
let signUpLink = document.getElementById("signUpLink");
let usernameInput = document.getElementById("userName");
let emailInput = document.getElementById("signInEmail");
let passwordInput = document.getElementById("signInPassword");
let rePasswordInput = document.getElementById("signUpRePassword");
let siteTitle = document.querySelector("h1");
let headerSite = document.querySelector("header")
let welcomeMessage = document.querySelector("h2");
let welcomeUserName = document.getElementById("welcomeUserName");
let form = document.getElementById ("form");
let userNameRegex =/^[a-z0-9_-]{3,15}$/;
let userEmailRegex =/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let userPasswordRegex = /^[a-z0-9_-]{3,15}$/;
let alertDiv = document.querySelector(".alert")

signUpLink.addEventListener("click", function (e){
    e.preventDefault();
    isSignupMode = !isSignupMode;
    if (isSignupMode) {
        inputsUser.classList.remove("d-none");
        inputUserRePassword.classList.remove("d-none");
        submitBtn.textContent = "Sign Up";
        signUpLink.textContent = "Login";
    } else {
        inputsUser.classList.add("d-none");
        inputUserRePassword.classList.add("d-none");
        submitBtn.textContent = "Login";
        signUpLink.textContent = "Sign Up";
    }
});

let isSignupMode = false;
submitBtn.addEventListener("click", function () {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
  if (isSignupMode) {
    const username = usernameInput.value.trim();
    const repassword = rePasswordInput.value.trim();

    if (!username || !email || !password || !repassword) {
      showMessage("Please fill out all fields", "danger"); 
      return;
    }
    
    if(!userNameRegex.test(username)){
        showMessage("username must be 3-15 characters and contain only letters, numbers, _ or -", "danger")
        return;
    }
    
    if(!userEmailRegex.test(email)){
        showMessage("invalid email format","danger")
        return;
    }

    if(!userPasswordRegex.test(password)){
        showMessage("Password must be 3-15 characters and contain only letters, numbers, _ or -","danger")
        return;
    }

    if (password !== repassword) {
      showMessage("The passwords do not match!", "danger"); 
      return;
    }

    const users =JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage("This email is already registered!", "danger");
        return;
      }
      users.push({
        username,
        email,
        password
      });

    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Account created successfully!", "success");
    isSignupMode = false;
    submitBtn.textContent = "Login";
    signUpLink.textContent = "Sign Up";
    inputUserName.classList.add('d-none')
    inputUserRePassword.classList.add('d-none')
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    rePasswordInput.value = "";
    
    setTimeout(() => {
      hideMessage();
    }, 3000);
  }else {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    welcomeUserName.textContent = foundUser.username;
    welcomeMessage.classList.remove("d-none");
    headerSite.classList.remove("d-none");
    siteTitle.classList.add("d-none");
    document.getElementById("form").classList.add("d-none"); 
    showMessage("");
  } else {
    showMessage("Incorrect login credentials", "danger");
  }
}

});


function showMessage(message, type) {
  alertDiv.innerText = message;

  alertDiv.classList.remove("alert-danger", "alert-success");

  alertDiv.classList.add(`alert-${type}`);

  alertDiv.classList.remove("d-none");
}
  function hideMessage() {
    alertDiv.classList.add("d-none");
  }

logOutBtn.addEventListener("click", function () {
    welcomeMessage.classList.add("fade-out");
    headerSite.classList.add("fade-out");
  
    setTimeout(() => {
      welcomeMessage.classList.add("d-none");
      headerSite.classList.add("d-none");
      welcomeMessage.classList.remove("fade-out");
      headerSite.classList.remove("fade-out");
      siteTitle.classList.remove("d-none");
      form.classList.remove("d-none");
      submitBtn.classList.remove("d-none");
      signUpLink.textContent = "Sign Up";
      submitBtn.textContent = "Login";
      isSignupMode = false;
      inputsUser.classList.add("d-none");
      inputUserRePassword.classList.add("d-none");
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      rePasswordInput.value = "";
    }, 500);
  });
  

