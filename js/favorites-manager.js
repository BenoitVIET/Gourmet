// Fonction utilitaire pour afficher les favoris (remplace le script inline)
window.afficherFavoris = async function () {
    let favorites = [];
    try { favorites = JSON.parse(localStorage.getItem('gourmet-favorites')) || []; } catch (e) {}
    const favorisList = document.getElementById('favoris-list');
    favorisList.innerHTML = '';
    if (!favorites.length) {
        document.getElementById('no-favorites').style.display = 'block';
        return;
    } else {
        document.getElementById('no-favorites').style.display = 'none';
    }

    let locales = window.recepies || [];
    const template = document.querySelector('.eachCardFavoris');
    favorisList.innerHTML = '';
    for (let fav of favorites) {
        let recette = locales.find(r => r.title.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') === fav.id);
        if (recette) {
            const card = template.content.cloneNode(true);
            card.querySelector('.mealPic').src = '../' + recette.img;
            card.querySelector('.mealPic').alt = recette.alt || recette.title;
            card.querySelector('h3').textContent = recette.title;
            card.querySelector('.recepieCat').textContent = recette.category;
            card.querySelector('.recepieTime').textContent = recette.timePrep;
            card.querySelector('.recepieLevel').textContent = recette.difficulty;
            card.querySelector('.recetteButton').addEventListener('click', function () {
                window.location.href = `recettes.html?recette=${fav.id}`;
            });
            card.querySelector('.heart-button').addEventListener('click', function (e) {
                e.stopPropagation();
                let favorites = [];
                try { favorites = JSON.parse(localStorage.getItem('gourmet-favorites')) || []; } catch (e) {}
                const index = favorites.findIndex(f => f.id === fav.id);
                if (index !== -1) {
                    const recetteASupprimer = favorites[index];
                    favorites.splice(index, 1);
                    localStorage.setItem('gourmet-favorites', JSON.stringify(favorites));
                    if (recetteASupprimer && typeof showNotification === 'function') {
                        showNotification(`❌ "${recetteASupprimer.nom || recetteASupprimer.titre}" retiré des favoris !`, 'remove');
                    }
                    setTimeout(() => window.afficherFavoris(), 450);
                }
            });
            favorisList.appendChild(card);
        } else if (/^\d+$/.test(fav.id)) {
            // Recette API
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.id}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.meals && data.meals[0]) {
                    const apiRecipe = data.meals[0];
                    const card = template.content.cloneNode(true);
                    card.querySelector('.mealPic').src = apiRecipe.strMealThumb;
                    card.querySelector('.mealPic').alt = apiRecipe.strMeal;
                    card.querySelector('h3').textContent = apiRecipe.strMeal;
                    card.querySelector('.recepieCat').textContent = apiRecipe.strCategory;
                    card.querySelector('.recepieTime').textContent = apiRecipe.strArea;
                    card.querySelector('.recepieLevel').textContent = apiRecipe.strTags || '';
                    card.querySelector('.recetteButton').addEventListener('click', function () {
                        window.location.href = `recettes.html?recette=${fav.id}`;
                    });
                        card.querySelector('.heart-button').addEventListener('click', function (e) {
                            e.stopPropagation();
                            let favorites = [];
                            try { favorites = JSON.parse(localStorage.getItem('gourmet-favorites')) || []; } catch (e) {}
                            const index = favorites.findIndex(f => f.id === fav.id);
                            if (index !== -1) {
                                const recetteASupprimer = favorites[index];
                                favorites.splice(index, 1);
                                localStorage.setItem('gourmet-favorites', JSON.stringify(favorites));
                                if (recetteASupprimer && typeof showNotification === 'function') {
                                    showNotification(`❌ "${recetteASupprimer.nom || apiRecipe.strMeal}" retiré des favoris !`, 'remove');
                                }
                                setTimeout(() => window.afficherFavoris(), 450);
                            }
                        });
                    favorisList.appendChild(card);
                }
            } catch (e) {}
        }
    }
}
/**
 * GOURMET TECH - Gestionnaire des favoris
 * Gestion complète du système de favoris avec localStorage
 * @version 1.0
 */

class FavoritesManager {
    constructor() {
        this.storageKey = 'gourmet-favorites';
    }

