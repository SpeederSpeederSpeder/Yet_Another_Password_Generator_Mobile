import { getStrengthDescription } from './utils/password-strength-checker.js';
import { addPasswordToHistory, loadPasswordHistory, clearPasswordHistory } from './utils/password-history.js';
import { isPasswordPwned } from './utils/pwned-checker.js';

document.addEventListener('DOMContentLoaded', async () => {
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copyButton');
    const refreshButton = document.getElementById('refreshButton');
    const passwordLengthInput = document.getElementById('passwordLength');
    const passwordLengthValueDisplay = document.getElementById('passwordLengthValue');
    const languageSelect = document.getElementById('language');
    const copyMessage = document.getElementById('copyMessage');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const strengthText = document.getElementById('strengthText');
    const strengthBar = document.getElementById('strengthBar');
    const crackTimeText = document.getElementById('crackTimeText');
    const pwnedStatus = document.getElementById('pwnedStatus');
    const pwnedText = document.getElementById('pwnedText');
    const passwordHistoryList = document.getElementById('passwordHistoryList');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    let currentTranslations = {};
    let pwnedCheckTimeout;

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

    const getStrengthColor = (score) => {
        const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
        return colors[score] || colors[0];
    };

    const translateCrackTime = (crackTime) => {
        if (!crackTime || !currentTranslations.crackTimeUnits) {
            return crackTime;
        }

        const parts = crackTime.split(' ');
        if (parts.length < 2) {
            const unit = parts[0].toLowerCase();
            return currentTranslations.crackTimeUnits[unit] || crackTime;
        }

        const value = parts.slice(0, parts.length - 1).join(' ');
        const unit = parts[parts.length - 1].toLowerCase();
        const translatedUnit = currentTranslations.crackTimeUnits[unit];

        return translatedUnit ? `${value} ${translatedUnit}` : crackTime;
    };

    const checkPwned = async (password) => {
        clearTimeout(pwnedCheckTimeout);
        pwnedStatus.classList.add('hidden');
        
        pwnedCheckTimeout = setTimeout(async () => {
            const isPwned = await isPasswordPwned(password);
            if (isPwned) {
                pwnedText.textContent = currentTranslations.pwnedAlert || "Exposé !";
                pwnedStatus.classList.remove('hidden');
            }
        }, 500);
    };

    const generatePassword = async () => {
        const length = parseInt(passwordLengthInput.value);
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

        if (availableChars.length === 0) {
            availableChars = lowercaseChars;
            includeLowercase.checked = true;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        passwordInput.value = password;

        if (typeof zxcvbn !== 'undefined') {
            const result = zxcvbn(password);
            const score = result.score;
            const crackTime = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
            
            strengthText.textContent = currentTranslations[getStrengthDescription(score, crackTime)] || "N/A";
            crackTimeText.textContent = crackTime;
            
            strengthBar.style.width = `${(score + 1) * 20}%`;
            strengthBar.style.backgroundColor = getStrengthColor(score);
        }

        checkPwned(password);
        addPasswordToHistory(password);
        displayPasswordHistory();
    };

    passwordLengthInput.addEventListener('input', () => {
        passwordLengthValueDisplay.textContent = passwordLengthInput.value;
        generatePassword();
    });

    refreshButton.addEventListener('click', generatePassword);

    const updateContent = (translations) => {
        const h1Element = document.querySelector('.logo h1');
        if (h1Element) h1Element.textContent = "Krypto"; // App name stays same or can be translations.title

        const passwordLengthLabelElement = document.querySelector('label[for="passwordLength"]');
        if (passwordLengthLabelElement) passwordLengthLabelElement.textContent = translations.passwordLengthLabel;

        const generatorTab = document.querySelector('.tab-button[data-tab="generator"] .tab-text');
        if (generatorTab) generatorTab.textContent = translations.generatorTab;

        const historyTab = document.querySelector('.tab-button[data-tab="history"] .tab-text');
        if (historyTab) historyTab.textContent = translations.historyTab;

        const settingsTab = document.querySelector('.tab-button[data-tab="settings"] .tab-text');
        if (settingsTab) settingsTab.textContent = translations.settingsTab;

        const labels = {
            'includeUppercase': 'uppercaseLabel',
            'includeLowercase': 'lowercaseLabel',
            'includeNumbers': 'numbersLabel',
            'includeSymbols': 'symbolsLabel'
        };

        for (const [id, key] of Object.entries(labels)) {
            const el = document.getElementById(id);
            if (el) {
                const labelText = el.closest('.checkbox-container').querySelector('.label-text');
                if (labelText) labelText.textContent = translations[key];
            }
        }

        const strengthLabel = document.querySelector('.stat-item:nth-child(1) .stat-label');
        if (strengthLabel) strengthLabel.textContent = translations.passwordStrengthLabel;

        const crackTimeLabel = document.querySelector('.stat-item:nth-child(2) .stat-label');
        if (crackTimeLabel) crackTimeLabel.textContent = translations.crackTimeLabel;

        const historyTitle = document.querySelector('.history-card h2');
        if (historyTitle) historyTitle.textContent = translations.historyTitle;

        const pwnedLabel = document.querySelector('#pwnedStatus .stat-label');
        if (pwnedLabel) pwnedLabel.textContent = translations.pwnedLabel || "Sécurité";

        if (clearHistoryButton) clearHistoryButton.textContent = translations.clearHistoryButton;

        const languageLabel = document.querySelector('.setting-info label[for="language"]');
        if (languageLabel) languageLabel.textContent = translations.languageLabel;
        
        const languageDesc = document.querySelector('.setting-item:nth-child(1) .setting-desc');
        if (languageDesc) languageDesc.textContent = translations.languageDesc || "Choose your preferred language";

        const themeLabel = document.querySelector('#theme-setting-item label');
        if (themeLabel) themeLabel.textContent = translations.themeLabel || "Theme";

        const themeDesc = document.querySelector('#theme-setting-item .setting-desc');
        if (themeDesc) themeDesc.textContent = translations.themeDesc || "Change application appearance";
    };

    const loadTranslations = async (lang) => {
        try {
            const module = await import(`./languages/${lang}.js`);
            currentTranslations = module[lang];
            updateContent(currentTranslations);
            
            const currentPassword = passwordInput.value;
            if (currentPassword && typeof zxcvbn !== 'undefined') {
                const result = zxcvbn(currentPassword);
                const score = result.score;
                const crackTime = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
                strengthText.textContent = currentTranslations[getStrengthDescription(score, crackTime)];
                crackTimeText.textContent = crackTime;
            }
        } catch (error) {
            console.error(`Translations not available for: ${lang}`, error);
            const module = await import('./languages/fr.js');
            currentTranslations = module.fr;
            updateContent(currentTranslations);
        }
    };

    languageSelect.addEventListener('change', async (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem('language', selectedLang);
        await loadTranslations(selectedLang);
    });

    const showMessage = (message, duration = 2000) => {
        copyMessage.textContent = message;
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, duration);
    };

    const displayPasswordHistory = () => {
        const history = loadPasswordHistory();
        passwordHistoryList.innerHTML = '';

        if (history.length === 0) {
            const noHistoryItem = document.createElement('li');
            noHistoryItem.textContent = currentTranslations.noHistory || "No history yet";
            noHistoryItem.classList.add('history-item');
            noHistoryItem.style.justifyContent = 'center';
            noHistoryItem.style.opacity = '0.5';
            passwordHistoryList.appendChild(noHistoryItem);
            return;
        }

        history.forEach(password => {
            const listItem = document.createElement('li');
            listItem.classList.add('history-item');
            
            const passText = document.createElement('span');
            passText.textContent = password;
            listItem.appendChild(passText);

            const copyIcon = document.createElement('div');
            copyIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
            copyIcon.style.opacity = '0.5';
            listItem.appendChild(copyIcon);

            listItem.addEventListener('click', () => {
                passwordInput.value = password;
                if (typeof zxcvbn !== 'undefined') {
                    const result = zxcvbn(password);
                    const score = result.score;
                    const crackTime = translateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
                    strengthText.textContent = currentTranslations[getStrengthDescription(score, crackTime)];
                    crackTimeText.textContent = crackTime;
                    strengthBar.style.width = `${(score + 1) * 20}%`;
                    strengthBar.style.backgroundColor = getStrengthColor(score);
                }
                
                checkPwned(password);
                
                // Also copy to clipboard when clicking history item
                navigator.clipboard.writeText(password);
                showMessage(currentTranslations.copyAlert);
            });
            passwordHistoryList.appendChild(listItem);
        });
    };

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordInput.value);
        showMessage(currentTranslations.copyAlert);
    });

    clearHistoryButton.addEventListener('click', () => {
        clearPasswordHistory();
        displayPasswordHistory();
    });

    const supportedLanguages = Array.from(languageSelect.options).map(option => option.value);
    let initialLang = 'fr';
    const browserLanguage = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLanguage)) initialLang = browserLanguage;
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) initialLang = savedLanguage;
    
    languageSelect.value = initialLang;
    await loadTranslations(initialLang);

    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSymbols.addEventListener('change', generatePassword);

    generatePassword();
    displayPasswordHistory();
});