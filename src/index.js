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