    /**
     * Récupérer tous les favoris
     */
    getFavorites() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }

    /**
     * Sauvegarder les favoris
     */
    saveFavorites(favorites) {
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }

    /**
     * Vérifier si une recette est en favoris
     */
    isFavorite(recetteId) {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.id === recetteId);
    }







    /**
     * Ajouter une recette locale aux favoris
     */
    addLocalRecipe(recetteId, recetteData) {
        const favorites = this.getFavorites();
        
        if (this.isFavorite(recetteId)) {
            return { success: false, message: 'Recette déjà en favoris' };
        }

        const favoriteRecipe = {
            id: recetteId,
            nom: recetteData.titre,
            titre: recetteData.titre,
            image: recetteData.image,
            categorie: recetteData.categorie,
            temps: recetteData.temps,
            portions: recetteData.nbPersonnes + ' personnes',
            description: 'Délicieuse recette de ' + recetteData.titre.toLowerCase(),
            ingredients: recetteData.ingredients,
            etapes: recetteData.etapes,
            apiRecipe: false,
            dateAdded: new Date().toLocaleDateString('fr-FR')
        };

        favorites.push(favoriteRecipe);
        this.saveFavorites(favorites);
        
        return { 
            success: true,
            action: 'add',
            message: `✅ "${recetteData.titre}" ajouté aux favoris !` 
        };
    }

    /**
     * Ajouter une recette API aux favoris
     */
    async addApiRecipe(recetteId, titre, buttonElement = null) {
        const favorites = this.getFavorites();
        
        if (this.isFavorite(recetteId)) {
            return this.removeFromFavorites(recetteId, buttonElement);
        }

        try {
            // Récupérer les données complètes via l'API
            const completeRecipe = await window.getCompleteApiRecipe(recetteId, titre);
            
            if (completeRecipe) {
                favorites.push(completeRecipe);
                this.saveFavorites(favorites);
                
                // Mettre à jour l'icône si fournie
                if (buttonElement) {
                    this.updateHeartIcon(buttonElement, true);
                }
                
                return { 
                    success: true,
                    action: 'add',
                    message: `✅ "${completeRecipe.nom}" ajouté aux favoris !` 
                };
            }
            
        } catch (error) {
            console.error('Erreur ajout API aux favoris:', error);
            
            // Fallback avec données minimales
            const fallbackRecipe = {
                id: recetteId,
                nom: titre,
                temps: "Variable",
                portions: "4-6 personnes",
                description: `Recette internationale: ${titre}`,
                apiRecipe: true,
                dateAdded: new Date().toLocaleDateString('fr-FR')
            };
            
            favorites.push(fallbackRecipe);
            this.saveFavorites(favorites);
            
            if (buttonElement) {
                this.updateHeartIcon(buttonElement, true);
            }
            
            return { 
                success: true,
                action: 'add',
                message: `✅ "${titre}" ajouté aux favoris !` 
            };
        }
    }

    /**
     * Retirer une recette des favoris
     */
    removeFromFavorites(recetteId, buttonElement = null) {
        const favorites = this.getFavorites();
        const recetteASupprimer = favorites.find(fav => fav.id === recetteId);
        
        if (!recetteASupprimer) {
            return { success: false, message: 'Recette non trouvée' };
        }

        const newFavorites = favorites.filter(fav => fav.id !== recetteId);
        this.saveFavorites(newFavorites);
        
        // Mettre à jour l'icône si fournie
        if (buttonElement) {
            this.updateHeartIcon(buttonElement, false);
        }
        
        return { 
            success: true,
            action: 'remove',
            message: `❌ "${recetteASupprimer.nom || recetteASupprimer.titre}" retiré des favoris !` 
        };
    }

    /**
     * Basculer l'état favori d'une recette
     */
    async toggleFavorite(recetteId, recetteData = null, buttonElement = null) {
        if (this.isFavorite(recetteId)) {
            return this.removeFromFavorites(recetteId, buttonElement);
        } else {
            if (recetteId.startsWith('api_')) {
                return await this.addApiRecipe(recetteId, recetteData?.titre || 'Recette API', buttonElement);
            } else {
                return this.addLocalRecipe(recetteId, recetteData);
            }
        }
    }

    /**
     * Mettre à jour l'icône de cœur
     */
    updateHeartIcon(element, isFavorite) {
        // Détecter le bon chemin selon la page actuelle
        const isFromRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const basePath = isFromRoot ? "assets/icons/" : "../assets/icons/";
        
        const iconPath = isFavorite ? `${basePath}redHeart.jpg` : `${basePath}grayHeart.jpg`;
        const altText = isFavorite ? "Retirer des favoris" : "Ajouter aux favoris";
        
        if (element.tagName === 'IMG') {
            element.src = iconPath;
            element.alt = altText;
        } else if (element.tagName === 'BUTTON') {
            const heartImg = element.querySelector('img');
            if (heartImg) {
                heartImg.src = iconPath;
                heartImg.alt = altText;
            }
        }
    }

    /**
     * Obtenir le nombre de favoris
     */
    getFavoritesCount() {
        return this.getFavorites().length;
    }

    /**
     * Nettoyer les favoris (supprimer les doublons, etc.)
     */
    cleanupFavorites() {
        const favorites = this.getFavorites();
        const uniqueFavorites = favorites.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
        );
        
        if (uniqueFavorites.length !== favorites.length) {
            this.saveFavorites(uniqueFavorites);
            return { 
                success: true, 
                message: `🧹 ${favorites.length - uniqueFavorites.length} doublons supprimés` 
            };
        }
        
        return { success: true, message: '✅ Favoris déjà propres' };
    }

    /**
     * Vérifier si une recette API est dans les favoris
     */
    isApiFavorite(mealId) {
        const apiId = mealId.startsWith('api_') ? mealId : `api_${mealId}`;
        return this.isFavorite(apiId);
    }

    /**
     * Basculer le statut favori d'une recette API
     */
    async toggleApiRecipe(apiRecipe) {
        const apiId = apiRecipe.id || `api_${apiRecipe.idMeal}`;
        
        if (this.isFavorite(apiId)) {
            // Retirer des favoris
            return this.removeFromFavorites(apiId);
        } else {
            // Ajouter aux favoris avec fallback immédiat si traduction échoue
            try {
                return await this.addApiRecipe(apiId, apiRecipe.nom || apiRecipe.strMeal);
            } catch (error) {
                // Ajout direct sans traduction
                const favorites = this.getFavorites();
                const fallbackRecipe = {
                    id: apiId,
                    nom: apiRecipe.nom || apiRecipe.strMeal || 'Recette API',
                    image: apiRecipe.image || apiRecipe.strMealThumb,
                    categorie: apiRecipe.categorie || apiRecipe.strCategory || 'Plat international',
                    temps: "Variable",
                    portions: "4-6 personnes",
                    description: `Recette internationale: ${apiRecipe.nom || apiRecipe.strMeal}`,
                    origine: apiRecipe.origine || apiRecipe.strArea || 'International',
                    apiRecipe: true,
                    dateAdded: new Date().toLocaleDateString('fr-FR')
                };
                
                favorites.push(fallbackRecipe);
                this.saveFavorites(favorites);
                
                return { 
                    success: true, 
                    action: 'add',
                    message: `✅ "${fallbackRecipe.nom}" ajouté aux favoris !` 
                };
            }
        }
    }
}

