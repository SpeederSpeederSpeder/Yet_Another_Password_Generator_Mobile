// utils/password-history.js

const HISTORY_KEY = 'passwordHistory';
const MAX_HISTORY_SIZE = 10; // Limite l'historique aux 10 derniers mots de passe

/**
 * Charge l'historique des mots de passe depuis le stockage local.
 * @returns {string[]} Un tableau de mots de passe.
 */
export function loadPasswordHistory() {
    try {
        const history = localStorage.getItem(HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch (e) {
        console.error("Erreur lors du chargement de l'historique des mots de passe:", e);
        return [];
    }
}

/**
 * Ajoute un mot de passe à l'historique et le sauvegarde dans le stockage local.
 * @param {string} password Le mot de passe à ajouter.
 */
export function addPasswordToHistory(password) {
    let history = loadPasswordHistory();

    // Supprime le mot de passe s'il existe déjà pour le déplacer en haut de la liste
    history = history.filter(p => p !== password);

    // Ajoute le nouveau mot de passe au début
    history.unshift(password);

    // Tronque l'historique si la taille maximale est dépassée
    if (history.length > MAX_HISTORY_SIZE) {
        history = history.slice(0, MAX_HISTORY_SIZE);
    }

    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde de l'historique des mots de passe:", e);
    }
}

/**
 * Efface tout l'historique des mots de passe.
 */
export function clearPasswordHistory() {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
        console.error("Erreur lors de l'effacement de l'historique des mots de passe:", e);
    }
}
