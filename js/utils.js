/**
 * GOURMET TECH - Utilitaires
 * Fonctions utilitaires et helpers communs
 * @version 1.0
 */

class Utils {
    /**
     * Récupérer un paramètre URL
     */
    static getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    /**
     * Afficher une notification
     */
    static showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existing = document.querySelectorAll('.gourmet-notification');
        existing.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = 'gourmet-notification';
        notification.textContent = message;
        
        const backgroundColor = {
            'add': '#27ae60',
            'remove': '#e74c3c', 
            'error': '#e74c3c',
            'info': '#3498db',
            'success': '#27ae60'
        }[type] || '#3498db';

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${backgroundColor};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Animation de sortie
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }

    /**
     * Debounce une fonction
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Formater une date en français
     */
    static formatDateFr(date = new Date()) {
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Nettoyer une chaîne de caractères
     */
    static cleanString(str) {
        return str.replace(/[^\w\s-]/gi, '').trim();
    }

    /**
     * Générer un ID unique
     */
    static generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Vérifier si un élément est visible dans le viewport
     */
    static isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Smooth scroll vers un élément
     */
    static scrollToElement(elementOrSelector, offset = 0) {
        const element = typeof elementOrSelector === 'string' 
            ? document.querySelector(elementOrSelector) 
            : elementOrSelector;
            
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Copier du texte dans le presse-papiers
     */
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            Utils.showNotification('📋 Copié dans le presse-papiers !', 'success');
            return true;
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
            Utils.showNotification('❌ Erreur lors de la copie', 'error');
            return false;
        }
    }

    /**
     * Valider un email
     */
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Escape HTML pour prévenir XSS
     */
    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Créer un élément DOM avec des propriétés
     */
    static createElement(tag, properties = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.keys(properties).forEach(key => {
            if (key === 'className') {
                element.className = properties[key];
            } else if (key === 'style' && typeof properties[key] === 'object') {
                Object.assign(element.style, properties[key]);
            } else {
                element[key] = properties[key];
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    }

    /**
     * Vérifier si l'appareil est mobile
     */
    static isMobile() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Logger avec timestamp
     */
    static log(message, type = 'info') {
        const timestamp = new Date().toLocaleString('fr-FR');
        const prefix = `[${timestamp}] GourmetTech:`;
        
        switch (type) {
            case 'error':
                console.error(prefix, message);
                break;
            case 'warn':
                console.warn(prefix, message);
                break;
            default:
                // Log par défaut supprimé
        }
    }
}

// Export des fonctions principales pour compatibilité globale
window.Utils = Utils;
window.getUrlParameter = Utils.getUrlParameter;
window.showNotification = Utils.showNotification;
window.debounce = Utils.debounce;

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}