document.addEventListener("DOMContentLoaded", function() {
    let userId = localStorage.getItem("userId");
    let userToken = localStorage.getItem("userToken");
    let lastLogin = Number(localStorage.getItem("lastLogin"));

    if (userId && userToken && lastLogin && Date.now() - lastLogin < 60 * 60 * 1000) {
        window.location.href = "../cards-popup/cards-popup.html";
    }
});

document.getElementById("loginBtn").addEventListener("click", async function(event) {
    event.preventDefault();

    let isValid = true;

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.style.display = "none";
    passwordError.style.display = "none";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailError.style.display = "block";
        emailError.textContent = "Введите электронную почту"
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.style.display = "block";
        emailError.textContent = "Введите корректную электронную почту"
        isValid = false;
    }

    if (password === "") {
        passwordError.style.display = "block";
        passwordError.textContent = "Введите мастер-пароль";
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = "Мастер-пароль должен быть больше 8 символов";
        passwordError.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        try {
            let response = await fetch("https://localhost:44312/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    masterPassword: password
                })
            });

            if (!response.ok) {
                throw new Error("Неверный логин или пароль");
            }
            
            let data = await response.json();

            localStorage.setItem("userId", data.id);
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("lastLogin", Date.now());

            window.location.href = "../cards-popup/cards-popup.html";
        } catch (error) {
            alert(error.message);
        }
    }
});

document.getElementById("email").addEventListener("input", function() {
    document.getElementById("emailError").style.display = "none";
});

document.getElementById("password").addEventListener("input", function() {
    document.getElementById("passwordError").style.display = "none";
});
