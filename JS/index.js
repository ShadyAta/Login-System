var nameinput = document.getElementById("name");
var emailinput = document.getElementById("email");
var passinput = document.getElementById("password");
var signUp = document.getElementById("signup");
var loginbtn = document.getElementById("Login");
var logoutbtn = document.getElementById("Logout");
var loginarr = JSON.parse(localStorage.getItem("container")) || [];

function additem() {
  if (
    nameinput.value.trim() === "" ||
    emailinput.value.trim() === "" ||
    passinput.value.trim() === ""
  ) {
    document.querySelector("p.required").innerHTML = "All inputs are required";
    document.querySelector("p.required").classList.remove("d-none");
    document.querySelector("p.required").style.color = "red";
    return;
  }

  for (var i = 0; i < loginarr.length; i++) {
    if (loginarr[i].email === emailinput.value.trim()) {
      document.querySelector("p.required").innerHTML = "Email already exists";
      document.querySelector("p.required").classList.remove("d-none");
      document.querySelector("p.required").style.color = "red";
      return;
    }
  }

  if (validationName() && validationEmail() && validationPassword()) {
    var log = {
      name: nameinput.value,
      email: emailinput.value,
      password: passinput.value,
    };
    loginarr.push(log);
    localStorage.setItem("container", JSON.stringify(loginarr));
    document.querySelector("p.required").innerHTML = "Success";
    document.querySelector("p.required").classList.remove("d-none");
    document.querySelector("p.required").style.color = "green";
  } else {
    document.querySelector("p.required").innerHTML = "Invalid input!";
    document.querySelector("p.required").classList.remove("d-none");
    document.querySelector("p.required").style.color = "red";
  }
}

function signup() {
  nameinput.classList.remove("d-none");
  signUp.innerHTML = "Sign in";
  loginbtn.innerHTML = "Sign Up";
}

function signin() {
  nameinput.classList.add("d-none");
  signUp.innerHTML = "Sign up";
  loginbtn.innerHTML = "Login";
}

signUp.addEventListener("click", function (e) {
  e.preventDefault();
  if (nameinput.classList.contains("d-none")) {
    signup();
  } else {
    signin();
  }
});

loginbtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (loginbtn.innerHTML === "Sign Up") {
    additem();
  } else {
    if (emailinput.value.trim() === "" || passinput.value.trim() === "") {
      document.querySelector("p.required").innerHTML =
        "All inputs are required";
      document.querySelector("p.required").classList.remove("d-none");
      document.querySelector("p.required").style.color = "red";
      return;
    }

    var flag = false;
    for (var i = 0; i < loginarr.length; i++) {
      if (
        loginarr[i].email === emailinput.value &&
        loginarr[i].password === passinput.value
      ) {
        flag = true;
        break;
      }
    }

    if (flag) {
      document.querySelector(".login").classList.add("d-none");
      document.querySelector(".logout").classList.remove("d-none");

      for (var i = 0; i < loginarr.length; i++) {
        if (
          loginarr[i].email === emailinput.value &&
          loginarr[i].password === passinput.value
        ) {
          document.querySelector(".Name").innerHTML = loginarr[i].name;
          break;
        }
      }
    } else {
      document.querySelector("p.required").innerHTML =
        "incorrect email or password!";
      document.querySelector("p.required").style.color = "red";
      document.querySelector("p.required").classList.remove("d-none");
    }
  }
});

logoutbtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".logout").classList.add("d-none");
  document.querySelector(".login").classList.remove("d-none");
});

// =============Regex===============

function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/;
  var text = nameinput.value;
  return regex.test(text);
}
function validationEmail() {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  var text = emailinput.value;
  return regex.test(text);
}
function validationPassword() {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  var text = passinput.value;
  return regex.test(text);
}
