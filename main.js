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
        img: "assets/pictures/tart.jpg",
        category: "dessert",
        timePrep: "moyen",
        alt: "apple tart",
        difficulty: "facile",
        nbPersonnes: 8,
        ingredients: [
            "6-8 pommes Golden ou Gala",
            "1 pâte brisée",
            "80g de sucre en poudre",
            "30g de beurre",
            "1 œuf",
            "1 c. à café de cannelle",
            "2 c. à soupe de confiture d'abricot"
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Éplucher et couper les pommes en quartiers fins.",
            "Étaler la pâte dans un moule à tarte beurré.",
            "Disposer les pommes harmonieusement sur la pâte.",
            "Saupoudrer de sucre et cannelle, ajouter des morceaux de beurre.",
            "Badigeonner les bords avec l'œuf battu et enfourner 45-50 min.",
            "Glacer avec la confiture d'abricot chaude."
        ]
    },
    {
        title: "Quiche à la tomate",
        alt: "Quiche à la tomate",
        img: "assets/pictures/ai-generated-8775126_1280.jpg",
        category: "plat",
        timePrep: "moyen",
        difficulty: "moyen", 
        nbPersonnes: 6,
        ingredients: [
            "1 pâte brisée",
            "4-5 tomates moyennes",
            "150g de gruyère râpé",
            "3 œufs",
            "200ml de crème fraîche",
            "1 c. à café d'herbes de Provence",
            "Sel et poivre"
        ],
        etapes: [
            "Préchauffer le four à 200°C.",
            "Étaler la pâte dans un moule et piquer le fond.",
            "Couper les tomates en rondelles et les égoutter.",
            "Battre les œufs avec la crème, saler et poivrer.",
            "Disposer les tomates et le fromage sur la pâte.",
            "Verser le mélange œufs-crème et enfourner 35-40 min."
        ]
        
    },
    {
        title: "Velouté de potiron",
        alt: "Velouté de potiron",
        img: "assets/pictures/soup.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "moyen",
        nbPersonnes: 4,
        ingredients: [
            "800g de potiron",
            "1 oignon",
            "1 pomme de terre",
            "500ml de bouillon de légumes",
            "200ml de crème fraîche",
            "Sel, poivre, muscade"
        ],
        etapes: [
            "Éplucher et couper le potiron en morceaux.",
            "Faire revenir l'oignon émincé dans un peu d'huile.",
            "Ajouter le potiron et la pomme de terre, cuire 5 min.",
            "Verser le bouillon, porter à ébullition et cuire 25 min.",
            "Mixer, ajouter la crème et assaisonner."
        ]
    },
    {
        title: "Ramen tofu et légumes",
        alt: "Ramen tofu et légumes",
        img: "assets/pictures/tofu.jpg",
        category: "plat",
        timePrep: "rapide",
        difficulty: "moyen",
        nbPersonnes: 2,
        ingredients: [
            "200g de nouilles ramen",
            "150g de tofu ferme",
            "2 œufs",
            "1L de bouillon de légumes",
            "2 c. à soupe de miso",
            "1 carotte",
            "Épinards frais",
            "Oignons verts"
        ],
        etapes: [
            "Faire cuire les nouilles selon les instructions.",
            "Faire revenir le tofu coupé en dés.",
            "Chauffer le bouillon avec le miso.",
            "Cuire les œufs mollets (6 min).",
            "Assembler dans les bols : nouilles, tofu, légumes, bouillon."
        ]
    },
    {
        title: "Banana Bread",
        alt: "Banana Bread",
        img: "assets/pictures/bananaBread.jpg",
        category: "dessert",
        timePrep: "moyen",
        difficulty: "facile",
        nbPersonnes: 8,
        ingredients: [
            "3 bananes très mûres",
            "200g de farine",
            "100g de sucre",
            "80ml d'huile végétale",
            "1 œuf",
            "1 c. à café de levure",
            "1 c. à café de cannelle"
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Écraser les bananes à la fourchette.",
            "Mélanger tous les ingrédients secs.",
            "Incorporer l'œuf, l'huile et les bananes.",
            "Verser dans un moule à cake et enfourner 60 min."
        ]
    },
    {
        title: "Hummus",
        alt: "Hummus",
        img: "assets/pictures/hummus.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 6,
        ingredients: [
            "400g de pois chiches cuits",
            "3 c. à soupe de tahini",
            "2 gousses d'ail",
            "Jus de 1 citron",
            "3 c. à soupe d'huile d'olive",
            "Sel, paprika"
        ],
        etapes: [
            "Égoutter les pois chiches.",
            "Mixer avec l'ail et le tahini.",
            "Ajouter le jus de citron et l'huile progressivement.",
            "Assaisonner et ajuster la texture avec un peu d'eau.",
            "Servir avec un filet d'huile et du paprika."
        ]
    }
];

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { recettes };
}

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

    // Ajouter l'événement au bouton cœur
    const heartButton = recept.querySelector(".heart-button");
    if (heartButton) {
        // Créer un ID unique pour chaque recette basé sur le titre
        const recipeId = recepie.title.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
        
        // Supprimer l'ancien onclick
        heartButton.removeAttribute('onclick');
        
        // Ajouter le nouvel événement
        heartButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Créer les données de recette compatibles
            const recetteData = {
                titre: recepie.title,
                image: recepie.img,
                categorie: recepie.category,
                temps: "30 minutes", // Valeur par défaut
                difficulte: recepie.difficulty,
                nbPersonnes: recepie.nbPersonnes || 4,
                ingredients: recepie.ingredients || [],
                etapes: recepie.etapes || []
            };
            
            // Appeler la fonction de gestion des favoris
            if (typeof window.handleToggleFavorite !== 'undefined') {
                window.handleToggleFavorite(recipeId, recetteData, this);
            } else {
                // Fallback simple si la fonction n'est pas disponible
                if (this.src.includes('grayHeart')) {
                    this.src = 'assets/icons/redHeart.jpg';
                    this.alt = 'Retirer des favoris';
                } else {
                    this.src = 'assets/icons/grayHeart.jpg';
                    this.alt = 'Ajouter aux favoris';
                }
            }
        });
    }

    // Ajouter l'événement au bouton "Voir la recette"
    const viewButton = recept.querySelector(".recetteButton");
    if (viewButton) {
        // Créer un ID unique pour chaque recette
        const recipeId = recepie.title.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
        
        // Supprimer l'ancien onclick
        viewButton.removeAttribute('onclick');
        
        // Ajouter le nouvel événement
        viewButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `html/recettes.html?recette=${recipeId}`;
        });
    }

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



//button pour les favoris
