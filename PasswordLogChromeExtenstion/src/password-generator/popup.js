document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".footer-btn-allItems");

    if (button) {
        button.addEventListener("click", function() {
            window.location.href = "../cards-popup/cards-popup.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".footer-btn-logout");

    if (button) {
        button.addEventListener("click", function() {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            localStorage.removeItem("lastLogin");
            window.location.href = "../welcome-popup/popup.html";
        });
    }
});

document.querySelector(".generate-btn").addEventListener("click", async () => {
    const length = document.getElementById("length").value;
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    const requestData = {
        Length: parseInt(length),
        IncludeUppercase: uppercase,
        IncludeLowercase: lowercase,
        IncludeNumbers: numbers,
        IncludeSymbols: symbols
    };

    try {
        const response = await fetch("https://localhost:44312/user/passwordgenerator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error("Ошибка генерации пароля");
        }

        const password = await response.text();
        document.getElementById("password").textContent = password;
    } catch (error) {
        console.error("Ошибка:", error);
    }
});

document.querySelector(".copy-btn").addEventListener("click", () => {
    const passwordText = document.getElementById("password").textContent;
    navigator.clipboard.writeText(passwordText);
});
