
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text, query) {
  if (!query) return text;
  const safe = escapeRegExp(query);
  const re = new RegExp(`(${safe})`, "ig");
  return text.replace(re, "<mark>$1</mark>");
}

const search = document.getElementById("search");
const list = document.getElementById("items");
const feedback = document.getElementById("feedback");

const items = Array.from(list.querySelectorAll("li")).map(li => ({
  el: li,
  label: li.getAttribute("data-label")?.trim() || li.textContent.trim()
}));

function render(query) {
  const q = query.trim().toLowerCase();

  let visibleCount = 0;

  items.forEach(({ el, label }) => {
    const match = label.toLowerCase().includes(q);

    
    el.style.display = match ? "" : "none";
    if (match) visibleCount++;

    
    el.innerHTML = match ? highlightMatch(label, q) : label;
  });

  
  if (!q) {
    feedback.textContent = `Affichage de ${items.length} éléments.`;
  } else {
    feedback.textContent = visibleCount
      ? `${visibleCount} résultat(s) pour “${query}”.`
      : `Aucun résultat pour “${query}”.`;
  }
}


render("");


search.addEventListener("input", (e) => {
  render(e.target.value);
});


search.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && search.value) {
    search.value = "";
    render("");
  }
});