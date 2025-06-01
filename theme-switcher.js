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

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButton(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    });

    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeToggleButton.classList.add('dark-mode');
        } else {
            themeToggleButton.classList.remove('dark-mode');
        }
    }
});
