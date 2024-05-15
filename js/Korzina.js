document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Получение данных о продуктах
    fetch("json/products.json")
        .then(response => response.json())
        .then(products => {
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productName = button.getAttribute('data-product');
                    const selectedProduct = products.find(product => product.title === productName);
                    addToCart(selectedProduct);
                    addToLocalStorage(selectedProduct);
                });
            });
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    const addToLocalStorage = (product) => {
        let cartItems = localStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const addToCart = (product) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="cart-item-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="cart-item-price">${product.price}</p>
            </div>
        `;
        document.querySelector('.cart-items-container').appendChild(cartItem);
    };
});
document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();

    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        cartItemsContainer.innerHTML = '';

        let cartItems = localStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
            return;
        }

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h3 class="product-title">${item.title}</h3>
                    <p class="product-description">${item.description}</p>
                    <p class="cart-item-price">${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
});
