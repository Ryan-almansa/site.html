document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById('main-title');
    setTimeout(function() {
      title.classList.add('show');
    }, 1000); // Délai de 1 seconde avant que l'animation ne commence
  });
  