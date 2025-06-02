document.getElementById("loginBtn").addEventListener("click", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailErrorEmpty = document.getElementById("emailErrorEmpty");
    let emailErrorCorrect = document.getElementById("emailErrorCorrect");
    let passwordErrorEmpty = document.getElementById("passwordErrorEmpty");
    let passwordErrorShort = document.getElementById("passwordErrorCorrect");

    let isValid = true;

    // Сбрасываем ошибки перед новой проверкой
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // Проверяем email на пустое значение и правильный формат
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

    // Проверяем пароль на пустое значение и минимальную длину
    if (password === "") {
        passwordError.style.display = "block";
        passwordError.textContent = "Введите мастер-пароль";
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = "Мастер-пароль должен быть больше 8 символов";
        passwordError.style.display = "block";
        isValid = false;
    }

    // Если валидация пройдена, отправляем запрос
    if (isValid) {
        alert("глык");
        // fetch("https://your-server.com/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log("Успешный вход", data);
        // })
        // .catch(error => {
        //     console.error("Ошибка входа", error);
        // });
    }
});

// Скрываем ошибки при вводе данных
document.getElementById("email").addEventListener("input", function() {
    document.getElementById("emailError").style.display = "none";
});

document.getElementById("password").addEventListener("input", function() {
    document.getElementById("passwordError").style.display = "none";
});
