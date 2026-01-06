# Shopping Cart App (Vanilla JS)

A small shopping cart built with *HTML/CSS/JavaScript*.  
Users can add, remove and clear products dynamically.  
The total is computed with Array.prototype.reduce and prices are formatted with Intl.NumberFormat (fr-BE).

## Demo
> Add a screenshot here (e.g. screenshots/shopping-cart.png).

## Features
- Add / remove / clear products dynamically
- Total price calculated with reduce
- Prices formatted with Intl.NumberFormat (fr-BE locale)
- Event delegation for efficient button handling
- Clean render() approach to keep UI in sync with state

## Tech
- HTML5, CSS3
- JavaScript (DOM, arrays, events)

## How to run
1. Clone or download this repo
2. Open index.html in your browser
3. Try adding, removing, and clearing products

## Structure
/ (project root)  
├── index.html  
├── styles.css  
├── app.js  
└── /screenshots (optional)

## Next steps (roadmap)
- Add product quantities (qty), total = price * qty
- Persist cart in localStorage
- Add basic tests (manual or automated)