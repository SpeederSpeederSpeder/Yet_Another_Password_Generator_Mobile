document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.createElement('button');
    themeToggleButton.id = 'theme-toggle';
    themeToggleButton.innerHTML = `
        <span class="icon-light">☀️</span>
        <span class="icon-dark">🌙</span>
    `;
    themeToggleButton.setAttribute('aria-label', 'Toggle theme');

    const header = document.querySelector('header');
    if (header) {
        header.appendChild(themeToggleButton);
    } else {
        document.body.prepend(themeToggleButton);
    }

    const currentTheme = localStorage.getItem('theme') || 'dark'; // Thème par défaut est sombre
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButton(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') { // Si le thème actuel est clair, passer au sombre
            theme = 'dark';
        } else { // Sinon, passer au clair
            theme = 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    });

    function updateToggleButton(theme) {
        if (theme === 'light') { // Si le thème est clair, ajouter la classe 'light-mode'
            themeToggleButton.classList.add('light-mode');
            themeToggleButton.classList.remove('dark-mode');
        } else { // Sinon, ajouter la classe 'dark-mode'
            themeToggleButton.classList.add('dark-mode');
            themeToggleButton.classList.remove('light-mode');
        }
    }
});
