document.addEventListener("DOMContentLoaded", function () {
    let data = [];
    let cartItems = [];
    const cardContainer = document.querySelector('.card-container');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');

    const fetchData = () => {
        fetch("json/products.json")
            .then(response => response.json())
            .then(products => {
                data = products;
                renderCards(data);
            })
            .catch(error => console.error('Ошибка загрузки данных:', error));
    };

    const renderCards = (products) => {
        cardContainer.innerHTML = '';
        if (products.length === 0) {
            cardContainer.innerHTML = '<p>Нет доступных товаров</p>';
            return;
        }
        products.forEach(product => {
            const card = `
            <div class="card" data-type="${product['data-type']}">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p class="price">${product.price}</p>
                    <button class="add-to-cart" data-product="${product.title}" data-price="${product.price}">Добавить в корзину</button>
                </div>
            </div>
            `;
            cardContainer.innerHTML += card;
        });
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const title = button.dataset.product;
                const price = parseFloat(button.dataset.price);
                addToCart(title, price);
            });
        });
    };

    const filterProducts = (category) => {
        const filteredData = data.filter(product => product['data-type'] === category);
        renderCards(filteredData);
    };

    const allProductsBtn = document.getElementById('all-products-btn');
    const headphonesBtn = document.getElementById('headphones-btn');
    const speakersBtn = document.getElementById('speakers-btn');
    const microphonesBtn = document.getElementById('microphones-btn');

    allProductsBtn.addEventListener('click', () => {
        renderCards(data);
    });

    headphonesBtn.addEventListener('click', () => {
        filterProducts('наушники');
    });

    speakersBtn.addEventListener('click', () => {
        filterProducts('колонки');
    });

    microphonesBtn.addEventListener('click', () => {
        filterProducts('микрофоны');
    });

    const addToCart = (title, price) => {
        const cartItem = { title, price };
        cartItems.push(cartItem);
        renderCartItems();
        updateTotalAmount();
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            cartItemsContainer.innerHTML += `<li class="item-buy">${item.title} - ${item.price} BYN <button class="remove-from-cart" data-title="${item.title}">Удалить</button></li>`;
        });
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const title = button.dataset.title;
                removeFromCart(title);
            });
        });
    };

    const removeFromCart = (title) => {
        cartItems = cartItems.filter(item => item.title !== title);
        renderCartItems();
        updateTotalAmount();
    };

    const updateTotalAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price;
        });
        totalAmountElement.textContent = totalAmount;
    };

    fetchData();
});
