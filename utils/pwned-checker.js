/**
 * Vérifie si un mot de passe a été compromis en utilisant l'API Pwned Passwords.
 * Cette fonction utilise la k-Anonymity pour protéger la confidentialité du mot de passe.
 * @param {string} password - Le mot de passe à vérifier.
 * @returns {Promise<boolean>} - True si le mot de passe est compromis, sinon false.
 */
export async function isPasswordPwned(password) {
    if (!password) {
        return false;
    }

    try {
        // 1. Hacher le mot de passe en SHA-1
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);

        // Convertir le buffer en chaîne hexadécimale
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // 2. Diviser le hash
        const prefix = hashHex.substring(0, 5);
        const suffix = hashHex.substring(5).toUpperCase();

        // 3. Interroger l'API Pwned Passwords
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        if (!response.ok) {
            throw new Error(`Erreur de l'API Pwned Passwords: ${response.statusText}`);
        }

        const text = await response.text();
        const hashes = text.split('\r\n');

        // 4. Vérifier localement
        for (const h of hashes) {
            const [hashSuffix] = h.split(':');
            if (hashSuffix === suffix) {
                return true; // Le mot de passe est compromis
            }
        }

        return false; // Le mot de passe n'est pas trouvé
    } catch (error) {
        console.error("Erreur lors de la vérification du mot de passe compromis:", error);
        // En cas d'erreur (ex: réseau), on suppose que le mot de passe n'est pas compromis
        // pour ne pas bloquer l'utilisateur.
        return false;
    }
}