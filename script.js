document.addEventListener('DOMContentLoaded', () => {
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

    const translations = {
        fr: {
            title: "Générateur de Mot de Passe",
            passwordLengthLabel: "Longueur du mot de passe:",
            copyButton: "Copier",
            copyAlert: "Mot de passe copié dans le presse-papiers !",
            generateError: "Impossible de générer un mot de passe. Veuillez réessayer.",
            uppercaseLabel: "Majuscules",
            lowercaseLabel: "Minuscules",
            numbersLabel: "Chiffres",
            symbolsLabel: "Symboles"
        },
        en: {
            title: "Password Generator",
            passwordLengthLabel: "Password Length:",
            copyButton: "Copy",
            copyAlert: "Password copied to clipboard!",
            generateError: "Could not generate password. Please try again.",
            uppercaseLabel: "Uppercase",
            lowercaseLabel: "Lowercase",
            numbersLabel: "Numbers",
            symbolsLabel: "Symbols"
        },
        es: {
            title: "Generador de Contraseñas",
            passwordLengthLabel: "Longitud de la contraseña:",
            copyButton: "Copiar",
            copyAlert: "¡Contraseña copiada al portapapeles!",
            generateError: "No se pudo generar la contraseña. Por favor, inténtelo de nuevo.",
            uppercaseLabel: "Mayúsculas",
            lowercaseLabel: "Minúsculas",
            numbersLabel: "Números",
            symbolsLabel: "Símbolos"
        },
        de: {
            title: "Passwort-Generator",
            passwordLengthLabel: "Passwortlänge:",
            copyButton: "Kopieren",
            copyAlert: "Passwort in die Zwischenablage kopiert!",
            generateError: "Passwort konnte nicht generiert werden. Bitte versuchen Sie es erneut.",
            uppercaseLabel: "Großbuchstaben",
            lowercaseLabel: "Kleinbuchstaben",
            numbersLabel: "Zahlen",
            symbolsLabel: "Symbole"
        },
        it: {
            title: "Generatore di Password",
            passwordLengthLabel: "Lunghezza password:",
            copyButton: "Copia",
            copyAlert: "Password copiata negli appunti!",
            generateError: "Impossibile generare la password. Riprova.",
            uppercaseLabel: "Maiuscole",
            lowercaseLabel: "Minuscole",
            numbersLabel: "Numeri",
            symbolsLabel: "Simboli"
        },
        pt: {
            title: "Gerador de Senhas",
            passwordLengthLabel: "Comprimento da senha:",
            copyButton: "Copiar",
            copyAlert: "Senha copiada para a área de transferência!",
            generateError: "Não foi possível gerar a senha. Por favor, tente novamente.",
            uppercaseLabel: "Maiúsculas",
            lowercaseLabel: "Minúsculas",
            numbersLabel: "Números",
            symbolsLabel: "Símbolos"
        },
        ru: {
            title: "Генератор Паролей",
            passwordLengthLabel: "Длина пароля:",
            copyButton: "Копировать",
            copyAlert: "Пароль скопирован в буфер обмена!",
            generateError: "Не удалось сгенерировать пароль. Пожалуйста, попробуйте еще раз.",
            uppercaseLabel: "Заглавные буквы",
            lowercaseLabel: "Строчные буквы",
            numbersLabel: "Цифры",
            symbolsLabel: "Символы"
        },
        ja: {
            title: "パスワードジェネレーター",
            passwordLengthLabel: "パスワードの長さ:",
            copyButton: "コピー",
            copyAlert: "パスワードがクリップボードにコピーされました！",
            generateError: "パスワードを生成できませんでした。もう一度お試しください。",
            uppercaseLabel: "大文字",
            lowercaseLabel: "小文字",
            numbersLabel: "数字",
            symbolsLabel: "記号"
        },
        zh: {
            title: "密码生成器",
            passwordLengthLabel: "密码长度:",
            copyButton: "复制",
            copyAlert: "密码已复制到剪贴板！",
            generateError: "无法生成密码。请重试。",
            uppercaseLabel: "大写字母",
            lowercaseLabel: "小写字母",
            numbersLabel: "数字",
            symbolsLabel: "符号"
        },
        ko: {
            title: "비밀번호 생성기",
            passwordLengthLabel: "비밀번호 길이:",
            copyButton: "복사",
            copyAlert: "비밀번호가 클립보드에 복사되었습니다!",
            generateError: "비밀번호를 생성할 수 없습니다. 다시 시도해주세요.",
            uppercaseLabel: "대문자",
            lowercaseLabel: "소문자",
            numbersLabel: "숫자",
            symbolsLabel: "기호"
        },
        ar: {
            title: "مولد كلمات المرور",
            passwordLengthLabel: "طول كلمة المرور:",
            copyButton: "نسخ",
            copyAlert: "تم نسخ كلمة المرور إلى الحافظة!",
            generateError: "تعذر إنشاء كلمة المرور. الرجاء المحاولة مرة أخرى.",
            uppercaseLabel: "أحرف كبيرة",
            lowercaseLabel: "أحرف صغيرة",
            numbersLabel: "أرقام",
            symbolsLabel: "رموز"
        },
        hi: {
            title: "पासवर्ड जनरेटर",
            passwordLengthLabel: "पासवर्ड की लंबाई:",
            copyButton: "कॉपी करें",
            copyAlert: "पासवर्ड क्लिपबोर्ड पर कॉपी हो गया है!",
            generateError: "पासवर्ड जनरेट नहीं हो सका। कृपया पुनः प्रयास करें।",
            uppercaseLabel: "बड़े अक्षर",
            lowercaseLabel: "छोटे अक्षर",
            numbersLabel: "संख्याएँ",
            symbolsLabel: "प्रतीक"
        },
        he: {
            title: "מחולל סיסמאות",
            passwordLengthLabel: "אורך סיסמה:",
            copyButton: "העתק",
            copyAlert: "הסיסמה הועתקה ללוח!",
            generateError: "לא ניתן ליצור סיסמה. אנא נסה שוב.",
            uppercaseLabel: "אותיות גדולות",
            lowercaseLabel: "אותיות קטנות",
            numbersLabel: "מספרים",
            symbolsLabel: "סמלים"
        },
        ro: {
            title: "Generator de Parole",
            passwordLengthLabel: "Lungimea parolei:",
            copyButton: "Copiază",
            copyAlert: "Parola a fost copiată în clipboard!",
            generateError: "Nu s-a putut genera parola. Vă rugăm să încercați din nou.",
            uppercaseLabel: "Majuscule",
            lowercaseLabel: "Minuscule",
            numbersLabel: "Cifre",
            symbolsLabel: "Simboluri"
        },
        pl: {
            title: "Generator Haseł",
            passwordLengthLabel: "Długość hasła:",
            copyButton: "Kopiuj",
            copyAlert: "Hasło skopiowane do schowka!",
            generateError: "Nie udało się wygenerować hasła. Spróbuj ponownie.",
            uppercaseLabel: "Wielkie litery",
            lowercaseLabel: "Małe litery",
            numbersLabel: "Cyfry",
            symbolsLabel: "Symbole"
        },
        uk: {
            title: "Генератор Паролів",
            passwordLengthLabel: "Довжина пароля:",
            copyButton: "Копіювати",
            copyAlert: "Пароль скопійовано в буфер обміну!",
            generateError: "Не вдалося згенерувати пароль. Будь ласка, спробуйте ще раз.",
            uppercaseLabel: "Великі літери",
            lowercaseLabel: "Малі літери",
            numbersLabel: "Цифри",
            symbolsLabel: "Символи"
        },
        vi: {
            title: "Trình tạo mật khẩu",
            passwordLengthLabel: "Độ dài mật khẩu:",
            copyButton: "Sao chép",
            copyAlert: "Đã sao chép mật khẩu vào khay nhớ tạm!",
            generateError: "Không thể tạo mật khẩu. Vui lòng thử lại.",
            uppercaseLabel: "Chữ hoa",
            lowercaseLabel: "Chữ thường",
            numbersLabel: "Số",
            symbolsLabel: "Ký hiệu"
        }
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

        // Construire les paramètres de requête
        const params = new URLSearchParams({
            length: length,
            uppercase: includeUpper,
            lowercase: includeLower,
            numbers: includeNum,
            symbols: includeSym
        }).toString();

        try {
            const response = await fetch(`/api/generate-password?${params}`);
            const data = await response.json();
            passwordInput.value = data.password;
        } catch (error) {
            console.error('Erreur lors de la génération du mot de passe:', error);
            showMessage(translations[languageSelect.value].generateError, 3000);
        }
    };

    // Fonction pour mettre à jour le texte de l'interface
    const updateContent = (lang) => {
        const h1Element = document.querySelector('h1');
        if (h1Element) h1Element.textContent = translations[lang].title;

        const passwordLengthLabelElement = document.querySelector('label[for="passwordLength"]');
        if (passwordLengthLabelElement) passwordLengthLabelElement.textContent = translations[lang].passwordLengthLabel;

        if (copyButton) copyButton.textContent = translations[lang].copyButton;

        if (includeUppercase) includeUppercase.nextSibling.textContent = translations[lang].uppercaseLabel;

        if (includeLowercase) includeLowercase.nextSibling.textContent = translations[lang].lowercaseLabel;

        if (includeNumbers) includeNumbers.nextSibling.textContent = translations[lang].numbersLabel;

        if (includeSymbols) includeSymbols.nextSibling.textContent = translations[lang].symbolsLabel;
    };

    // Gérer le changement de langue
    languageSelect.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem('language', selectedLang);
        updateContent(selectedLang);
    });

    // Fonction pour afficher un message temporaire
    const showMessage = (message, duration = 2000) => {
        copyMessage.textContent = message;
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, duration);
    };

    copyButton.addEventListener('click', () => {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // Pour les appareils mobiles
        document.execCommand('copy');
        showMessage(translations[languageSelect.value].copyAlert);
    });

    // Appliquer la langue sauvegardée ou détecter la langue du navigateur au chargement
    let initialLang = 'fr'; // Langue par défaut

    const browserLanguage = navigator.language.split('-')[0]; // Ex: "fr-FR" -> "fr"
    if (translations[browserLanguage]) {
        initialLang = browserLanguage; // Utiliser la langue du navigateur si supportée
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) { // Vérifier si la langue sauvegardée est valide
        initialLang = savedLanguage; // La langue sauvegardée a priorité
    }
    languageSelect.value = initialLang;
    updateContent(initialLang);

    // Ajouter des écouteurs d'événements pour les cases à cocher
    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSymbols.addEventListener('change', generatePassword);

    // Générer un mot de passe au chargement de la page avec la longueur par défaut
    generatePassword();
});
