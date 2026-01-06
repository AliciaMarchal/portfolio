const state = [];

const els = {
    input: document.getElementById("input"),
    addbtn: document.getElementById("add-task"),
    clearAll: document.getElementById("clear-all"),
    counter: document.getElementById("counter"),
    list: document.getElementById("list"),
};

function normalize(str) {
    return str.trim().replace(/\s+/g, " ").toLowerCase();
}

function pluralize(n) {
    return n === 1 ? "task" : "tasks";
}

function render() {
    els.list.innerHTML = "";

    state.forEach(item => {
        const li = document.createElement("li");
        li.dataset.id = item.id;
        li.textContent = item.label;

        const delbtn = document.createElement("button");
        delbtn.type = "button";
        delbtn.className = "remove";
        delbtn.ariaLabel = `Supprimer ${item.label}`;
        delbtn.textContent = "❌";
        li.appendChild(delbtn);
        els.list.appendChild(li);
    });

    const n = state.length;
    els.counter.textContent = `${n} ${pluralize(n)}`;
    els.clearAll.hidden = (n === 0);
}

els.addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const raw = els.input.value;
    const key = normalize(raw);
    const label = raw.trim().replace(/\s+/g, " ");

    if (!key) return;
    if (state.some(it => it.id === key)) {
        els.input.select();
        return;
    }

    state.push({ id: key, label});
    els.input.value = "";
    render();
});

els.list.addEventListener("click", (e) => {
    if(!e.target.classList.contains("remove")) return;
    const id = e.target.parentElement.dataset.id;
    const idx = state.findIndex(it => it.id === id);
    if( idx !== -1) {
        state.splice(idx, 1);
        render();
    }
});

els.clearAll.addEventListener("click", () => {
    state.length = 0;
    render();
});

render();