document.querySelector(".btn-submit").addEventListener("click", async () => {
    const requiredFields = [
        { id: "website", name: "URL" },
        { id: "site-name", name: "Имя сайта" },
        { id: "username", name: "Имя пользователя" },
        { id: "password", name: "Пароль" }
    ];

    let hasErrors = false;

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        input.classList.remove("input-error"); // Сброс предыдущего состояния
        if (!input.value.trim()) {
            input.classList.add("input-error");
            hasErrors = true;
        }
    });

    if (hasErrors) {
        return;
    }

    const data = {
        userId: localStorage.getItem("userId"),
        url: document.getElementById("website").value.trim(),
        name: document.getElementById("site-name").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        folder: document.getElementById("folder").value,
        notes: document.getElementById("notes").value
    };

    try {
        let response = await fetch("https://localhost:44312/user/passwords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "../cards-popup/cards-popup.html";
        }

    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".close-btn");

    if (button) {
        button.addEventListener("click", function() {
            window.location.href = "../cards-popup/cards-popup.html";
        });
    }
});