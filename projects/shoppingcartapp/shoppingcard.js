"use strict";

// ---------- Data ----------
const products = [
  { id: 1, name: "Coffee", price: 3.5 },
  { id: 2, name: "Tea",    price: 2.8 },
  { id: 3, name: "Milk",   price: 1.9 },
];

let cart = []; // simple list at step 1

// ---------- Helpers ----------
const fmt = new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR" });

const els = {
  products: document.getElementById("products"),
  cart:     document.getElementById("cart"),
  total:    document.getElementById("total"),
  clear:    document.getElementById("clear"),
};

// ---------- Renderers ----------
function renderProducts() {
  els.products.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.dataset.id = String(p.id);

    const left = document.createElement("span");
    left.textContent = p.name + " ";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "(" + fmt.format(p.price) + ")";
    left.appendChild(price);

    const btn = document.createElement("button");
    btn.dataset.action = "add";
    btn.textContent = "Add";

    li.append(left, btn);
    els.products.appendChild(li);
  });
}

function renderCart() {
  els.cart.innerHTML = "";

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.innerHTML = "<em>Cart is empty</em>";
    els.cart.appendChild(li);
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.dataset.id = String(item.id);

      const left = document.createElement("span");
      left.textContent = item.name + " ";

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = fmt.format(item.price);
      left.appendChild(badge);

      const btn = document.createElement("button");
      btn.dataset.action = "remove";
      btn.textContent = "Remove";

      li.append(left, btn);
      els.cart.appendChild(li);
    });
  }

  const total = cart.reduce((sum, it) => sum + it.price, 0);
  els.total.textContent = fmt.format(total);
}

// ---------- Actions ----------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  cart = [...cart, product];
  renderCart();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart = [...cart.slice(0, idx), ...cart.slice(idx + 1)];
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

// ---------- Events (delegation) ----------
els.products.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.dataset.action !== "add") return;
  const li = btn.closest("li");
  addToCart(Number(li.dataset.id));
});

els.cart.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.dataset.action !== "remove") return;
  const li = btn.closest("li");
  removeFromCart(Number(li.dataset.id));
});

els.clear.addEventListener("click", clearCart);

// ---------- Init ----------
renderProducts();
renderCart();