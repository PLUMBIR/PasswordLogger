document.querySelector(".btn-submit").addEventListener("click", async () => {
    const data = {
        userId: localStorage.getItem("userId"),
        url: document.getElementById("website").value,
        name: document.getElementById("site-name").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
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