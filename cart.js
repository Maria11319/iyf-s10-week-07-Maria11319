const state = {
    products: [
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Phone", price: 699 },
        { id: 3, name: "Headphones", price: 149 }
    ],
    cart: []
};

function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    saveCart();
    render();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
    } else {
        const item = state.cart.find(item => item.productId === productId);
        if (item) item.quantity = quantity;
        saveCart();
        render();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    render();
}

function clearCart() {
    state.cart = [];
    saveCart();
    render();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) state.cart = JSON.parse(saved);
}

function render() {
    // Products
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    state.products.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });

    // Cart
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${product.name} x${item.quantity}</p>
            <button onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
            <button onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
            <button onclick="removeFromCart(${item.productId})">Remove</button>
        `;
        cartList.appendChild(div);
    });

    // Stats
    document.getElementById("cartTotal").textContent = getCartTotal();
    document.getElementById("cartCount").textContent = `(${getCartCount()} items)`;
}

loadCart();
render();