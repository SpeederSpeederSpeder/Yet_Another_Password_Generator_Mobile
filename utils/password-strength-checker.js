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
export function getStrengthDescription(zxcvbnScore, crackTime) {
    const strength = getStrengthFromCrackTime(crackTime);

    switch (strength) {
        case "Très faible":
            return "passwordStrengthVeryWeak";
        case "Faible":
            return "passwordStrengthWeak";
        case "Moyen":
            return "passwordStrengthMedium";
        case "Fort":
            return "passwordStrengthStrong";
        case "Très Fort":
            return "passwordStrengthVeryStrong";
        default:
            return "passwordStrengthVeryWeak";
    }
}

function getStrengthFromCrackTime(crackTime) {
    if (crackTime.includes("instantané")) {
        return "Très faible";
    } else if (crackTime.includes("seconde")) {
        return "Faible";
    } else if (crackTime.includes("minute") || crackTime.includes("heure")) {
        return "Moyen";
    } else if (crackTime.includes("jour") || crackTime.includes("mois")) {
        return "Fort";
    } else if (crackTime.includes("an") || crackTime.includes("siècle")) {
        return "Très Fort";
    }
    return "Très faible";
}
