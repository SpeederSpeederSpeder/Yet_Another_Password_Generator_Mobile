document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.createElement('button');
    themeToggleButton.id = 'theme-toggle';
    themeToggleButton.innerHTML = `
        <span class="icon-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </span>
        <span class="icon-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </span>
        <span class="icon-ultra-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </span>
    `;
    themeToggleButton.setAttribute('aria-label', 'Toggle theme');

    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel) {
        settingsPanel.appendChild(themeToggleButton);
    }

    const currentTheme = localStorage.getItem('theme') || 'light'; // Thème par défaut est clair
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButton(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') { // Si le thème actuel est clair, passer au sombre
            theme = 'dark';
        } else if (theme === 'dark') { // Si le thème actuel est sombre, passer à l'ultra-sombre
            theme = 'ultra-dark';
        } else { // Sinon, passer au clair
            theme = 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    });

    function updateToggleButton(theme) {
        themeToggleButton.classList.remove('light-mode', 'dark-mode', 'ultra-dark-mode');
        if (theme === 'light') { // Si le thème est clair, ajouter la classe 'light-mode'
            themeToggleButton.classList.add('light-mode');
        } else if (theme === 'dark') { // Si le thème est sombre, ajouter la classe 'dark-mode'
            themeToggleButton.classList.add('dark-mode');
        } else { // Sinon, ajouter la classe 'ultra-dark-mode'
            themeToggleButton.classList.add('ultra-dark-mode');
        }
    }
});
