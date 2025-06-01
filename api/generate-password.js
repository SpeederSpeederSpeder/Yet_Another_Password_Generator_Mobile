module.exports = (req, res) => {
    let password = "";

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Récupérer les types de caractères depuis les paramètres de la requête
    const includeUppercase = req.query.uppercase === 'true';
    const includeLowercase = req.query.lowercase === 'true';
    const includeNumbers = req.query.numbers === 'true';
    const includeSymbols = req.query.symbols === 'true';

    let availableChars = "";
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    // Si aucun type n'est sélectionné, inclure tous les types par défaut
    if (availableChars.length === 0) {
        availableChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
    }

    // Récupérer la longueur du mot de passe depuis les paramètres de la requête
    let passwordLength = parseInt(req.query.length, 10);

    // Valider la longueur du mot de passe
    const minLength = 7;
    const maxLength = 100;

    if (isNaN(passwordLength) || passwordLength < minLength || passwordLength > maxLength) {
        passwordLength = minLength; // Utiliser la longueur par défaut si invalide
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    res.status(200).json({ password });
};
