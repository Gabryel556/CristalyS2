// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA TROCA DE TEMA ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const applySavedTheme = () => {
        // Define 'dark' como padrão se nenhum tema estiver salvo
        const savedTheme = localStorage.getItem('theme') || 'dark'; 
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }
        // REMOVIDO: Chamada para loadParticles(savedTheme);
    };

    const toggleTheme = () => {
        body.classList.toggle('light-theme');

        let currentTheme = 'dark';
        if (body.classList.contains('light-theme')) {
            currentTheme = 'light';
        }
        localStorage.setItem('theme', currentTheme);
        
        // REMOVIDO: Chamada para loadParticles(currentTheme);
    };

    themeToggleButton.addEventListener('click', toggleTheme);
    // Aplica o tema salvo (sem partículas)
    applySavedTheme();

    // --- LÓGICA PARA NAVEGAÇÃO ENTRE ABAS (continua igual) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('data-target');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            contentSections.forEach(section => section.classList.add('hidden'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
});