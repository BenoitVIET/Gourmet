// /**
//  * GOURMET TECH - Base de données des recettes
//  * Contient toutes les recettes locales du site
//  * @version 1.0
//  */

// // ================================
// // OPTION B (EN MÉMOIRE) : Détection dynamique des chemins
// // ================================
// // function getImagePath(imagePath) {
// //     const isFromRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
// //     if (isFromRoot && imagePath.startsWith('../')) {
// //         return imagePath.substring(3); // Enlève "../"
// //     }
// //     return imagePath;
// // }

// const recettes = {        
//     "tarteAuxPommes": {            
//         titre: "Tarte aux Pommes",
//         image: "assets/pictures/tart.jpg",
//         categorie: "Dessert",
//         temps: "60 minutes",
//         difficulte: "Facile",
//         nbPersonnes: 8,
//         ingredients: [
//             "6-8 pommes Golden ou Gala",
//             "1 pâte brisée",
//             "80g de sucre en poudre",
//             "30g de beurre",
//             "1 œuf",
//             "1 c. à café de cannelle",
//             "2 c. à soupe de confiture d'abricot"
//         ],
//         etapes: [
//             "Préchauffer le four à 180°C.",
//             "Éplucher et couper les pommes en quartiers fins.",
//             "Étaler la pâte dans un moule à tarte beurré.",
//             "Disposer les pommes harmonieusement sur la pâte.",
//             "Saupoudrer de sucre et cannelle, ajouter des morceaux de beurre.",
//             "Badigeonner les bords avec l'œuf battu et enfourner 45-50 min.",
//             "Glacer avec la confiture d'abricot chaude."
//         ]
//     },
//     "quicheTomate": {
//         titre: "Quiche à la tomate",
//         image: "assets/pictures/ai-generated-8775126_1280.jpg",
//         categorie: "Plat",
//         temps: "45 minutes",
//         difficulte: "Moyen",
//         nbPersonnes: 6,
//         ingredients: [
//             "1 pâte brisée",
//             "4-5 tomates moyennes",
//             "150g de gruyère râpé",
//             "3 œufs",
//             "200ml de crème fraîche",
//             "1 c. à café d'herbes de Provence",
//             "Sel et poivre"
//         ],
//         etapes: [
//             "Préchauffer le four à 200°C.",
//             "Étaler la pâte dans un moule et piquer le fond.",
//             "Couper les tomates en rondelles et les égoutter.",
//             "Battre les œufs avec la crème, saler et poivrer.",
//             "Disposer les tomates et le fromage sur la pâte.",
//             "Verser le mélange œufs-crème et enfourner 35-40 min."
//         ]
//     },
//     "veloutePotiron": {
//         titre: "Velouté de potiron",
//         image: "assets/pictures/soup.jpg",
//         categorie: "Entrée",
//         temps: "40 minutes",
//         difficulte: "Facile",
//         nbPersonnes: 4,
//         ingredients: [
//             "800g de potiron",
//             "1 oignon",
//             "1 pomme de terre",
//             "500ml de bouillon de légumes",
//             "200ml de crème fraîche",
//             "Sel, poivre, muscade"
//         ],
//         etapes: [
//             "Éplucher et couper le potiron en morceaux.",
//             "Faire revenir l'oignon émincé dans un peu d'huile.",
//             "Ajouter le potiron et la pomme de terre, cuire 5 min.",
//             "Verser le bouillon, porter à ébullition et cuire 25 min.",
//             "Mixer, ajouter la crème et assaisonner."
//         ]
//     },
//     "ramenTofu": {
//         titre: "Ramen au Tofu",
//         image: "assets/pictures/tofu.jpg",
//         categorie: "Plat",
//         temps: "35 minutes",
//         difficulte: "Moyen",
//         nbPersonnes: 2,
//         ingredients: [
//             "200g de nouilles ramen",
//             "150g de tofu ferme",
//             "2 œufs",
//             "1L de bouillon de légumes",
//             "2 c. à soupe de miso",
//             "1 carotte",
//             "Épinards frais",
//             "Oignons verts"
//         ],
//         etapes: [
//             "Faire cuire les nouilles selon les instructions.",
//             "Faire revenir le tofu coupé en dés.",
//             "Chauffer le bouillon avec le miso.",
//             "Cuire les œufs mollets (6 min).",
//             "Assembler dans les bols : nouilles, tofu, légumes, bouillon."
//         ]
//     },
//     "bananaBread": {
//         titre: "Banana Bread",
//         image: "assets/pictures/bananaBread.jpg",
//         categorie: "Dessert",
//         temps: "75 minutes",
//         difficulte: "Facile",
//         nbPersonnes: 8,
//         ingredients: [
//             "3 bananes très mûres",
//             "200g de farine",
//             "100g de sucre",
//             "80ml d'huile végétale",
//             "1 œuf",
//             "1 c. à café de levure",
//             "1 c. à café de cannelle"
//         ],
//         etapes: [
//             "Préchauffer le four à 180°C.",
//             "Écraser les bananes à la fourchette.",
//             "Mélanger tous les ingrédients secs.",
//             "Incorporer l'œuf, l'huile et les bananes.",
//             "Verser dans un moule à cake et enfourner 60 min."
//         ]
//     },
//     "hummus": {
//         titre: "Hummus Maison",
//         image: "assets/pictures/hummus.jpg",
//         categorie: "Entrée",
//         temps: "15 minutes",
//         difficulte: "Facile",
//         nbPersonnes: 6,
//         ingredients: [
//             "400g de pois chiches cuits",
//             "3 c. à soupe de tahini",
//             "2 gousses d'ail",
//             "Jus de 1 citron",
//             "3 c. à soupe d'huile d'olive",
//             "Sel, paprika"
//         ],
//         etapes: [
//             "Égoutter les pois chiches.",
//             "Mixer avec l'ail et le tahini.",
//             "Ajouter le jus de citron et l'huile progressivement.",
//             "Assaisonner et ajuster la texture avec un peu d'eau.",
//             "Servir avec un filet d'huile et du paprika."
//         ]
//     }
// };

// // Export pour utilisation dans d'autres modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { recettes };
// }