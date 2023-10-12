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