document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');

    const generatePassword = async () => {
        try {
            const response = await fetch('/api/generate-password');
            const data = await response.json();
            passwordInput.value = data.password;
        } catch (error) {
            console.error('Erreur lors de la génération du mot de passe:', error);
            alert('Impossible de générer un mot de passe. Veuillez réessayer.');
        }
    };

    generateButton.addEventListener('click', generatePassword);

    copyButton.addEventListener('click', () => {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // Pour les appareils mobiles
        document.execCommand('copy');
        alert('Mot de passe copié dans le presse-papiers !');
    });

    // Générer un mot de passe au chargement de la page
    generatePassword();
});