// utils/password-strength-checker.js

/**
 * Calcule la force d'un mot de passe.
 * @param {string} password Le mot de passe à évaluer.
 * @returns {number} Un score de force (plus le nombre est élevé, plus le mot de passe est fort).
 */
export function calculatePasswordStrength(password) {
    // Cette fonction est maintenant obsolète et sera supprimée.
    // La logique de force est gérée par zxcvbn.
    return 0;
}

/**
 * Fournit une description textuelle de la force du mot de passe.
 * @param {number} strengthScore Le score de force du mot de passe.
 * @returns {string} Une description de la force.
 */
export function getStrengthDescription(zxcvbnScore) {
    switch (zxcvbnScore) {
        case 0:
            return "passwordStrengthVeryWeak";
        case 1:
            return "passwordStrengthWeak";
        case 2:
            return "passwordStrengthMedium";
        case 3:
            return "passwordStrengthStrong";
        case 4:
            return "passwordStrengthVeryStrong";
        default:
            return "passwordStrengthVeryWeak";
    }
}