// Instance globale
const favoritesManager = new FavoritesManager();

// Fonctions globales pour compatibilité
window.addToFavorites = (recette) => favoritesManager.addLocalRecipe(recette.id, recette);
window.isFavorite = (recetteId) => favoritesManager.isFavorite(recetteId);
window.addApiToFavorites = (id, titre, button, event) => {
    if (event) event.stopPropagation();
    favoritesManager.addApiRecipe(id, titre, button).then(result => {
        if (typeof showNotification === 'function') {
            showNotification(result.message, result.success ? 'add' : 'error');
        }
    });
};

// ================================
// GESTION DE LA PAGE FAVORIS
// ================================

// Fonction pour charger et afficher les favoris
async function afficherFavoris() {
    const favorites = JSON.parse(localStorage.getItem('gourmet-favorites') || '[]');
    const container = document.getElementById('favoris-list');
    const noFavoritesMsg = document.getElementById('no-favorites');
    
    if (favorites.length === 0) {
        container.innerHTML = '';
        noFavoritesMsg.style.display = 'block';
        return;
    }
    
    noFavoritesMsg.style.display = 'none';
    
    // Traiter chaque favori (local et API)
    const favoriteCards = await Promise.all(favorites.map(async (recette) => {
        let displayData = recette;
        
        // Si c'est une recette API, essayer de la traduire
        if (recette.id && recette.id.startsWith('api_')) {
            displayData = await translateApiRecipe(recette);
        }
        
        return createFavoriteCard(displayData);
    }));
    
    container.innerHTML = favoriteCards.join('');
}

