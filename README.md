# Sahan Dissanayake - Personal Portfolio

A premium, "Cosmic-Themed" personal portfolio website designed to showcase projects, skills, and engineering expertise. Built with modern web technologies, this project emphasizes visual storytelling, interactive user experience, and responsive design.

## 🚀 Features

*   **Cosmic Research Theme:** A unique visual identity inspired by space exploration and futuristic interfaces (HUDs, Glassmorphism, Neon Glows).
*   **Interactive Starfield:** A dynamic 3D starfield background powered by Three.js.
*   **"Quantum Portal" Loader:** A custom-built CSS3 animation for the initial loading sequence.
*   **Live Contact Form:** Integrated with **EmailJS** for real-time email functionality without a backend server.
*   **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices using modern CSS Grid and Flexbox.
*   **Dynamic Theme System:** Built-in Dark/Light mode toggle with CSS Variables.
*   **Scroll Animations:** Elements animate on scroll using the AOS (Animate On Scroll) library.

## 🛠️ Technologies Used

*   **HTML5:** Semantic markup and structure.
*   **CSS3:** Custom properties (variables), Glassmorphism effects, Animation keyframes.
*   **JavaScript (ES6):** DOM manipulation, Event handling, 3D logic.
*   **Libraries:**
    *   **Three.js:** For the immersive 3D background.
    *   **EmailJS:** For the serverless contact form.
    *   **Font Awesome:** For scalable vector icons.

## 📂 Project Structure

```bash
sahan-portfolio/
├── assets/             # Images, icons, and static resources
├── css/
│   ├── main.css        # Core styles, variables, and typography
│   ├── components.css  # Component-specific styles (Nav, Cards, Form)
│   └── utilities.css   # Animations, helpers, and global utilities
├── js/
│   ├── config.js       # Configuration settings (EmailJS keys)
│   ├── core.js         # Core utilities (Theme toggle, Scroll logic)
│   ├── components.js   # UI Component logic (Form handling, Modals)
│   └── main.js         # Entry point and Three.js initialization
└── index.html          # Main HTML entry point
```

## � Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/sahan-portfolio.git
    ```
2.  **Open index.html:**
    Simply open the `index.html` file in any modern web browser. No local server is strictly required, though using VS Code's "Live Server" is recommended for the best experience.

## � Contact Form Configuration
The contact form uses **EmailJS**. To make it work with your own email:
1.  Go to `js/config.js`.
2.  Update the `email` object with your own credentials:
    ```javascript
    email: {
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY'
    }
    ```

## 👨‍💻 Author
**Sahan Dissanayake**
*   Undergraduate in Computer Engineering
*   General Sir John Kotelawala Defence University

---
*© 2025 All Rights Reserved.*
