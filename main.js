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

// Déclaration du tableau avec chaque recette (exposé en global)
window.recepies = [
    {
        title: "Tarte aux pommes",
        img: "assets/pictures/tart.jpg",
        img2: "assets/pictures/tart2.jpg",
        img3: "assets/pictures/tarte3.jpg",
        category: "dessert",
        timePrep: "moyen",
        alt: "apple tart",
        alt2: "apple tart",
        alt3: "apple tart",
        difficulty: "facile",
        nbPersonnes: 8,
        ingredients: [
            "6-8 pommes Golden ou Gala",
            "1 pâte brisée",
            "80g de sucre en poudre",
            "30g de beurre",
            "1 œuf",
            "1 c. à café de cannelle",
            "2 c. à soupe de confiture d'abricot",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Éplucher et couper les pommes en quartiers fins.",
            "Étaler la pâte dans un moule à tarte beurré.",
            "Disposer les pommes harmonieusement sur la pâte.",
            "Saupoudrer de sucre et cannelle, ajouter des morceaux de beurre.",
            "Badigeonner les bords avec l'œuf battu et enfourner 45-50 min.",
            "Glacer avec la confiture d'abricot chaude.",
        ],
    },
    {
        title: "Quiche à la tomate",
        alt: "Quiche à la tomate",
        img: "assets/pictures/ai-generated-8775126_1280.jpg",
        img2: "assets/pictures/quiche2.jpg",
        img3: "assets/pictures/quiche3.jpg",
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
            "Sel et poivre",
        ],
        etapes: [
            "Préchauffer le four à 200°C.",
            "Étaler la pâte dans un moule et piquer le fond.",
            "Couper les tomates en rondelles et les égoutter.",
            "Battre les œufs avec la crème, saler et poivrer.",
            "Disposer les tomates et le fromage sur la pâte.",
            "Verser le mélange œufs-crème et enfourner 35-40 min.",
        ],
    },
    {
        title: "Velouté de potiron",
        alt: "Velouté de potiron",
        img: "assets/pictures/soup.jpg",
        img2: "assets/pictures/veloute2.jpg",
        img3: "assets/pictures/veloute3.jpg",
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
            "Sel, poivre, muscade",
        ],
        etapes: [
            "Éplucher et couper le potiron en morceaux.",
            "Faire revenir l'oignon émincé dans un peu d'huile.",
            "Ajouter le potiron et la pomme de terre, cuire 5 min.",
            "Verser le bouillon, porter à ébullition et cuire 25 min.",
            "Mixer, ajouter la crème et assaisonner.",
        ],
    },
    {
        title: "Ramen tofu et légumes",
        alt: "Ramen tofu et légumes",
        img: "assets/pictures/tofu.jpg",
        img2: "assets/pictures/ramen2.jpg",
        img3: "assets/pictures/ramn3.jpg",
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
            "Oignons verts",
        ],
        etapes: [
            "Faire cuire les nouilles selon les instructions.",
            "Faire revenir le tofu coupé en dés.",
            "Chauffer le bouillon avec le miso.",
            "Cuire les œufs mollets (6 min).",
            "Assembler dans les bols : nouilles, tofu, légumes, bouillon.",
        ],
    },
    {
        title: "Salade de quinoa et légumes",
        alt: "Salade de quinoa et légumes",
        img: "assets/pictures/quinoa.jpg",
        img2: "assets/pictures/quinoa2.jpg",
        img3: "assets/pictures/quinoa3.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "100g de quinoa",
            "1 concombre",
            "1 poivron",
            "Tomates cerises",
            "2 c. à soupe d'huile d'olive",
            "Sel et poivre",
        ],
        etapes: [
            "Cuire le quinoa selon les instructions.",
            "Couper les légumes en petits dés.",
            "Mélanger le quinoa et les légumes.",
            "Assaisonner avec l'huile, le sel et le poivre.",
        ],
    },
    {
        title: "Velouté de carottes",
        alt: "Velouté de carottes",
        img: "assets/pictures/carotte.jpg",
        img2: "assets/pictures/carotte1.jpg",
        img3: "assets/pictures/carotte2.jpg",
        category: "entrée",
        timePrep: "moyen",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "500g de carottes",
            "1 oignon",
            "600ml de bouillon de légumes",
            "2 c. à soupe de crème végétale",
            "Sel et poivre",
        ],
        etapes: [
            "Éplucher et couper les carottes et l'oignon.",
            "Faire revenir l'oignon, ajouter les carottes et le bouillon.",
            "Cuire 20 min puis mixer.",
            "Ajouter la crème, saler et poivrer.",
        ],
    },
    {
        title: "Tartines avocat-tomate",
        alt: "Tartines avocat-tomate",
        img: "assets/pictures/avocat.jpg",
        img2: "assets/pictures/avocat2.jpg",
        img3: "assets/pictures/avocat3.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 2,
        ingredients: [
            "2 tranches de pain complet",
            "1 avocat",
            "1 tomate",
            "Sel, poivre, citron",
        ],
        etapes: [
            "Écraser l'avocat et assaisonner avec sel, poivre et citron.",
            "Étaler sur les tranches de pain.",
            "Ajouter les tranches de tomate sur le dessus.",
        ],
    },
    {
        title: "Curry de légumes",
        alt: "Curry de légumes",
        img: "assets/pictures/curry.jpg",
        img2: "assets/pictures/curry3.jpg",
        img3: "assets/pictures/curry2.jpg",
        category: "plat",
        timePrep: "moyen",
        difficulty: "moyen",
        nbPersonnes: 4,
        ingredients: [
            "1 courgette",
            "1 aubergine",
            "1 poivron",
            "200ml de lait de coco",
            "2 c. à soupe de curry",
            "Sel et poivre",
        ],
        etapes: [
            "Couper les légumes en dés.",
            "Faire revenir les légumes dans une poêle.",
            "Ajouter le lait de coco et le curry.",
            "Laisser mijoter 15-20 min.",
            "Assaisonner avec sel et poivre.",
        ],
    },
    {
        title: "Pâtes aux champignons",
        alt: "Pâtes aux champignons",
        img: "assets/pictures/PatesChampignons.jpg",
        img2: "assets/pictures/PatesChampignons2.jpg",
        img3: "assets/pictures/PatesChampignons3.jpg",
        category: "plat",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "250g de pâtes",
            "200g de champignons",
            "1 gousse d'ail",
            "2 c. à soupe d'huile d'olive",
            "Sel et poivre",
        ],
        etapes: [
            "Cuire les pâtes selon les instructions.",
            "Faire revenir les champignons avec l'ail et l'huile.",
            "Mélanger les pâtes avec les champignons.",
            "Assaisonner avec sel et poivre.",
        ],
    },
    {
        title: "Salade de lentilles",
        alt: "Salade de lentilles",
        img: "assets/pictures/lentilles.jpg",
        img2: "assets/pictures/lentilles2.jpg",
        img3: "assets/pictures/lentilles3.jpg",
        category: "entrée",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "200g de lentilles cuites",
            "1 carotte",
            "1 oignon",
            "2 c. à soupe d'huile d'olive",
            "Sel et poivre",
        ],
        etapes: [
            "Couper la carotte et l'oignon en petits dés.",
            "Mélanger avec les lentilles.",
            "Assaisonner avec l'huile, le sel et le poivre.",
        ],
    },
    {
        title: "Gratin de courgettes",
        alt: "Gratin de courgettes",
        img: "assets/pictures/courgettes.jpg",
        img2: "assets/pictures/courgettes2.jpg",
        img3: "assets/pictures/courgettes3.jpg",
        category: "plat",
        timePrep: "long",
        difficulty: "moyen",
        nbPersonnes: 4,
        ingredients: [
            "3 courgettes",
            "200ml de crème végétale",
            "50g de fromage râpé",
            "Sel, poivre et muscade",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Couper les courgettes en rondelles et les cuire légèrement à la vapeur.",
            "Mettre les courgettes dans un plat, verser la crème et ajouter le fromage.",
            "Cuire 30-35 min au four.",
            "Assaisonner avec sel, poivre et muscade.",
        ],
    },
    {
        title: "Muffins banane-chocolat",
        alt: "Muffins banane-chocolat",
        img: "assets/pictures/muffin.jpg",
        img2: "assets/pictures/muffin2.jpg",
        img3: "assets/pictures/muffin3.jpg",
        category: "dessert",
        timePrep: "moyen",
        difficulty: "facile",
        nbPersonnes: 6,
        ingredients: [
            "2 bananes mûres",
            "100g de farine complète",
            "50g de sucre de coco",
            "50g de pépites de chocolat",
            "1 c. à soupe d'huile végétale",
            "1 c. à café de levure",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Écraser les bananes et mélanger avec l'huile et le sucre.",
            "Ajouter la farine, la levure et les pépites.",
            "Remplir les moules à muffins et cuire 20-25 min.",
        ],
    },
    {
        title: "Brownie aux haricots noirs",
        alt: "Brownie aux haricots noirs",
        img: "assets/pictures/brownie.jpg",
        img2: "assets/pictures/brownie2.jpg",
        img3: "assets/pictures/brownie3.jpg",
        category: "dessert",
        timePrep: "moyen",
        difficulty: "moyen",
        nbPersonnes: 6,
        ingredients: [
            "400g haricots noirs cuits",
            "50g cacao",
            "50g sucre",
            "2 c. à soupe d'huile de coco",
            "1 c. à café d'extrait de vanille",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Mixer tous les ingrédients jusqu'à obtenir une pâte lisse.",
            "Verser dans un moule et cuire 25-30 min.",
        ],
    },
    {
        title: "Smoothie bowl fruits rouges",
        alt: "Smoothie bowl fruits rouges",
        img: "assets/pictures/smoothie.jpg",
        img2: "assets/pictures/smoothie2.jpg",
        img3: "assets/pictures/smoothie3.jpg",
        category: "dessert",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 2,
        ingredients: [
            "150g fruits rouges",
            "1 banane",
            "150ml lait végétal",
            "1 c. à soupe graines de chia",
            "1 c. à soupe flocons d'avoine",
        ],
        etapes: [
            "Mixer les fruits rouges, la banane et le lait.",
            "Verser dans un bol et saupoudrer graines de chia et flocons d'avoine.",
            "Servir frais.",
        ],
    },
    {
        title: "Burger veggie maison",
        alt: "Burger veggie maison",
        img: "assets/pictures/burger.jpg",
        img2: "assets/pictures/burger2.jpg",
        img3: "assets/pictures/burger3.jpg",
        category: "plat",
        timePrep: "moyen",
        difficulty: "moyen",
        nbPersonnes: 4,
        ingredients: [
            "4 pains à burger complets",
            "4 galettes de lentilles",
            "Laitue, tomates, oignons",
            "Sauce yaourt végétal",
            "Sel et poivre",
        ],
        etapes: [
            "Cuire les galettes de lentilles selon les instructions.",
            "Toaster les pains légèrement.",
            "Assembler burgers avec galette, légumes et sauce.",
            "Servir immédiatement.",
        ],
    },
    {
        title: "Pizza pita rapide",
        alt: "Pizza pita rapide",
        img: "assets/pictures/pizza.jpg",
        img2: "assets/pictures/pizza2.jpg",
        img3: "assets/pictures/pizza3.jpg",
        category: "plat",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 2,
        ingredients: [
            "2 pains pita",
            "100g sauce tomate",
            "50g fromage râpé",
            "Légumes au choix",
        ],
        etapes: [
            "Préchauffer le four à 200°C.",
            "Étaler la sauce tomate sur les pitas.",
            "Ajouter fromage et légumes.",
            "Cuire 10-12 min jusqu'à ce que le fromage fonde.",
        ],
    },
    {
        title: "Frites de patate douce au four",
        alt: "Frites de patate douce au four",
        img: "assets/pictures/frites.jpg",
        img2: "assets/pictures/frites2.jpg",
        img3: "assets/pictures/frites3.jpg",
        category: "plat",
        timePrep: "moyen",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "2 patates douces",
            "1 c. à soupe huile d'olive",
            "Sel, paprika",
        ],
        etapes: [
            "Préchauffer le four à 200°C.",
            "Couper les patates en frites et mélanger avec huile et épices.",
            "Étaler sur une plaque et cuire 25-30 min en retournant à mi-cuisson.",
        ],
    },
    {
        title: "Wraps végétariens",
        alt: "Wraps végétariens",
        img: "assets/pictures/wrap.jpg",
        img2: "assets/pictures/Wraps2.jpg",
        img3: "assets/pictures/Wraps3.jpg",
        category: "plat",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 2,
        ingredients: [
            "2 tortillas complètes",
            "Houmous",
            "Légumes crus (carottes, concombre, poivron)",
            "Feuilles de salade",
        ],
        etapes: [
            "Étaler le houmous sur les tortillas.",
            "Ajouter légumes et salade.",
            "Rouler et couper en deux.",
        ],
    },
    {
        title: "Cookies avoine & chocolat",
        alt: "Cookies avoine & chocolat",
        img: "assets/pictures/cookies.jpg",
        img2: "assets/pictures/cookies2.jpg",
        img3: "assets/pictures/cookies3.jpg",
        category: "dessert",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 6,
        ingredients: [
            "150g flocons d'avoine",
            "50g sucre de coco",
            "50g pépites de chocolat",
            "1 banane écrasée",
            "1 c. à soupe huile végétale",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Mélanger tous les ingrédients.",
            "Former des petits tas sur une plaque et cuire 12-15 min.",
        ],
    },
    {
        title: "Energy balls cacao-noix",
        alt: "Energy balls cacao-noix",
        img: "assets/pictures/energyBall.jpg",
        img2: "assets/pictures/energyBall2.jpg",
        img3: "assets/pictures/energyBall3.jpg",
        category: "dessert",
        timePrep: "rapide",
        difficulty: "facile",
        nbPersonnes: 4,
        ingredients: [
            "100g dattes dénoyautées",
            "50g noix",
            "1 c. à soupe cacao",
            "1 c. à soupe flocons d'avoine",
        ],
        etapes: [
            "Mixer tous les ingrédients jusqu'à obtenir une pâte collante.",
            "Former des petites boules et réfrigérer 30 min avant de servir.",
        ],
    },
    {
        title: "Granola maison",
        alt: "Granola maison",
        img: "assets/pictures/granola.jpg",
        img2: "assets/pictures/granola2.jpg",
        img3: "assets/pictures/granola3.jpg",
        category: "dessert",
        timePrep: "moyen",
        difficulty: "facile",
        nbPersonnes: 6,
        ingredients: [
            "150g flocons d'avoine",
            "50g amandes",
            "30g sirop d'agave",
            "1 c. à soupe huile coco",
            "1 c. à café cannelle",
        ],
        etapes: [
            "Préchauffer le four à 160°C.",
            "Mélanger tous les ingrédients et étaler sur une plaque.",
            "Cuire 20-25 min en remuant à mi-cuisson.",
        ],
    },
    {
        title: "Banana Bread",
        alt: "Banana Bread",
        img: "assets/pictures/bananaBread.jpg",
        img2: "assets/pictures/bananaBread2.jpg",
        img3: "assets/pictures/bananaBread3.jpg",
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
            "1 c. à café de cannelle",
        ],
        etapes: [
            "Préchauffer le four à 180°C.",
            "Écraser les bananes à la fourchette.",
            "Mélanger tous les ingrédients secs.",
            "Incorporer l'œuf, l'huile et les bananes.",
            "Verser dans un moule à cake et enfourner 60 min.",
        ],
    },
    {
        title: "Hummus",
        alt: "Hummus",
        img: "assets/pictures/hummus.jpg",
        img2: "assets/pictures/Hummus2.jpg",
        img3: "assets/pictures/Hummus3.jpg",
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
            "Sel, paprika",
        ],
        etapes: [
            "Égoutter les pois chiches.",
            "Mixer avec l'ail et le tahini.",
            "Ajouter le jus de citron et l'huile progressivement.",
            "Assaisonner et ajuster la texture avec un peu d'eau.",
            "Servir avec un filet d'huile et du paprika.",
        ],
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
        if (
            !card
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

// ------------------------
// afficher les recettes depuis le tableau:
// -------------------------

// Affichage des cartes de recettes locales et navigation vers recettes.html
for (let recepie of window.recepies) {
    const recept = eachCard.content.cloneNode(true);
    
    // Infos de base
    recept.querySelector("h3").textContent = recepie.title;
    recept.querySelector(".recepieLevel").textContent = recepie.difficulty;
    recept.querySelector(".recepieTime").textContent = recepie.timePrep;
    recept.querySelector(".recepieCat").textContent = recepie.category;

    // === CAROUSEL: Récupérer les éléments de CETTE carte ===
    const slides = recept.querySelectorAll(".slides");
    const dots = recept.querySelectorAll(".dot");
    
    // Définir les images pour chaque slide
    const images = [recepie.img, recepie.img2, recepie.img3];
    const alts = [recepie.alt, recepie.alt2, recepie.alt3];
    
    slides.forEach((slide, index) => {
        const img = slide.querySelector("img");
        if (img && images[index]) {
            img.src = images[index];
            img.alt = alts[index] || recepie.alt;
        }
    });

    // Variable locale pour l'index de ce carousel
    let currentSlideIndex = 0;

    // Fonction pour afficher une slide spécifique
    function showSlide(index) {
        // Gérer le dépassement (boucle circulaire)
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Cacher toutes les slides
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        
        // Retirer la classe active de tous les dots
        dots.forEach(dot => {
            dot.classList.remove("active");
        });
        
        // Afficher la slide actuelle
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].style.display = "block";
        }
        
        // Activer le dot correspondant
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add("active");
        }
    }

    // Initialiser: afficher la première slide
    showSlide(0);

    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        // Enlever le onclick du HTML
        dot.removeAttribute("onclick");
        
        dot.addEventListener("click", function(e) {
            e.stopPropagation();
            showSlide(index);
        });
    });

    // === BOUTON FAVORIS ===
    const heartButton = recept.querySelector(".heart-button");
    if (heartButton) {
        const recipeId = recepie.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-z0-9]/g, "");
        let favorites = [];
        try {
            favorites = JSON.parse(localStorage.getItem("gourmet-favorites")) || [];
        } catch (e) {}
        const isFavorite = favorites.some((fav) => fav.id === recipeId);
        heartButton.src = isFavorite
            ? "assets/icons/redHeart.png"
            : "assets/icons/grayHeart.png";
        heartButton.alt = isFavorite ? "Retirer des favoris" : "Ajouter aux favoris";
        
        heartButton.addEventListener("click", function (e) {
            e.stopPropagation();
            let favorites = [];
            try {
                favorites = JSON.parse(localStorage.getItem("gourmet-favorites")) || [];
            } catch (e) {}
            const index = favorites.findIndex((fav) => fav.id === recipeId);
            if (index === -1) {
                favorites.push({ id: recipeId });
                heartButton.src = "assets/icons/redHeart.png";
                heartButton.alt = "Retirer des favoris";
                if (typeof showNotification === "function") {
                    showNotification(`✅ "${recepie.title}" ajouté aux favoris !`, "add");
                }
            } else {
                favorites.splice(index, 1);
                heartButton.src = "assets/icons/grayHeart.png";
                heartButton.alt = "Ajouter aux favoris";
                if (typeof showNotification === "function") {
                    showNotification(`❌ "${recepie.title}" retiré des favoris !`, "remove");
                }
            }
            localStorage.setItem("gourmet-favorites", JSON.stringify(favorites));
        });
    }

    // === BOUTON VOIR LA RECETTE ===
    const viewButton = recept.querySelector(".recetteButton");
    if (viewButton) {
        const recipeId = recepie.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-z0-9]/g, "");
        viewButton.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = `html/recettes.html?recette=${recipeId}`;
        });
    }

    // ✓ AJOUTER LA CARTE AU DOM (C'ÉTAIT MANQUANT!)
    content.appendChild(recept);
}



