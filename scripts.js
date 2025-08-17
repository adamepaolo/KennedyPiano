document.addEventListener('DOMContentLoaded', () => {

    // Function to initialize navigation toggle
    const initializeNav = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('hidden');
            });
        }

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navMenu.classList.add('hidden');
                }
            });
        });
    };

    // Function to initialize dark mode toggle
    const initializeDarkMode = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return; // Exit if the element is not found

        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        };

        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        applyTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    };

    // Function to set the active navigation link
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop();

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // Initialize all functionalities directly
    initializeNav();
    initializeDarkMode();
    setActiveNavLink();
});