// Fonction pour traduire une recette API
async function translateApiRecipe(recette) {
    try {
        // Utiliser la fonction de traduction des modules API si disponible
        if (typeof translateText === 'function') {
            const translatedTitle = await translateText(recette.nom || recette.titre, 'en', 'fr');
            const translatedDescription = recette.description ? await translateText(recette.description, 'en', 'fr') : 'Recette délicieuse à découvrir';
            
            return {
                ...recette,
                nom: translatedTitle || recette.nom || recette.titre,
                description: translatedDescription,
                temps: recette.temps || 'Temps non spécifié',
                portions: recette.portions || 'Portions non spécifiées'
            };
        }
    } catch (error) {
        // Traduction non disponible, utilisation des données originales
    }
    
    return {
        ...recette,
        nom: recette.nom || recette.titre || 'Recette sans nom',
        description: recette.description || 'Délicieuse recette à découvrir',
        temps: recette.temps || 'Temps non spécifié',
        portions: recette.portions || 'Portions non spécifiées'
    };
}

// Fonction pour créer la carte HTML d'un favori
function createFavoriteCard(recette) {
    // Déterminer l'état favori et l'icône
    const isFavorite = window.favoritesManager.isFavorite(recette.id);
    const heartIcon = isFavorite ? '../assets/icons/redHeart.jpg' : '../assets/icons/grayHeart.jpg';
    const altText = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';

    return `
        <div class="eachCard" id="favorite-${recette.id}">
            <div class="recette-header">
                <h3>${recette.nom}</h3>
                <button class="heart-button" style="background: none; border: none; cursor: pointer; padding: 5px;" onclick="window.handleToggleFavorite('${recette.id}', null, this)">
                    <img src="${heartIcon}" alt="${altText}" style="width: 20px; height: 20px;">
                </button>
            </div>
            <div class="recette-content">
                <p><strong>Temps:</strong> ${recette.temps}</p>
                <p><strong>Portions:</strong> ${recette.portions}</p>
                <p><strong>Description:</strong> ${recette.description}</p>
                <p class="date-added">Ajouté le ${recette.dateAdded}</p>
            </div>
            <div class="recette-actions">
                <button class="recetteButton" onclick="viewFavoriteRecipe('${recette.id}')">
                    Voir la recette
                </button>
            </div>
        </div>
    `;
}

// Suppression instantanée de la carte favorite (sans refresh global)
window.removeFavoriteInstant = function(recetteId) {
    const favorites = JSON.parse(localStorage.getItem('gourmet-favorites') || '[]');
    const recetteASupprimer = favorites.find(fav => fav.id === recetteId);
    const newFavorites = favorites.filter(fav => fav.id !== recetteId);
    localStorage.setItem('gourmet-favorites', JSON.stringify(newFavorites));
    // Animation de disparition avant suppression du DOM
    const card = document.getElementById('favorite-' + recetteId);
    if (card) {
        card.classList.add('fade-out');
        setTimeout(() => {
            card.remove();
        }, 400);
    }
    // Afficher le message si plus de favoris
    if (newFavorites.length === 0) {
        const noFavMsg = document.getElementById('no-favorites');
        if (noFavMsg) noFavMsg.style.display = 'block';
    }
    // Notification
    if (recetteASupprimer && typeof showNotification === 'function') {
        showNotification(`❌ "${recetteASupprimer.nom || recetteASupprimer.titre}" retiré des favoris !`, 'remove');
    }
}

// Fonction pour voir une recette favorite
function viewFavoriteRecipe(recetteId) {
    if (recetteId.startsWith('api_')) {
        // Pour les recettes API, rediriger vers recettes.html avec un paramètre spécial
        window.location.href = `recettes.html?api=${recetteId}`;
    } else {
        // Redirection vers la page de détail de la recette locale
        window.location.href = `recettes.html?recette=${recetteId}`;
    }
}

// Rendre les fonctions globales pour les onclick dans le HTML
window.removeFavoriteRecipe = removeFavoriteRecipe;
window.viewFavoriteRecipe = viewFavoriteRecipe;
window.afficherFavoris = afficherFavoris;

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FavoritesManager, favoritesManager };
}


l