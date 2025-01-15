document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});


// Attendre que la page soit complètement chargée
window.addEventListener('load', () => {
  document.body.classList.add('site-loaded');
});
