/**
 * GOURMET TECH - Gestionnaire d'affichage des recettes
 * Gestion de l'affichage des recettes locales et API
 * @version 1.0
 */

class RecipeDisplayManager {
    constructor() {
        this.currentRecipe = null;
    }

    /**
     * Afficher une recette locale
     */
    afficherRecette(nomRecette) {
        const recette = recettes[nomRecette];
        if (!recette) {
            console.error(`Recette '${nomRecette}' non trouvée`);
            return;
        }

        this.currentRecipe = { id: nomRecette, data: recette, type: 'local' };

        // Ajuster le chemin d'image pour les pages dans others/
        const imagePath = recette.image.startsWith('assets/') ? '../' + recette.image : recette.image;

        // Remplir les éléments HTML
        document.getElementById("titreRecette").innerText = recette.titre;
        document.getElementById("imageRecette").src = imagePath;
        document.getElementById("categorieRecette").innerText = recette.categorie;
        document.getElementById("tempsRecette").innerText = recette.temps;
        document.getElementById("difficulteRecette").innerText = recette.difficulte;
        document.getElementById("nbPersonnesRecette").innerText = recette.nbPersonnes;

        // Afficher les ingrédients
        this.displayIngredients(recette.ingredients);
        
        // Afficher les étapes
        this.displayEtapes(recette.etapes);
        
        // Afficher le conteneur
        document.getElementById("recetteContainer").classList.remove("hidden");
    }

    /**
     * Afficher une recette API depuis les favoris
     */
    displayApiRecipeFromFavorites(apiId) {
        const favorites = favoritesManager.getFavorites();
        const apiRecipe = favorites.find(fav => fav.id === apiId);
        
        if (!apiRecipe) {
            this.showError("Recette non trouvée dans les favoris");
            return;
        }

        this.currentRecipe = { id: apiId, data: apiRecipe, type: 'api' };

        // Remplir les éléments HTML
        document.getElementById("titreRecette").innerText = apiRecipe.nom || apiRecipe.titre;
        document.getElementById("imageRecette").src = apiRecipe.image || "../assets/pictures/default-recipe.jpg";
        document.getElementById("categorieRecette").innerText = apiRecipe.categorie || "Plat international";
        document.getElementById("tempsRecette").innerText = apiRecipe.temps || "Variable";
        document.getElementById("difficulteRecette").innerText = "Moyen";
        document.getElementById("nbPersonnesRecette").innerText = apiRecipe.portions || "4-6 personnes";

        // Afficher les ingrédients
        this.displayIngredients(apiRecipe.ingredients || ["Ingrédients non disponibles"]);
        
        // Afficher les étapes
        this.displayEtapes(apiRecipe.etapes || ["Instructions non disponibles"]);
        
        // Afficher le conteneur
        document.getElementById("recetteContainer").classList.remove("hidden");
    }

