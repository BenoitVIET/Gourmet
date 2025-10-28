GourmetTech

GourmetTech est une plateforme interactive de recettes culinaires permettant aux utilisateurs de découvrir, enregistrer et gérer leurs recettes favorites, tout en explorant de nouvelles options via une API externe.

Structure du Projet
Gourmet/
│├── assets/
│   ├── icons/                # Icônes pour le menu, mode sombre/clair, favoris, et logo
│   └── pictures/             # Images des recettes préenregistrées
│├── css/
│   └── benoit.css            # Styles complémentaires pour la gestion des favoris
│├── html/
│   ├── a_propos.html         # Page À propos
│   ├── favoris.html          # Page des favoris
│   └── recettes.html         # Page détaillée des recettes
│├── js/
│   ├── api-functions.js      # Gestion des appels API
│   ├── app-init.js           # Initialisation de l'application
│   ├── favorites-manager.js  # Gestion des favoris
│   ├── favorites-ui.js       # Interface utilisateur des favoris
│   ├── recipe-display.js     # Affichage des recettes
│   └── utils.js              # Fonctions utilitaires
│├── projet/
│   ├── .gitignore            # Fichiers à ignorer par Git
│   ├── maquettes.jpeg        # Maquettes du projet
│   ├── README.md             # Documentation du projet
│   ├── TP1                   # Cahier des charges du TP1
│   └── TP2                   # Cahier des charges du TP2
│└── index.html                # Page d'accueil
└── main.js                   # Script principal
└── style.css                 # Styles principauxFonctionnalités

Principales

Découverte de Recettes : Les utilisateurs peuvent découvrir des recettes aléatoires grâce à l'intégration de l'API TheMealDB.
Gestion des Favoris : Ajouter des recettes à une liste de favoris persistante via le localStorage.
Mode Clair/Sombre : Basculer entre les modes d'affichage pour une meilleure lisibilité en fonction des préférences de l'utilisateur.

Pages

Index.html : Page d'accueil avec la liste des recettes et options de filtrage.
À propos : Informations sur GourmetTech et ses objectifs.
Favoris : Liste des recettes préférées enregistrées par l'utilisateur.
Recettes : Détails complets d'une recette, y compris les ingrédients et les étapes.

API TheMealDB

Génération de Recettes Aléatoires : Intégration complète permettant de récupérer et d'afficher des recettes provenant de l'API publique TheMealDB.

Installation

Cloner le dépôt GitHub.
Ouvrir index.html dans un navigateur pour commencer à utiliser l'application.
Pour des tests locaux avec API, s'assurer que les requêtes sortantes sont autorisées.

Contribution
Les contributions sont les bienvenues ! Avant de soumettre une pull request, veuillez vous assurer que votre code suit les directives de style du projet et que toutes les fonctionnalités ajoutées sont accompagnées de tests pertinents.Contact
Pour toute question ou suggestion, veuillez contacter [votre-email@example.com].
N'hésite pas à adapter ce modèle selon tes besoins spécifiques ou à y ajouter des sections supplémentaires si nécessaire !
