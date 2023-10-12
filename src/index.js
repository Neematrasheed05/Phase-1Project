document.addEventListener('DOMContentLoaded', function () {
  const makeupCard = document.querySelector('.makeup-card');
  const productAttributes = document.getElementById('product-attributes');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const paginationContainer = document.getElementById('pagination-container');

  let currentPage = 1;
  const productsPerPage = 10; // Number of products to display per page
  let filteredProducts = []; // Array to hold the filtered products

  // Function to fetch and display products
  function fetchAndDisplayProducts() {
    const apiUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Store the data in filteredProducts
        filteredProducts = data;

        // Display the first page of products
        displayProducts(currentPage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  // Function to display products for a given page
  function displayProducts(page) {
    // Calculate the start and end indices for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Clear previous products
    makeupCard.innerHTML = '';

    // Loop through products for the current page and display them
    for (let i = startIndex; i < endIndex && i < filteredProducts.length; i++) {
      const product = filteredProducts[i];

      // Create a makeup card
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      // Create an image element
      const productImage = document.createElement('img');
      productImage.src = product.image_link;
      productImage.alt = 'Makeup Product Image';

      // Create product details
      const productName = document.createElement('p');
      productName.innerHTML = `<strong>Product Name:</strong> ${product.name}`;

      const productBrand = document.createElement('p');
      productBrand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

      const productType = document.createElement('p');
      productType.innerHTML = `<strong>Type:</strong> ${product.product_type}`;

      const productPrice = document.createElement('p');
      productPrice.innerHTML = `<strong>Price:</strong> $${product.price}`;

      // Append elements to the product card
      productCard.appendChild(productImage);
      productCard.appendChild(productName);
      productCard.appendChild(productBrand);
      productCard.appendChild(productType);
      productCard.appendChild(productPrice);

      // Append the product card to the makeup card container
      makeupCard.appendChild(productCard);
    }
    // Update pagination
    updatePagination();
  }

  // Function to update pagination buttons
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Show/hide previous page button
    if (currentPage === 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
    }

    // Show/hide next page button
    if (currentPage === totalPages) {
      nextPageBtn.disabled = true;
    } else {
      nextPageBtn.disabled = false;
    }

    // Update the current page number in the pagination span
    paginationContainer.querySelector('span').textContent = currentPage;
  }
  // Event listener for the search button
  searchBtn.addEventListener('click', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter products based on the search term
    filteredProducts = searchTerm
       ?filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      :data;

    currentPage = 1; // Reset to the first page
    displayProducts(currentPage);
  });

  // Event listener for previous page button
  prevPageBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(currentPage);
    }
  });
// Event listener for next page button
nextPageBtn.addEventListener('click', function () {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentPage);
  }
});

// Initial fetch and display products
fetchAndDisplayProducts();
});