    /**
     * Afficher la liste des ingrédients
     */
    displayIngredients(ingredients) {
        const ingredientsList = document.getElementById("ingredientsList");
        ingredientsList.innerHTML = '';
        ingredientsList.style.listStyle = "none";
        ingredientsList.style.padding = "0";

        ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.innerText = ingredient;
            li.style.cssText = "margin-bottom: 8px; padding: 8px; background: var(--color4); border-radius: 5px;";
            ingredientsList.appendChild(li);
        });
    }

    /**
     * Afficher la liste des étapes
     */
    displayEtapes(etapes) {
        const etapesList = document.getElementById("etapesList");
        etapesList.innerHTML = '';
        etapesList.style.listStyle = "none";
        etapesList.style.padding = "0";

        etapes.forEach((etape, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Étape ${index + 1}:</strong> ${etape}`;
            li.style.cssText = "margin-bottom: 12px; padding: 12px; background: var(--color4); border-radius: 5px; border-left: 4px solid var(--color3);";
            etapesList.appendChild(li);
        });
    }

    /**
     * Afficher un message d'erreur
     */
    showError(message) {
        console.error(message);
        
        // Créer un élément d'erreur si nécessaire
        const errorContainer = document.getElementById("errorContainer") || this.createErrorContainer();
        errorContainer.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <strong>Erreur:</strong> ${message}
            </div>
        `;
        errorContainer.style.display = 'block';
    }

    /**
     * Créer un conteneur d'erreur si nécessaire
     */
    createErrorContainer() {
        const container = document.createElement('div');
        container.id = 'errorContainer';
        container.style.display = 'none';
        
        const main = document.querySelector('main') || document.body;
        main.insertBefore(container, main.firstChild);
        
        return container;
    }

    /**
     * Gérer les paramètres URL et afficher la recette appropriée
     */
    handleUrlParameters() {
        const recetteParam = getUrlParameter('recette');
        const apiParam = getUrlParameter('api');
        
        if (apiParam) {
            // Affichage d'une recette API (favoris ou directement depuis l'API)
            this.displayApiRecipe(apiParam);
        } else if (recetteParam && recettes[recetteParam]) {
            // Affichage d'une recette locale
            this.afficherRecette(recetteParam);
        } else {
            // Recette par défaut
            this.afficherRecette('tarteAuxPommes');
        }
    }

    /**
     * Afficher une recette API (depuis favoris ou directement depuis l'API)
     */
    async displayApiRecipe(apiId) {
        // D'abord essayer depuis les favoris
        const favorites = favoritesManager.getFavorites();
        const favoriteRecipe = favorites.find(fav => fav.id === apiId);
        
        if (favoriteRecipe) {
            // La recette est dans les favoris, utiliser la méthode existante
            this.displayApiRecipeFromFavorites(apiId);
            return;
        }
        
        // Sinon, récupérer depuis l'API
        try {
            const mealId = apiId.replace('api_', '');
            
            // Appel direct à l'API TheMealDB
            const testUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
            const testResponse = await fetch(testUrl);
            const testData = await testResponse.json();
            
            if (!testData.meals || testData.meals.length === 0) {
                this.showError("Recette API non trouvée");
                return;
            }
            
            const fullRecipe = testData.meals[0];
            
            // Créer une recette temporaire pour affichage
            const tempRecipe = {
                id: apiId,
                nom: fullRecipe.strMeal || 'Recette API',
                image: fullRecipe.strMealThumb,
                categorie: fullRecipe.strCategory || 'Plat international',
                temps: 'Variable',
                portions: '4-6 personnes',
                ingredients: this.extractIngredients(fullRecipe),
                etapes: this.extractInstructions(fullRecipe)
            };
            
            this.currentRecipe = { id: apiId, data: tempRecipe, type: 'api' };
            
            // Afficher la recette
            document.getElementById("titreRecette").innerText = tempRecipe.nom;
            document.getElementById("imageRecette").src = tempRecipe.image;
            document.getElementById("categorieRecette").innerText = tempRecipe.categorie;
            document.getElementById("tempsRecette").innerText = tempRecipe.temps;
            document.getElementById("difficulteRecette").innerText = "Moyen";
            document.getElementById("nbPersonnesRecette").innerText = tempRecipe.portions;

            this.displayIngredients(tempRecipe.ingredients);
            this.displayEtapes(tempRecipe.etapes);
            
            const container = document.getElementById("recetteContainer");
            if (container) {
                container.classList.remove("hidden");
            }
            
            this.updateFavoriteButton();
            
        } catch (error) {
            console.error('Erreur récupération recette API:', error);
            this.showError("Erreur lors du chargement de la recette");
        }
    }

    /**
     * Extraire les ingrédients du format TheMealDB
     */
    extractIngredients(recipe) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim()) {
                const fullIngredient = measure && measure.trim() 
                    ? `${measure.trim()} ${ingredient.trim()}`
                    : ingredient.trim();
                ingredients.push(fullIngredient);
            }
        }
        return ingredients.length > 0 ? ingredients : ['Ingrédients non disponibles'];
    }

    /**
     * Extraire les instructions du format TheMealDB
     */
    extractInstructions(recipe) {
        if (!recipe.strInstructions) return ['Instructions non disponibles'];
        
        return recipe.strInstructions
            .split(/\r?\n/)
            .filter(step => step.trim())
            .map(step => step.replace(/^\d+\.?\s*/, '').trim())
            .filter(step => step.length > 0);
    }

    /**
     * Mettre à jour l'état du bouton favoris
     */
    updateFavoriteButton() {
        if (!this.currentRecipe) return;

        const favoriButton = document.getElementById("favoriButton");
        if (!favoriButton) return;

        // Vérifier si c'est une recette API ou locale
        const isApiRecipe = this.currentRecipe.type === 'api' || this.currentRecipe.id.startsWith('api_');
        const isFavorite = isApiRecipe 
            ? favoritesManager.isApiFavorite(this.currentRecipe.id.replace('api_', ''))
            : favoritesManager.isFavorite(this.currentRecipe.id);
            
        favoriButton.textContent = isFavorite ? "Retirer des favoris" : "Ajouter aux favoris";

        // Gestion du clic sur le bouton
        favoriButton.onclick = async () => {
            if (this.currentRecipe.type === 'local') {
                const wasAlreadyFavorite = favoritesManager.isFavorite(this.currentRecipe.id);
                const result = await favoritesManager.toggleFavorite(
                    this.currentRecipe.id, 
                    this.currentRecipe.data
                );
                
                if (typeof showNotification === 'function') {
                    // Déterminer l'action basée sur l'état précédent
                    const action = wasAlreadyFavorite ? 'remove' : 'add';
                    showNotification(result.message, action);
                }
                
                this.updateFavoriteButton(); // Mettre à jour l'affichage
            } else if (this.currentRecipe.type === 'api') {
                // Gérer les recettes API
                const apiRecipeData = {
                    id: this.currentRecipe.id,
                    idMeal: this.currentRecipe.id.replace('api_', ''),
                    nom: this.currentRecipe.data.nom,
                    image: this.currentRecipe.data.image,
                    categorie: this.currentRecipe.data.categorie,
                    origine: 'API'
                };
                
                const result = await favoritesManager.toggleApiRecipe(apiRecipeData);
                
                if (typeof showNotification === 'function') {
                    showNotification(result.message, result.action);
                }
                
                this.updateFavoriteButton(); // Mettre à jour l'affichage
            }
        };
    }

    /**
     * Initialiser l'affichage des recettes
     */
    initialize() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.handleUrlParameters();
                this.updateFavoriteButton();
            });
        } else {
            this.handleUrlParameters();
            this.updateFavoriteButton();
            // Charger les suggestions après l'affichage de la recette
            setTimeout(() => this.loadSimilarRecipes(), 500);
        }

        // Mettre à jour le bouton favoris quand la page est complètement chargée
        window.addEventListener('load', () => {
            this.updateFavoriteButton();
        });
    }

    /**
     * Charger les suggestions de recettes similaires
     */
    async loadSimilarRecipes() {
        if (!this.currentRecipe || this.currentRecipe.type !== 'local') {
            return; // Suggestions seulement pour les recettes locales
        }

        const suggestionsList = document.getElementById('suggestionsList');
        if (!suggestionsList) return;

        try {
            suggestionsList.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--color3);">🔄 Chargement des suggestions...</p>';
            
            // Obtenir des recettes similaires basées sur la catégorie
            const category = this.currentRecipe.data.categorie;
            const suggestions = await apiManager.getSimilarRecipes(category, null, 4);
            
            if (suggestions.length === 0) {
                suggestionsList.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--color3);">😊 Aucune suggestion disponible pour le moment</p>';
                return;
            }

            // Afficher les suggestions
            const suggestionsHtml = await Promise.all(suggestions.map(async (recipe) => {
                // Utiliser le nom original sans traduction
                const recipeName = recipe.strMeal;
                const isFavorite = favoritesManager.isApiFavorite(recipe.idMeal);
                const heartIcon = isFavorite ? '../assets/icons/redHeart.png' : '../assets/icons/grayHeart.png';
                            
                return `
                    <div class="suggestion-card">
                        <img src="${recipe.strMealThumb}" alt="${recipeName}" class="suggestion-image">
                        <div class="suggestion-info">
                            <h4>${recipeName}</h4>
                            <p class="suggestion-category">${recipe.strCategory}</p>
                            <div class="suggestion-actions">
                                <button onclick="viewApiRecipe('${recipe.idMeal}')" class="recetteButton">
                                    Voir la recette
                                </button>
                                <img src="${heartIcon}" 
                                     class="heart-icon-suggestion" 
                                     onclick="handleApiToggleFavorite({
                                         id: 'api_${recipe.idMeal}',
                                         idMeal: '${recipe.idMeal}',
                                         nom: '${recipeName.replace(/'/g, "\\'")}',
                                         image: '${recipe.strMealThumb}',
                                         categorie: '${recipe.strCategory || "Plat principal"}',
                                         origine: '${recipe.strArea || "International"}'
                                     }, this)"
                                     alt="Favori">
                            </div>
                        </div>
                    </div>
                `;
            }));

            suggestionsList.innerHTML = `
                <div class="suggestions-container">
                    ${suggestionsHtml.join('')}
                </div>
            `;

        } catch (error) {
            console.error('Erreur chargement suggestions:', error);
            suggestionsList.innerHTML = '<p style="text-align: center; padding: 20px; color: #e74c3c;">😅 Erreur lors du chargement des suggestions</p>';
        }
    }
}

// Instance globale
const recipeDisplayManager = new RecipeDisplayManager();

// Fonctions globales pour compatibilité
window.afficherRecette = (nomRecette) => recipeDisplayManager.afficherRecette(nomRecette);
window.displayApiRecipeFromFavorites = (apiId) => recipeDisplayManager.displayApiRecipeFromFavorites(apiId);
window.loadSimilarRecipes = () => recipeDisplayManager.loadSimilarRecipes();

// Auto-initialisation
recipeDisplayManager.initialize();

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RecipeDisplayManager, recipeDisplayManager };
}