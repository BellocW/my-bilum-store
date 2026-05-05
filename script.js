const products = [
    { id: 1, name: "Traditional Woolen Bilum", price: 45.00, category: "Bilums", image: "https://unsplash.com" },
    { id: 2, name: "Hand-Carved Sepik Mask", price: 150.00, category: "Crafts", image: "https://unsplash.com" },
    { id: 3, name: "Tropical Fern Pot", price: 30.00, category: "Plants", image: "https://unsplash.com" },
    { id: 4, name: "Natural Fiber Bilum", price: 65.00, category: "Bilums", image: "https://unsplash.com" },
    { id: 5, name: "Clay Cooking Pot", price: 40.00, category: "Crafts", image: "https://unsplash.com" },
    { id: 6, name: "Snake Plant (Low Light)", price: 35.00, category: "Plants", image: "https://unsplash.com" }
];

let cartItems = JSON.parse(localStorage.getItem('craftCart')) || [];
let totalBill = cartItems.reduce((sum, item) => sum + item.price, 0);

function displayProducts(list) {
    const container = document.getElementById('product-container');
    container.innerHTML = ""; 
    list.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>K${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>`;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cartItems.push(product);
    totalBill += product.price;
    saveAndRefresh();
}

function removeFromCart(index) {
    totalBill -= cartItems[index].price;
    cartItems.splice(index, 1);
    saveAndRefresh();
    renderCartItems();
}

function saveAndRefresh() {
    localStorage.setItem('craftCart', JSON.stringify(cartItems));
    document.getElementById('cart-count').innerText = `Cart (${cartItems.length})`;
    document.getElementById('cart-total').innerText = totalBill.toFixed(2);
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
    if (id === 'cart-modal' && modal.style.display === "block") renderCartItems();
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cartItems.length === 0 ? "<p>Your cart is empty.</p>" : "";
    cartItems.forEach((item, index) => {
        list.innerHTML += `
            <div class="cart-item-row">
                <span>${item.name}</span>
                <span>K${item.price.toFixed(2)} 
                <button class="remove-btn" onclick="removeFromCart(${index})">X</button></span>
            </div>`;
    });
    document.getElementById('modal-total').innerText = totalBill.toFixed(2);
}

function checkout() {
    if (cartItems.length === 0) return alert("Cart is empty!");
    const names = cartItems.map(i => i.name).join(", ");
    const msg = `Hello! I'd like to order: ${names}. Total: K${totalBill.toFixed(2)}`;
    window.open(`https://wa.me{encodeURIComponent(msg)}`, '_blank');
}

function filterByCategory(cat) {
    displayProducts(cat === 'All' ? products : products.filter(p => p.category === cat));
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}

function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }

function clearCart() {
    cartItems = []; totalBill = 0; localStorage.removeItem('craftCart');
    saveAndRefresh(); renderCartItems();
}

displayProducts(products);
saveAndRefresh();
