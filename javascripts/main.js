document.addEventListener("DOMContentLoaded", () => {
  // Exemplo de animação com anime.js
  anime({
    targets: ".hero-title",
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 2000,
    easing: "easeOutExpo",
  });
});
