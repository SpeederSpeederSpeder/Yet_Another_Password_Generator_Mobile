import { calculatePasswordStrength, getStrengthDescription } from './utils/password-strength-checker.js';
import { addPasswordToHistory, loadPasswordHistory, clearPasswordHistory } from './utils/password-history.js';

// Statically import all language files
import { ar } from './languages/ar.js';
import { cs } from './languages/cs.js';
import { da } from './languages/da.js';
import { de } from './languages/de.js';
import { en } from './languages/en.js';
import { es } from './languages/es.js';
import { fi } from './languages/fi.js';
import { fr } from './languages/fr.js';
import { he } from './languages/he.js';
import { hi } from './languages/hi.js';
import { id } from './languages/id.js';
import { it } from './languages/it.js';
import { ja } from './languages/ja.js';
import { ko } from './languages/ko.js';
import { ms } from './languages/ms.js';
import { nl } from './languages/nl.js';
import { no } from './languages/no.js';
import { pl } from './languages/pl.js';
import { pt } from './languages/pt.js';
import { ro } from './languages/ro.js';
import { ru } from './languages/ru.js';
import { sv } from './languages/sv.js';
import { th } from './languages/th.js';
import { tr } from './languages/tr.js';
import { uk } from './languages/uk.js';
import { vi } from './languages/vi.js';
import { zh } from './languages/zh.js';


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
    const passwordHistoryList = document.getElementById('passwordHistoryList'); // Nouvel élément
    const clearHistoryButton = document.getElementById('clearHistoryButton'); // Nouvel élément

    const allTranslations = {
        ar, cs, da, de, en, es, fi, fr, he, hi, id, it, ja, ko, ms, nl, no, pl, pt, ro, ru, sv, th, tr, uk, vi, zh
    };

    // Mettre à jour l'affichage de la longueur du mot de passe
    passwordLengthInput.addEventListener('input', () => {
        passwordLengthValueDisplay.textContent = passwordLengthInput.value;
        generatePassword(); // Générer un nouveau mot de passe lorsque la longueur change
    });

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

        // Calculer et afficher la force du mot de passe
        const strengthScore = calculatePasswordStrength(generatedPassword);
        strengthText.textContent = getStrengthDescription(strengthScore);

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

        const historyTitle = document.querySelector('.password-history-section h2');
        if (historyTitle) historyTitle.textContent = translations.historyTitle;

        if (clearHistoryButton) clearHistoryButton.textContent = translations.clearHistoryButton;
    };

    // Fonction pour charger les traductions
    const loadTranslations = (lang) => { // Removed async as no dynamic import
        if (allTranslations[lang]) {
            updateContent(allTranslations[lang]);
        } else {
            console.error(`Traductions non disponibles pour la langue: ${lang}`);
            // Fallback to default language if not found
            if (allTranslations['fr']) {
                updateContent(allTranslations['fr']);
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
            noHistoryItem.textContent = allTranslations[languageSelect.value].noHistory;
            passwordHistoryList.appendChild(noHistoryItem);
            return;
        }

        history.forEach(password => {
            const listItem = document.createElement('li');
            listItem.textContent = password;
            listItem.classList.add('history-item');
            listItem.addEventListener('click', () => {
                passwordInput.value = password; // Remplir le champ de mot de passe avec l'historique
                const strengthScore = calculatePasswordStrength(password);
                strengthText.textContent = getStrengthDescription(strengthScore);
            });
            passwordHistoryList.appendChild(listItem);
        });
    };

    copyButton.addEventListener('click', () => {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // Pour les appareils mobiles
        document.execCommand('copy');
        showMessage(allTranslations[languageSelect.value].copyAlert);
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
