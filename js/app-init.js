/**
 * INITIALISATION GLOBALE DE L'APPLICATION
 * Ce fichier crée les instances globales nécessaires et expose les fonctions
 * pour maintenir la compatibilité avec l'ancien système
 */

// ================================
// INSTANCES GLOBALES
// ================================

// Managers principaux
window.favoritesManager = new FavoritesManager();
window.recipeDisplayManager = new RecipeDisplayManager();
window.apiManager = new APIManager();

// ================================
// FONCTIONS GLOBALES DE COMPATIBILITÉ
// ================================

/**
 * Fonction globale pour basculer les favoris (compatibilité)
 */
window.handleToggleFavorite = async function(recetteId, recetteData, heartElement) {
    const result = await favoritesManager.toggleFavorite(recetteId, recetteData);
    
    // Mettre à jour l'icône du cœur
    if (heartElement) {
        favoritesManager.updateHeartIcon(heartElement, result.action === 'add');
    }
    
    // Afficher la notification
    if (typeof showNotification === 'function') {
        showNotification(result.message, result.action);
    }
    
    return result;
};

/**
 * Fonction globale pour gérer les favoris API
 */
window.handleApiToggleFavorite = async function(apiRecipe, heartElement) {
    try {
        const result = await favoritesManager.toggleApiRecipe(apiRecipe);
        
        // Mettre à jour l'icône du cœur
        if (heartElement) {
            favoritesManager.updateHeartIcon(heartElement, result.action === 'add');
        }
        
        // Afficher la notification
        if (typeof showNotification === 'function') {
            showNotification(result.message, result.action);
        }
        
        return result;
    } catch (error) {
        console.error('Erreur toggle favori API:', error);
        
        // En cas d'erreur, au moins faire le fallback
        if (typeof showNotification === 'function') {
            showNotification('❌ Erreur lors de l\'ajout aux favoris', 'error');
        }
        
        return { success: false, message: 'Erreur' };
    }
};

/**
 * Fonction globale pour les suggestions de recettes similaires
 */
window.loadSimilarRecipes = async function(category, currentRecipeId) {
    try {
        const suggestions = await apiManager.getSimilarRecipes(category, currentRecipeId);
        displaySimilarRecipes(suggestions);
        return suggestions;
    } catch (error) {
        console.error('Erreur lors du chargement des suggestions:', error);
        if (typeof showNotification === 'function') {
            showNotification('Erreur lors du chargement des suggestions', 'error');
        }
        return [];
    }
};

/**
 * Fonction globale pour afficher les recettes similaires
 */
window.displaySimilarRecipes = function(recipes) {
    const container = document.getElementById('similar-recipes');
    if (!container) return;

    if (!recipes || recipes.length === 0) {
        container.innerHTML = '<p>Aucune suggestion disponible</p>';
        return;
    }

    const recipesHtml = recipes.map(recipe => {
        const isFavorite = favoritesManager.isApiFavorite(recipe.idMeal);
        const heartIcon = isFavorite ? '../assets/icons/redHeart.jpg' : '../assets/icons/grayHeart.jpg';
        
        return `
            <div class="similar-recipe-card">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="similar-recipe-image">
                <div class="similar-recipe-info">
                    <h4>${recipe.strMeal}</h4>
                    <div class="similar-recipe-actions">
                        <button onclick="viewApiRecipe('${recipe.idMeal}')" class="btn-view">
                            Voir la recette
                        </button>
                        <img src="${heartIcon}" 
                             class="heart-icon" 
                             onclick="handleApiToggleFavorite({
                                 id: 'api_${recipe.idMeal}',
                                 idMeal: '${recipe.idMeal}',
                                 nom: '${recipe.strMeal.replace(/'/g, "\\'")}',
                                 image: '${recipe.strMealThumb}',
                                 categorie: '${recipe.strCategory || "Plat principal"}',
                                 origine: '${recipe.strArea || "International"}'
                             }, this)"
                             alt="Favori">
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = recipesHtml;
};

/**
 * Fonction globale pour voir une recette API
 */
window.viewApiRecipe = function(mealId) {
    const apiId = mealId.startsWith('api_') ? mealId : `api_${mealId}`;
    window.location.href = `recettes.html?api=${apiId}`;
};

/**
 * Fonction globale pour voir une recette API depuis les favoris
 */
window.viewFavoriteApiRecipe = function(apiId) {
    window.location.href = `recettes.html?api=${apiId}`;
};

/**
 * Fonctions utilitaires globales
 */
window.showNotification = Utils.showNotification;
window.debounce = Utils.debounce;
window.formatTime = Utils.formatTime;

// ================================
/**
 * Initialiser l'état des cœurs sur la page d'accueil
 */
function initializeHeartIcons() {
    const heartButtons = document.querySelectorAll('.heart-button');
    
    heartButtons.forEach(button => {
        // Récupérer l'ID de la recette depuis l'onclick
        const onclickAttr = button.getAttribute('onclick');
        const matches = onclickAttr.match(/'([^']+)'/);
        
        if (matches && matches[1]) {
            const recipeId = matches[1];
            const isFavorite = favoritesManager.isFavorite(recipeId);
            
            // Mettre à jour l'icône selon l'état
            favoritesManager.updateHeartIcon(button, isFavorite);
        }
    });
}

// INITIALISATION AU CHARGEMENT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le gestionnaire d'affichage des recettes si on est sur la page recettes
    if (document.getElementById('recipe-details') || window.location.pathname.includes('recettes.html')) {
        recipeDisplayManager.initialize();
    }
    
    // Charger les favoris si on est sur la page favoris
    if (window.location.pathname.includes('favoris.html')) {
        setTimeout(() => {
            if (typeof afficherFavoris === 'function') {
                afficherFavoris();
            }
        }, 100);
    }
    
    // Initialiser les cœurs sur la page d'accueil
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        setTimeout(() => {
            initializeHeartIcons();
        }, 100);
    }
});