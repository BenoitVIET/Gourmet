//******************************
// ========================
//  variables
// ========================
//******************************
const themeBtn = document.querySelector(".picto");
const body = document.querySelector("body");
const img = document.querySelector("img");
const moonImg = document.getElementById("moon");
const sunImg = document.getElementById("sun");
const aProposBody = document.querySelector(".aProposBody");

// menu burger
const burgerBtn = document.querySelector(".burgerBtn");
const toggle = document.querySelector(".toggle");
const closeBtnMenu = document.querySelector(".closeBtnMenu");

//filtres
const eachCard = document.querySelector(".eachCard");
const content = document.getElementById("content");
let difficultyFilter = document.querySelector(".difficultyFilter");

let recept = "";
let category = "";
let preparationTime = "";
let difficulty = "";

//declaration du tableau avec chaque recette
let recepies = [
    {
        title: "Tarte aux pommes",
        img: "assets/tart.jpg",
        category: "dessert",
        timePrep: "moyen",
        alt: "apple tart",
        difficulty: "facile",
        favorite: false,
    },
    {
        title: "Quiche à la tomate",
        alt: "Quiche à la tomate",
        img: "assets/ai-generated-8775126_1280.jpg",
        category: "plat",
        timePrep: "moyen",
        difficulty: "moyen",
        favorite: false,
    },
    {
        title: "Velouté de potiron",
        alt: "Velouté de potiron",
        img: "assets/soup.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "moyen",
        favorite: false,
    },
    {
        title: "Ramen tofu et légumes",
        alt: "Ramen tofu et légumes",
        img: "assets/tofu.jpg",
        category: "plat",
        timePrep: "rapide",
        difficulty: "moyen",
        favorite: false,
    },
    {
        title: "Banana Bread",
        alt: "Banana Bread",
        img: "assets/bananaBread.jpg",
        category: "dessert",
        timePrep: "moyen",
        difficulty: "facile",
        favorite: false,
    },
    {
        title: "Hummus",
        alt: "Hummus",
        img: "assets/hummus.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "facile",
        favorite: false,
    },
];

const filterCategories = document.querySelectorAll(".entryFilter input");
const filterTimes = document.querySelectorAll(".prepTimeFilter input");
const filterDifficulties = document.querySelectorAll(".difficultyFilter input");

//******************************
// ========================
//  functions
// ========================
//******************************

//filter les recettes en fonctions des radio button
function filterAll() {
    const allCard = content.querySelectorAll(".card");
    for (let card of allCard) {
        const cardCategory = card.querySelector(".recepieCat");
        const cardTime = card.querySelector(".recepieTime");
        const cardDifficulty = card.querySelector(".recepieLevel");

        let recepieCard = true;
        if (difficulty) {
            if (difficulty !== cardDifficulty.textContent) {
                console.log(recepieCard);
                recepieCard = false;
                console.log(recepieCard);
            }
        }

        if (preparationTime) {
            if (preparationTime !== cardTime.textContent) {
                recepieCard = false;
            }
        }

        if (category) {
            if (category !== cardCategory.textContent) {
                recepieCard = false;
            }
        }

        if (recepieCard === false) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    }
}


// fonction pour rechercher une recette
function findRecepie() {
    const allCard = content.querySelectorAll(".card");
    for (let card of allCard) {
        let recepieCard = true;
        if (!card
                .querySelector("h3")
                .textContent.toLowerCase()
                .trim()
                .includes(recepieSearch.value.toLowerCase().trim())
        ) {
            recepieCard = false;
        }
        if (recepieCard === false) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    }
}

//******************************
// ========================
//  local storage
// ========================
//******************************
let actualTheme = localStorage.getItem("theme");
if (actualTheme === "dark") {
    body.classList.add("dark");
    img.classList.add("dark");
    moonImg.style.display = "none";
    sunImg.style.display = "block";
} else {
    moonImg.style.display = "block";
    sunImg.style.display = "none";
}

//******************************
// ========================
//  main page
// ========================
//******************************

// ------------------------
//  button light dark mode
// -------------------------

themeBtn.addEventListener("click", function () {
    body.classList.toggle("dark");
    if (body.classList.contains("dark") && moonImg.style.display === "block") {
        localStorage.setItem("theme", "dark");
        img.classList.add("dark");
        moonImg.style.display = "none";
        sunImg.style.display = "block";
    } else if (sunImg.style.display === "block") {
        localStorage.removeItem("theme");
        moonImg.style.display = "block";
        sunImg.style.display = "none";
    }
});

// ------------------------
//  burger menu
// -------------------------

burgerBtn.addEventListener("click", function () {
    toggle.style.display = "block";
    burgerBtn.style.display = "none";
    toggle.classList.add("active");
});
closeBtnMenu.addEventListener("click", function () {
    toggle.style.display = "none";
    burgerBtn.style.display = "block";
});

// ------------------------
// afficher les recettes depuis le tableau:
// -------------------------

for (let recepie of recepies) {
    recept = eachCard.content.cloneNode(true);

    recept.querySelector("h3").textContent = recepie.title;

    recept.querySelector(".recepieLevel").textContent = recepie.difficulty;
    recept.querySelector(".recepieTime").textContent = recepie.timePrep;
    recept.querySelector(".recepieCat").textContent = recepie.category;
    recept.querySelector(".mealPic").src = recepie.img;
    recept.querySelector(".mealPic").alt = recepie.alt;

    content.appendChild(recept);
}

// ------------------------
// filter les recettes
// -------------------------

for (let filterCategory of filterCategories) {
    filterCategory.addEventListener("change", function () {
        category = this.dataset.category;

        filterAll();
    });
}
for (let filterTime of filterTimes) {
    filterTime.addEventListener("change", function () {
        preparationTime = this.dataset.preparationtime;
        filterAll();
    });
}
for (let filterDifficulty of filterDifficulties) {
    filterDifficulty.addEventListener("change", function () {
        difficulty = this.dataset.difficulty;
        filterAll();
    });
}

// ------------------------
// recherche avec nom de recette
// -------------------------

const recepieSearch = document.getElementById("recepieSearch");
const buttonSearch = document.querySelector(".recepie form button");

buttonSearch.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(recepieSearch.value);
    findRecepie();
});
