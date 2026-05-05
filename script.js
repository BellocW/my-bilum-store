const products = [
    {
        id: 1,
        name: "Handwoven Highland Bilum",
        price: 45.00,
        category: "Bilums",
        image: "https://unsplash.com"
    },
    {
        id: 2,
        name: "Traditional Sepik Wood Carving",
        price: 120.00,
        category: "Crafts",
        image: "https://unsplash.com"
    },
    {
        id: 3,
        name: "Potted Tropical Fern",
        price: 25.00,
        category: "Plants",
        image: "https://unsplash.com"
    },
    {
        id: 4,
        name: "Modern Woolen Bilum",
        price: 55.00,
        category: "Bilums",
        image: "https://unsplash.com"
    },
    {
        id: 5,
        name: "Clay Cooking Pot",
        price: 35.00,
        category: "Crafts",
        image: "https://unsplash.com"
    }
];

// ... all previous functions (displayProducts, addToCart, toggleDarkMode) remain the same ...


let cartItems = JSON.parse(localStorage.getItem('myCart')) || [];
let totalBill = cartItems.reduce((sum, item) => sum + item.price, 0);

function displayProducts(list) {
    const container = document.getElementById('product-container');
    container.innerHTML = "";
    list.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>`;
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
    if (id === 'cart-modal' && modal.style.display === "block") renderCartItems();
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
    localStorage.setItem('myCart', JSON.stringify(cartItems));
    document.getElementById('cart-count').innerText = `Cart (${cartItems.length})`;
    document.getElementById('cart-total').innerText = totalBill.toFixed(2);
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cartItems.length === 0 ? "<p>Empty</p>" : "";
    cartItems.forEach((item, index) => {
        list.innerHTML += `<div class="cart-item-row">${item.name} - $${item.price} 
        <button class="remove-btn" onclick="removeFromCart(${index})">X</button></div>`;
    });
    document.getElementById('modal-total').innerText = totalBill.toFixed(2);
}

function filterByCategory(cat) {
    displayProducts(cat === 'All' ? products : products.filter(p => p.category === cat));
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}

function clearCart() {
    cartItems = []; totalBill = 0; localStorage.removeItem('myCart');
    saveAndRefresh(); renderCartItems();
}

displayProducts(products);
saveAndRefresh();
