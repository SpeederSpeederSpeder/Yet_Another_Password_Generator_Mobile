# Krypto - Advanced Password Generator

A robust, modern, and customizable password generator designed for enhanced security and a premium user experience.

![Krypto Logo](Krypto.png)

## Features

*   **Modern Responsive Interface**: A unified, mobile-first design that works perfectly on desktops, tablets, and smartphones.
*   **Multilanguage Support**: Supports over 25 languages, automatically detecting your browser preference.
*   **Password Strength Analytics**: Real-time strength estimation using `zxcvbn`, visualized with a dynamic color-coded strength bar.
*   **Pwned Check Integration**: Automatically checks if your generated password has been compromised in known data breaches using k-anonymity (privacy-preserving).
*   **Crack Time Estimation**: Provides an estimate of how long it would take to crack your password using common hardware.
*   **Comprehensive Customization**:
    *   Adjust length from 4 to 100 characters.
    *   Toggle Uppercase, Lowercase, Numbers, and Symbols.
*   **Smart History**: Remembers your last 20 generated passwords (stored locally and securely). Click any history item to re-examine or copy it.
*   **Premium Themes**: Switch between Light, Dark, and Ultra-Dark modes to suit your environment.

## Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/Yet_Another_Password_Generator.git
    ```
2.  **Navigate to the directory**
    ```bash
    cd Yet_Another_Password_Generator
    ```
3.  **Open `index.html`** in your favorite browser. No build steps are strictly required as it uses standard ES modules.

*Note: For the Pwned Check to work, an active internet connection is required to reach the HaveIBeenPwned API.*

## Deployment

### Vercel / Netlify / GitHub Pages
Simply connect your repository. No special build commands are needed. The entry point is `index.html`.

## Contribution

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git commit -m 'Add some amazing feature'`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers directly.