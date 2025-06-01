// utils/password-strength-checker.js

/**
 * Calcule la force d'un mot de passe.
 * @param {string} password Le mot de passe à évaluer.
 * @returns {number} Un score de force (plus le nombre est élevé, plus le mot de passe est fort).
 */
export function calculatePasswordStrength(password) {
    let strength = 0;

    // Longueur du mot de passe
    if (password.length >= 8) {
        strength += 1;
    }
    if (password.length >= 12) {
        strength += 1;
    }
    if (password.length >= 16) {
        strength += 1;
    }

    // Présence de différents types de caractères
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (hasLowercase) {
        strength += 1;
    }
    if (hasUppercase) {
        strength += 1;
    }
    if (hasNumbers) {
        strength += 1;
    }
    if (hasSymbols) {
        strength += 1;
    }

    // Combinaisons de caractères
    if (hasLowercase && hasUppercase) {
        strength += 1;
    }
    if (hasLowercase && hasNumbers) {
        strength += 1;
    }
    if (hasUppercase && hasNumbers) {
        strength += 1;
    }
    if (hasLowercase && hasUppercase && hasNumbers && hasSymbols) {
        strength += 2; // Bonus pour tous les types
    }

    // Éviter les répétitions de caractères (simple vérification)
    const uniqueChars = new Set(password.split(''));
    if (uniqueChars.size / password.length > 0.7) {
        strength += 1;
    }

    return strength;
}

/**
 * Fournit une description textuelle de la force du mot de passe.
 * @param {number} strengthScore Le score de force du mot de passe.
 * @returns {string} Une description de la force.
 */
export function getStrengthDescription(strengthScore) {
    if (strengthScore <= 3) {
        return "passwordStrengthVeryWeak";
    } else if (strengthScore <= 6) {
        return "passwordStrengthWeak";
    } else if (strengthScore <= 9) {
        return "passwordStrengthMedium";
    } else if (strengthScore <= 12) {
        return "passwordStrengthStrong";
    } else {
        return "passwordStrengthVeryStrong";
    }
}
