/**
 * GOURMET TECH - Fonctions API
 * Gestion des API externes (TheMealDB, Google Translate)
 * @version 1.0
 */

class APIManager {
    constructor() {
        this.translationCache = JSON.parse(localStorage.getItem('translation-cache') || '{}');
        this.isTranslating = false;
        this.translationErrors = 0;
        this.maxErrors = 3; // Après 3 erreurs 429, arrêter les traductions
    }

    /**
     * Traduction avec Google Translate via MyMemory API
     */
    async translateText(texte, langueSource = 'en', langueDestination = 'fr') {
        const cacheKey = `${texte}_${langueSource}_${langueDestination}`;
        
        // Vérifier le cache d'abord
        if (this.translationCache[cacheKey]) {
            return this.translationCache[cacheKey];
        }

        // Si trop d'erreurs 429, retourner le texte original
        if (this.translationErrors >= this.maxErrors) {
            return texte;
        }

        if (this.isTranslating) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return this.translateText(texte, langueSource, langueDestination);
        }

        try {
            this.isTranslating = true;
            
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=${langueSource}|${langueDestination}`
            );
            
            if (response.status === 429) {
                this.translationErrors++;
                throw new Error('Rate limit exceeded');
            }
            
            if (!response.ok) throw new Error('Erreur API');
            
            const data = await response.json();
            let resultat = data.responseData?.translatedText || texte;
            
            // Nettoyer le résultat
            resultat = resultat.replace(/\b(le|la|les|un|une|des)\s+/gi, '').trim();
            
            // Sauvegarder en cache
            this.translationCache[cacheKey] = resultat;
            localStorage.setItem('translation-cache', JSON.stringify(this.translationCache));
            
            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
            return resultat;
            
        } catch (error) {
            return texte; // Retourner le texte original en cas d'erreur
        } finally {
            this.isTranslating = false;
        }
    }

    /**
     * Recherche de recettes via TheMealDB API
     */
    async searchRecipes(searchTerm) {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
            );
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Erreur recherche API:', error);
            return [];
        }
    }

    /**
     * Récupération de recettes aléatoires
     */
    async getRandomRecipes(count = 5) {
        const recipes = [];
        
        for (let i = 0; i < count; i++) {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                
                if (data.meals && data.meals[0]) {
                    const meal = data.meals[0];
                    
                    // Extraire ingrédients
                    const ingredients = Object.keys(meal)
                        .filter(key => key.startsWith('strIngredient') && meal[key])
                        .slice(0, 8)
                        .map(key => {
                            const num = key.replace('strIngredient', '');
                            const measure = meal[`strMeasure${num}`] || '';
                            return `${measure} ${meal[key]}`.trim();
                        });

                    // Extraire étapes
                    const etapes = meal.strInstructions 
                        ? meal.strInstructions.split('.').slice(0, 6).filter(s => s.trim().length > 10)
                        : ["Instructions non disponibles"];

                    recipes.push({
                        id: `api_${meal.idMeal}`,
                        titre: meal.strMeal,
                        image: meal.strMealThumb,
                        categorie: meal.strCategory,
                        temps: "Variable",
                        portions: "4-6 personnes",
                        description: `Délicieuse recette: ${meal.strMeal}`,
                        ingredients: ingredients,
                        etapes: etapes,
                        apiRecipe: true
                    });
                }
                
                await new Promise(resolve => setTimeout(resolve, 200)); // Rate limiting
            } catch (error) {
                console.error('Erreur récupération recette aléatoire:', error);
            }
        }
        
        return recipes;
    }

    /**
     * Récupération des détails complets d'une recette
     */
    async getRecipeDetails(mealId) {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
            );
            const data = await response.json();
            
            if (data.meals && data.meals[0]) {
                const meal = data.meals[0];
                
                // Traduction du titre
                const titreTraduit = await this.translateText(meal.strMeal, 'en', 'fr');
                
                // Extraction et traduction des ingrédients
                const ingredientsOriginaux = Object.keys(meal)
                    .filter(key => key.startsWith('strIngredient') && meal[key])
                    .slice(0, 6)
                    .map(key => {
                        const num = key.replace('strIngredient', '');
                        const measure = meal[`strMeasure${num}`] || '';
                        return `${measure} ${meal[key]}`.trim();
                    });

                const ingredientsTraduits = [];
                for (const ingredient of ingredientsOriginaux) {
                    const traduit = await this.translateText(ingredient, 'en', 'fr');
                    ingredientsTraduits.push(traduit);
                }

                // Extraction et traduction des étapes
                const etapesOriginales = meal.strInstructions 
                    ? meal.strInstructions.split('.').slice(0, 4).filter(s => s.trim().length > 10)
                    : [];

                const etapesTraduits = [];
                for (const etape of etapesOriginales) {
                    const traduit = await this.translateText(etape.trim(), 'en', 'fr');
                    etapesTraduits.push(traduit);
                }

                return {
                    id: `api_${meal.idMeal}`,
                    nom: titreTraduit,
                    titre: titreTraduit,
                    image: meal.strMealThumb,
                    categorie: await this.translateText(meal.strCategory, 'en', 'fr'),
                    temps: "Variable",
                    portions: "4-6 personnes",
                    description: `Délicieuse recette: ${titreTraduit}`,
                    ingredients: ingredientsTraduits,
                    etapes: etapesTraduits,
                    apiRecipe: true,
                    dateAdded: new Date().toLocaleDateString('fr-FR')
                };
            }
        } catch (error) {
            console.error('Erreur récupération détails recette:', error);
            return null;
        }
    }

    /**
     * Obtenir des recettes similaires par catégorie
     */
    async getSimilarRecipes(category, excludeId = null, count = 4) {
        try {
            // Convertir nos catégories vers celles de l'API
            const apiCategory = this.mapCategoryToApi(category);
            
            const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(apiCategory)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.meals) {
                return [];
            }
            
            // Filtrer pour exclure la recette actuelle et limiter le nombre
            let filteredMeals = data.meals.filter(meal => 
                excludeId ? meal.idMeal !== excludeId.replace('api_', '') : true
            );
            
            // Mélanger et prendre un échantillon
            filteredMeals = this.shuffleArray(filteredMeals).slice(0, count);
            
            return filteredMeals;
        } catch (error) {
            console.error('Erreur récupération recettes similaires:', error);
            return [];
        }
    }

    /**
     * Convertir nos catégories vers celles de l'API TheMealDB
     */
    mapCategoryToApi(localCategory) {
        const categoryMap = {
            'Dessert': 'Dessert',
            'Plat': 'Chicken',           // Plat principal → Chicken (populaire)
            'Entrée': 'Starter',        // Entrée → Starter
            'Salade': 'Vegetarian',     // Salade → Vegetarian
            'Soupe': 'Miscellaneous',   // Soupe → Miscellaneous
            'Boisson': 'Miscellaneous', // Boisson → Miscellaneous
            'Apéritif': 'Starter',      // Apéritif → Starter
            'Plat principal': 'Chicken', // Plat principal → Chicken
            'Viande': 'Beef',           // Viande → Beef
            'Poisson': 'Seafood',       // Poisson → Seafood
            'Végétarien': 'Vegetarian', // Végétarien → Vegetarian
            'Pâtes': 'Pasta'            // Pâtes → Pasta
        };
        
        return categoryMap[localCategory] || 'Miscellaneous';
    }

    /**
     * Mélanger un tableau (algorithme Fisher-Yates)
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Instance globale
const apiManager = new APIManager();

// Export des fonctions principales
window.translateText = (text, from, to) => apiManager.translateText(text, from, to);
window.searchRecipes = (term) => apiManager.searchRecipes(term);
window.getRandomRecipes = (count) => apiManager.getRandomRecipes(count);
window.getCompleteApiRecipe = (id, title) => apiManager.getRecipeDetails(id.replace('api_', ''));
window.getSimilarRecipes = (category, excludeId, count) => apiManager.getSimilarRecipes(category, excludeId, count);

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIManager, apiManager };
}