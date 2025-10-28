# 🍽️ GourmetTech

**Plateforme de recettes culinaires interactive**

Une application web permettant de découvrir, rechercher et gérer ses recettes favorites, développée dans le cadre d'un projet pédagogique.

---

## 📋 À propos du projet

GourmetTech est une plateforme de recettes qui combine des recettes locales avec l'intégration de l'API TheMealDB pour offrir une grande variété de plats du monde entier. L'application propose une interface intuitive et responsive, accessible sur tous les appareils.

### Fonctionnalités principales

✨ **Découverte de recettes**
- Catalogue de recettes locales variées
- Intégration de recettes internationales via l'API TheMealDB
- Suggestions de recettes similaires

🔍 **Recherche et filtres**
- Recherche par nom de recette
- Filtrage par catégorie (entrée, plat, dessert)
- Filtrage par temps de préparation
- Filtrage par niveau de difficulté

❤️ **Système de favoris**
- Ajout/retrait de recettes aux favoris
- Sauvegarde persistante avec localStorage
- Page dédiée aux recettes favorites

🎨 **Interface personnalisable**
- Mode clair/sombre
- Design responsive (mobile, tablette, desktop)
- Animations et transitions fluides

---

## 🗂️ Structure du projet

```
GourmetTech/
│
├── index.html              # Page d'accueil avec liste des recettes
├── main.js                 # Script principal
├── style.css               # Styles principaux
│
├── html/
│   ├── recettes.html       # Page de détail d'une recette
│   ├── favoris.html        # Page des recettes favorites
│   └── a_propos.html       # Page à propos et contact
│
├── js/
│   ├── utils.js            # Fonctions utilitaires
│   ├── api-functions.js    # Gestion des appels API
│   ├── favorites-manager.js # Gestion des favoris
│   ├── favorites-ui.js     # Interface utilisateur des favoris
│   ├── recipe-display.js   # Affichage des recettes
│   └── app-init.js         # Initialisation de l'application
│
├── css/
│   └── benoit.css          # Styles complémentaires
│
└── assets/
    ├── icons/              # Icônes de l'interface
    └── pictures/           # Images des recettes
```

---

## 🚀 Installation et lancement

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un éditeur de code (VS Code recommandé)
- Extension Live Server (optionnel mais recommandé)

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/votre-username/gourmettech.git
cd gourmettech
```

2. **Ouvrir le projet**
   - Ouvrez le dossier dans votre éditeur de code
   - Lancez `index.html` avec Live Server ou ouvrez-le directement dans votre navigateur

3. **C'est prêt !** 🎉
   - L'application est prête à être utilisée
   - Aucune installation de dépendances nécessaire

---

## 💻 Technologies utilisées

- **HTML5** - Structure sémantique des pages
- **CSS3** - Stylisation et responsive design
- **JavaScript vanilla (ES6+)** - Logique et interactivité
- **localStorage** - Sauvegarde des favoris
- **API TheMealDB** - Recettes internationales

---

## 🎯 Fonctionnalités détaillées

### Page d'accueil
- Affichage dynamique des recettes locales
- Système de recherche en temps réel
- Filtres multiples (catégorie, temps, difficulté)
- Ajout rapide aux favoris

### Page de détail
- Informations complètes sur la recette
- Liste des ingrédients avec quantités
- Étapes de préparation numérotées
- Suggestions de recettes similaires via l'API
- Gestion des favoris

### Page des favoris
- Liste de toutes les recettes sauvegardées
- Support des recettes locales et API
- Suppression rapide des favoris
- Message si aucun favori

### Page à propos
- Présentation du projet
- Formulaire de contact
- FAQ interactive (accordéon)

---

## 🔧 Détails techniques

### Gestion des favoris
Les favoris sont stockés dans le `localStorage` du navigateur avec la structure suivante :
```javascript
{
  id: "identifiant-unique",
  nom: "Nom de la recette",
  image: "chemin/vers/image.jpg",
  categorie: "Catégorie",
  // ... autres informations
}
```

### Intégration API
L'application utilise l'API publique TheMealDB :
- Recherche de recettes : `https://www.themealdb.com/api/json/v1/1/search.php?s={terme}`
- Recette aléatoire : `https://www.themealdb.com/api/json/v1/1/random.php`
- Détails d'une recette : `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`

### Responsive Design
Breakpoints :
- Mobile : < 768px
- Tablette : 768px - 992px
- Desktop : > 992px

---

## 🎨 Personnalisation

### Changer le thème
Le thème clair/sombre se change via l'icône en haut à droite. La préférence est sauvegardée automatiquement.

### Ajouter des recettes locales
Pour ajouter des recettes, modifiez le tableau `window.recepies` dans `main.js` :
```javascript
{
  title: "Nom de la recette",
  img: "assets/pictures/image.jpg",
  category: "plat",
  timePrep: "moyen",
  difficulty: "facile",
  nbPersonnes: 4,
  ingredients: [...],
  etapes: [...]
}
```

---

## 🐛 Problèmes connus

- La traduction automatique des recettes API peut parfois être lente
- Certaines images de l'API peuvent ne pas se charger

---

## 📝 Améliorations futures

- [ ] Système de notation des recettes
- [ ] Partage de recettes sur les réseaux sociaux
- [ ] Export des recettes en PDF
- [ ] Mode impression optimisé
- [ ] Ajout de recettes personnalisées par l'utilisateur

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d'une formation en développement web.

---

## 📄 Licence

Ce projet est un projet pédagogique à usage éducatif.

---

## 🙏 Remerciements

- API TheMealDB pour les recettes internationales
- Google Fonts pour les polices utilisées
- Tous les testeurs qui ont contribué à améliorer l'application

---

**Bon appétit et bonne découverte culinaire ! 🍳**