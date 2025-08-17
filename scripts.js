document.addEventListener('DOMContentLoaded', () => {

    // Function to load HTML content from a file into an element
    const loadHTML = (elementId, filePath) => {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                // After loading the header, initialize the navigation and dark mode functionalities
                if (elementId === 'header-placeholder') {
                    initializeNav();
                    initializeDarkMode();
                    setActiveNavLink();
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    };
    
    // Load header and footer
    loadHTML('header-placeholder', '_header.html');
    loadHTML('footer-placeholder', '_footer.html');

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
});