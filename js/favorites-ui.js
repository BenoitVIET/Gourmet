



/**
 * Traduit une recette API si besoin
 */
async function translateApiRecipe(recette) {
    try {
        if (typeof window.translateText === 'function') {
            const translatedTitle = await window.translateText(recette.nom || recette.titre, 'en', 'fr');
            const translatedDescription = recette.description ? await window.translateText(recette.description, 'en', 'fr') : 'Recette délicieuse à découvrir';
            return {
                ...recette,
                nom: translatedTitle || recette.nom || recette.titre,
                description: translatedDescription,
                temps: recette.temps || 'Temps non spécifié',
                portions: recette.portions || 'Portions non spécifiées'
            };
        }
    } catch (error) {}
    return {
        ...recette,
        nom: recette.nom || recette.titre || 'Recette sans nom',
        description: recette.description || 'Délicieuse recette à découvrir',
        temps: recette.temps || 'Temps non spécifié',
        portions: recette.portions || 'Portions non spécifiées'
    };
}

/**
 * Suppression instantanée de la carte favorite (sans refresh global)
 */
function removeFavoriteInstant(recetteId) {
    const favorites = window.favoritesManager.getFavorites();
    const recetteASupprimer = favorites.find(fav => fav.id === recetteId);
    const newFavorites = favorites.filter(fav => fav.id !== recetteId);
    window.favoritesManager.saveFavorites(newFavorites);
    const card = document.getElementById('favorite-' + recetteId);
    if (card) {
        card.classList.add('fade-out');
        setTimeout(() => {
            card.remove();
        }, 400);
    }
    if (newFavorites.length === 0) {
        const noFavMsg = document.getElementById('no-favorites');
        if (noFavMsg) noFavMsg.style.display = 'block';
    }
    if (recetteASupprimer && typeof showNotification === 'function') {
        showNotification(`❌ "${recetteASupprimer.nom || recetteASupprimer.titre}" retiré des favoris !`, 'remove');
    }
}
// ===============================
// favorites-ui.js
// Affichage et manipulation DOM des favoris
// ===============================

/**
 * Affiche la liste des favoris dans le DOM
 */
async function afficherFavoris() {
    const favorites = window.favoritesStorage.getFavorites();
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
        if (recette.id && recette.id.startsWith('api_')) {
            displayData = await window.translateApiRecipe(recette);
        }
        return window.createFavoriteCard(displayData);
    }));
    container.innerHTML = favoriteCards.join('');
}

/**
 * Crée la carte HTML d'un favori
 */
function createFavoriteCard(recette) {
    const isFavorite = window.favoritesStorage.isFavorite(recette.id);
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
                <button class="recetteButton" onclick="window.viewFavoriteRecipe('${recette.id}')">
                    Voir la recette
                </button>
            </div>
        </div>
    `;
}

/**
 * Voir une recette favorite
 */
function viewFavoriteRecipe(recetteId) {
    if (recetteId.startsWith('api_')) {
        window.location.href = `recettes.html?api=${recetteId}`;
    } else {
        window.location.href = `recettes.html?recette=${recetteId}`;
    }
}

window.afficherFavoris = afficherFavoris;
window.createFavoriteCard = createFavoriteCard;
window.translateApiRecipe = translateApiRecipe;
window.removeFavoriteInstant = removeFavoriteInstant;
window.viewFavoriteRecipe = viewFavoriteRecipe;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { afficherFavoris, createFavoriteCard, translateApiRecipe, removeFavoriteInstant, viewFavoriteRecipe };
}

// mettre le bouton fav différent si non favoris

