import { getStrengthDescription } from './utils/password-strength-checker.js';
import { addPasswordToHistory, loadPasswordHistory, clearPasswordHistory } from './utils/password-history.js';
import { isPasswordPwned } from './utils/pwned-checker.js';

document.addEventListener('DOMContentLoaded', async () => {
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copyButton');
    const passwordLengthInput = document.getElementById('passwordLength');
    const passwordLengthValueDisplay = document.getElementById('passwordLengthValue');
    const languageSelect = document.getElementById('language');
    const copyMessage = document.getElementById('copyMessage');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const strengthText = document.getElementById('strengthText'); // Nouvel élément
    const crackTimeText = document.getElementById('crackTimeText'); // Pour le temps de cassage
    const pwnedStatus = document.getElementById('pwnedStatus');
    const pwnedStatusIcon = document.getElementById('pwnedStatusIcon');
    const pwnedStatusText = document.getElementById('pwnedStatusText');
    const passwordHistoryList = document.getElementById('passwordHistoryList'); // Nouvel élément
    const clearHistoryButton = document.getElementById('clearHistoryButton'); // Nouvel élément

    let currentTranslations = {}; // Variable pour stocker les traductions actuelles

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Mettre à jour l'affichage de la longueur du mot de passe
    passwordLengthInput.addEventListener('input', () => {
        passwordLengthValueDisplay.textContent = passwordLengthInput.value;
        generatePassword(); // Générer un nouveau mot de passe lorsque la longueur change
    });

    // Fonction pour traduire le temps de cassage
    const translateCrackTime = (crackTime) => {
        if (!crackTime || !currentTranslations.crackTimeUnits) {
            return crackTime;
        }

        const parts = crackTime.split(' ');
        if (parts.length < 2) {
            // Gère les cas comme "instant"
            const unit = parts[0].toLowerCase();
            return currentTranslations.crackTimeUnits[unit] || crackTime;
        }

        const value = parts.slice(0, parts.length - 1).join(' ');
        const unit = parts[parts.length - 1].toLowerCase();
        const translatedUnit = currentTranslations.crackTimeUnits[unit];

        return translatedUnit ? `${value} ${translatedUnit}` : crackTime;
    };

    const generatePassword = async () => {
        const length = passwordLengthInput.value;
        const includeUpper = includeUppercase.checked;
        const includeLower = includeLowercase.checked;
        const includeNum = includeNumbers.checked;
        const includeSym = includeSymbols.checked;

        let password = "";

        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let availableChars = "";
        if (includeUpper) availableChars += uppercaseChars;
        if (includeLower) availableChars += lowercaseChars;
        if (includeNum) availableChars += numberChars;
        if (includeSym) availableChars += symbolChars;

        // Si aucun type n'est sélectionné, inclure tous les types par défaut
        if (availableChars.length === 0) {
            availableChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
        }

        // Valider la longueur du mot de passe
        const minLength = 7;
        const maxLength = 100;
        let passwordLength = parseInt(length, 10); // Use 'length' from input

        if (isNaN(passwordLength) || passwordLength < minLength || passwordLength > maxLength) {
            passwordLength = minLength; // Utiliser la longueur par défaut si invalide
        }

        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        const generatedPassword = password;
        passwordInput.value = generatedPassword;

        // Calculer la force et le temps de cassage avec zxcvbn
        if (typeof zxcvbn !== 'undefined') {
            const result = zxcvbn(generatedPassword);
            const strengthScore = result.score;
            strengthText.textContent = currentTranslations[getStrengthDescription(strengthScore)];
            crackTimeText.textContent = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
        }

        // Vérifier si le mot de passe est compromis
        pwnedStatus.className = 'pwned-status checking';
        pwnedStatusIcon.textContent = '⏳';
        pwnedStatusText.textContent = currentTranslations.pwnedStatusChecking;

        const pwned = await isPasswordPwned(generatedPassword);
        if (pwned) {
            pwnedStatus.className = 'pwned-status pwned';
            pwnedStatusIcon.textContent = '❌';
            pwnedStatusText.textContent = currentTranslations.pwnedStatusPwned;
        } else {
            pwnedStatus.className = 'pwned-status safe';
            pwnedStatusIcon.textContent = '✅';
            pwnedStatusText.textContent = currentTranslations.pwnedStatusSafe;
        }

        // Ajouter le mot de passe à l'historique
        addPasswordToHistory(generatedPassword);
        displayPasswordHistory(); // Mettre à jour l'affichage de l'historique
    };

    // Fonction pour mettre à jour le texte de l'interface
    const updateContent = (translations) => {
        const h1Element = document.querySelector('h1');
        if (h1Element) h1Element.textContent = translations.title;

        const passwordLengthLabelElement = document.querySelector('label[for="passwordLength"]');
        if (passwordLengthLabelElement) passwordLengthLabelElement.textContent = translations.passwordLengthLabel;

        if (copyButton) copyButton.textContent = translations.copyButton;

        if (includeUppercase) includeUppercase.nextSibling.textContent = translations.uppercaseLabel;

        if (includeLowercase) includeLowercase.nextSibling.textContent = translations.lowercaseLabel;

        if (includeNumbers) includeNumbers.nextSibling.textContent = translations.numbersLabel;

        if (includeSymbols) includeSymbols.nextSibling.textContent = translations.symbolsLabel;

        // Mettre à jour le texte pour la force du mot de passe et l'historique
        const strengthLabel = document.querySelector('.password-strength-display');
        if (strengthLabel) strengthLabel.firstChild.textContent = translations.passwordStrengthLabel + ": ";

        const crackTimeLabel = document.querySelector('.crack-time-display');
        if (crackTimeLabel) crackTimeLabel.firstChild.textContent = translations.crackTimeLabel + ": ";

        const historyTitle = document.querySelector('.password-history-section h2');
        if (historyTitle) historyTitle.textContent = translations.historyTitle;

        if (clearHistoryButton) clearHistoryButton.textContent = translations.clearHistoryButton;
    };

    // Fonction pour charger les traductions
    const loadTranslations = async (lang) => {
        try {
            const module = await import(`./languages/${lang}.js`);
            currentTranslations = module[lang];
            updateContent(currentTranslations);
            // Mettre à jour la force du mot de passe affichée avec la nouvelle langue
            const currentPassword = passwordInput.value;
            if (currentPassword) {
                if (typeof zxcvbn !== 'undefined') {
                    const result = zxcvbn(currentPassword);
                    const strengthScore = result.score;
                    strengthText.textContent = currentTranslations[getStrengthDescription(strengthScore)];
                    crackTimeText.textContent = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
                }
            } else {
                // Fallback for when there is no password yet
                crackTimeText.textContent = "N/A";
            }
        } catch (error) {
            console.error(`Traductions non disponibles pour la langue: ${lang}`, error);
            // Fallback to default language if not found
            const module = await import('./languages/fr.js');
            currentTranslations = module.fr;
            updateContent(currentTranslations);
            const currentPassword = passwordInput.value;
            if (currentPassword) {
                if (typeof zxcvbn !== 'undefined') {
                    const result = zxcvbn(currentPassword);
                    const strengthScore = result.score;
                    strengthText.textContent = currentTranslations[getStrengthDescription(strengthScore)];
                }
            }
        }
    };

    // Gérer le changement de langue
    languageSelect.addEventListener('change', async (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem('language', selectedLang);
        await loadTranslations(selectedLang);
    });

    // Fonction pour afficher un message temporaire
    const showMessage = (message, duration = 2000) => {
        copyMessage.textContent = message;
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, duration);
    };

    // Fonction pour afficher l'historique des mots de passe
    const displayPasswordHistory = () => {
        const history = loadPasswordHistory();
        passwordHistoryList.innerHTML = ''; // Effacer l'historique actuel

        if (history.length === 0) {
            const noHistoryItem = document.createElement('li');
            noHistoryItem.textContent = currentTranslations.noHistory;
            passwordHistoryList.appendChild(noHistoryItem);
            return;
        }

        history.forEach(password => {
            const listItem = document.createElement('li');
            listItem.textContent = password;
            listItem.classList.add('history-item');
            listItem.addEventListener('click', () => {
                passwordInput.value = password; // Remplir le champ de mot de passe avec l'historique
                if (typeof zxcvbn !== 'undefined') {
                    const result = zxcvbn(password);
                    const strengthScore = result.score;
                    strengthText.textContent = currentTranslations[getStrengthDescription(strengthScore)];
                    crackTimeText.textContent = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
                }
                // Mettre à jour le statut pwned aussi
                isPasswordPwned(password).then(pwned => {
                    if (pwned) {
                        pwnedStatus.className = 'pwned-status pwned';
                        pwnedStatusIcon.textContent = '❌';
                        pwnedStatusText.textContent = currentTranslations.pwnedStatusPwned;
                    } else {
                        pwnedStatus.className = 'pwned-status safe';
                        pwnedStatusIcon.textContent = '✅';
                        pwnedStatusText.textContent = currentTranslations.pwnedStatusSafe;
                    }
                });
            });
            passwordHistoryList.appendChild(listItem);
        });
    };

    copyButton.addEventListener('click', () => {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // Pour les appareils mobiles
        document.execCommand('copy');
        showMessage(currentTranslations.copyAlert);
    });

    // Gérer l'effacement de l'historique
    clearHistoryButton.addEventListener('click', () => {
        clearPasswordHistory();
        displayPasswordHistory(); // Mettre à jour l'affichage après effacement
    });

    // Appliquer la langue sauvegardée ou détecter la langue du navigateur au chargement
    let initialLang = 'fr'; // Langue par défaut

    const browserLanguage = navigator.language.split('-')[0]; // Ex: "fr-FR" -> "fr"
    // Vérifier si la langue du navigateur est supportée
    // Pour l'instant, nous ne pouvons pas vérifier dynamiquement si le fichier existe avant l'importation.
    // Nous allons donc nous fier à la liste des langues dans index.html pour déterminer si une langue est "supportée".
    const supportedLanguages = Array.from(languageSelect.options).map(option => option.value);
    if (supportedLanguages.includes(browserLanguage)) {
        initialLang = browserLanguage; // Utiliser la langue du navigateur si supportée
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) { // Vérifier si la langue sauvegardée est valide
        initialLang = savedLanguage; // La langue sauvegardée a priorité
    }
    languageSelect.value = initialLang;
    await loadTranslations(initialLang); // Charger les traductions initiales

    // Ajouter des écouteurs d'événements pour les cases à cocher
    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSymbols.addEventListener('change', generatePassword);

    // Générer un mot de passe au chargement de la page avec la longueur par défaut
    generatePassword();
    displayPasswordHistory(); // Afficher l'historique au chargement de la page
});