// ------------------------
// filter les recettes
// -------------------------

for (let filterCategory of filterCategories) {
    filterCategory.addEventListener("change", function () {
        if (!this.checked) {
            category = "";
            filterAll();
        } else {
            category = this.dataset.category;
            filterAll();

            let currentButton = this;
            //empecher de cocher plusieurs checkbox en même temps
            filterCategories.forEach(function (e) {
                if (e !== currentButton) {
                    e.checked = false;
                }
            });
        }
    });
}
for (let filterTime of filterTimes) {
    filterTime.addEventListener("change", function () {
        if (!this.checked) {
            //si je décoche la case, le reste apparait
            preparationTime = "";
            filterAll();
        } else {
            preparationTime = this.dataset.preparationtime;
            filterAll();

            let currentButton = this;
            //empecher de cocher plusieurs checkbox en même temps
            filterTimes.forEach(function (e) {
                if (e !== currentButton) {
                    e.checked = false;
                }
            });
        }
    });
}

for (let filterDifficulty of filterDifficulties) {
    filterDifficulty.addEventListener("change", function () {
        if (!this.checked) {
            difficulty = "";
            filterAll();
        } else {
            difficulty = this.dataset.difficulty;
            filterAll();

            let currentButton = this;
            //empecher de cocher plusieurs checkbox en même temps
            filterDifficulties.forEach(function (e) {
                if (e !== currentButton) {
                    e.checked = false;
                }
            });
        }
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