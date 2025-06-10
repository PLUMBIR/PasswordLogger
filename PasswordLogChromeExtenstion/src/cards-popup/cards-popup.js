document.addEventListener("DOMContentLoaded", async function() {
    let userId = localStorage.getItem("userId");
    let userToken = localStorage.getItem("userToken");

    try {
        let response = await fetch(`https://localhost:44312/user/passwords/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Ошибка при получении паролей");
        }

        let passwordsData = await response.json();
        displayPasswords(passwordsData);
    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Ошибка: пользователь не найден");
        return;
    }

    try {
        let response = await fetch(`https://localhost:44312/user/passwords/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        });

        if (!response.ok) {
            throw new Error("Ошибка при получении паролей");
        }

        let passwordsData = await response.json();
        displayPasswords(passwordsData);
    } catch (error) {
        alert(error.message);
    }
});

function displayPasswords(passwords) {
    let cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    passwords.forEach(password => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <div class="card-info">
                <div class="card-info-img">
                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/password--v1.png" alt="password"/>
                </div>
                <div class="card-info-user">
                    <div class="card-name">${password.name}</div>
                    <div class="card-user-info">${password.username}</div>
                </div>
            </div>
            <div class="card-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0,0,256,256">
                    <g fill="#007aff"><g transform="scale(5.33333,5.33333)">
                        <path d="M38,14h-32v-4c0,-2.2 1.8,-4 4,-4h32v4c0,2.2 -1.8,4 -4,4zM42,24v-4h-32c-2.2,0 -4,1.8 -4,4v4h32c2.2,0 4,-1.8 4,-4zM42,38v-4h-32c-2.2,0 -4,1.8 -4,4v4h32c2.2,0 4,-1.8 4,-4z"></path>
                    </g></g>
                </svg>
            </div>
            <div class="dropdown-menu hidden">
                <button class="copy-name">
                    <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/copy.png" alt="copy"/>
                    Скопировать имя
                </button>
                <button class="copy-password">
                    <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/copy.png" alt="copy"/>
                    Скопировать пароль
                </button>
                <button class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M12,13v25c0,2.2 1.8,4 4,4h16c2.2,0 4,-1.8 4,-4v-25z" fill="#ff0000"></path><path d="M23,15h2v23h-2zM29,15h2v23h-2zM17,15h2v23h-2z" fill="#ffffff"></path><path d="M12,10h24v4h-24z" fill="#ff0000"></path><path d="M10,13h28v4h-28zM20,12v-4h8v4h2v-4c0,-1.1 -0.9,-2 -2,-2h-8c-1.1,0 -2,0.9 -2,2v4z" fill="#ff0000"></path></g></g>
                    </svg>
                    Удалить
                </button>
            </div>
        `;

        let buttonElement = cardElement.querySelector(".card-button");
        let dropdownMenu = cardElement.querySelector(".dropdown-menu");

        buttonElement.addEventListener("click", (event) => {
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.add("hidden");
                }
            });

            let rect = buttonElement.getBoundingClientRect();
            dropdownMenu.style.top = `${rect.bottom + window.scrollY}px`;
            dropdownMenu.style.left = `${rect.left + window.scrollX}px`;
            dropdownMenu.classList.toggle("hidden");

            event.stopPropagation();
        });

        document.addEventListener("click", (event) => {
            if (!dropdownMenu.contains(event.target) && !buttonElement.contains(event.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });

        cardElement.querySelector(".copy-name").addEventListener("click", () => {
            navigator.clipboard.writeText(password.name);
        });

        cardElement.querySelector(".copy-password").addEventListener("click", () => {
            navigator.clipboard.writeText(password.sitePassword);
        });

        cardElement.querySelector(".delete").addEventListener("click", async () => {
            let cardId = password.id;
            let userId = localStorage.getItem("userId");
            let userToken = localStorage.getItem("userToken");
            
            try {
                const response = await fetch(`https://localhost:44312/user/card`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userToken}`
                    },
                    body: JSON.stringify({ userId, cardId, cardType: "password" })
                });

                if (response.ok) {
                    cardElement.remove();
                } else {
                    console.error("Ошибка удаления карточки!");
                }
            } catch (error) {
                console.error("Ошибка запроса:", error);
            }
        });

        cardsContainer.appendChild(cardElement);
    });
}

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

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".footer-btn-passwordGenerator");

    if (button) {
        button.addEventListener("click", function() {
            window.location.href = "../password-generator/popup.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".add-btn");

    if (button) {
        button.addEventListener("click", function() {
            window.location.href = "../add-password/popup.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function() {
        let searchQuery = searchInput.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let cardName = card.querySelector(".card-name").textContent.toLowerCase();

            if (searchQuery === "") {
                card.style.display = "flex";
            } else {
                card.style.display = cardName.includes(searchQuery) ? "flex" : "none";
            }
        });
    });
});
