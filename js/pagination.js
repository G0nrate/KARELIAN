// pagination.js

function setupPagination(data, renderCards, cardContainer) {
    const itemsPerPage = 6;
    let currentPage = 1;

    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderCards();
        });
        paginationContainer.appendChild(pageBtn);
    }

    cardContainer.parentNode.appendChild(paginationContainer); // Перемещаем пагинацию в конец родительского элемента
}

export { setupPagination };
