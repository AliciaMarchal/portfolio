// ========== Contact form feedback ==========
const form = document.getElementById("contact-form");
const messageZone = document.getElementById("form-message-zone");

if (form && messageZone) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // empêche le rechargement de la page

    // Nettoyer la zone s'il y a déjà un message
    messageZone.innerHTML = "";

    // Créer un paragraphe de confirmation
    const confirmation = document.createElement("p");
    confirmation.textContent = "Your message has been sent (visual only)";
    confirmation.classList.add("fade-in");

    // Ajouter à la page
    messageZone.appendChild(confirmation);
  });
}

// ========== Projects counter (dynamique) ==========
const counter = document.getElementById("counter");
const projectCards = document.querySelectorAll(".project-card");

if (counter && projectCards.length > 0) {
  const target = projectCards.length; // nombre réel de projets
  let count = 0;
  const speed = 200; // vitesse de l'animation (ms)

  const interval = setInterval(() => {
    count++;
    counter.textContent = count;

    if (count === target) {
      clearInterval(interval);
    }
  }, speed);
}