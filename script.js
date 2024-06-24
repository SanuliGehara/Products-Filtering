const products = [
    {
        name: 'Sony Playstation 5',
        url: 'https://i.ibb.co/zHmZnWx/playstation-5.png',
        category: 'games',
        price: 499.99,
    },
    {
        name: 'Samsung Galaxy',
        url: 'https://i.ibb.co/rFFMDH7/samsung-galaxy.png',
        category: 'smartphones',
        price: 399.99,
    },
    {
        name: 'Cannon EOS Camera',
        url: 'https://i.ibb.co/mhm1hLq/cannon-eos-camera.png',
        category: 'cameras',
        price: 749.99,
    },
    {
        name: 'Sony A7 Camera',
        url: 'https://i.ibb.co/LS9TDLN/sony-a7-camera.png',
        category: 'cameras',
        price: 1999.99,
    },
    {
        name: 'LG TV',
        url: 'https://i.ibb.co/QHgFnHk/lg-tv.png',
        category: 'televisions',
        price: 799.99,
    },
    {
        name: 'Nintendo Switch',
        url: 'https://i.ibb.co/L0L9SdG/nintendo-switch.png',
        category: 'games',
        price: 299.99,
    },
    {
        name: 'Xbox Series X',
        url: 'https://i.ibb.co/C8rBVdT/xbox-series-x.png',
        category: 'games',
        price: 499.99,
    },
    {
        name: 'Samsung TV',
        url: 'https://i.ibb.co/Pj1nm4B/samsung-tv.png',
        category: 'televisions',
        price: 1099.99,
    },
    {
        name: 'Google Pixel',
        url: 'https://i.ibb.co/5F58zmH/google-pixel.png',
        category: 'smartphones',
        price: 499.99,
    },
    {
        name: 'Sony ZV1F Camera',
        url: 'https://i.ibb.co/5Wy3RZ9/sony-zv1f-camera.png',
        category: 'cameras',
        price: 799.99,
    },
    {
        name: 'Toshiba TV',
        url: 'https://i.ibb.co/FxM6rXq/toshiba-tv.png',
        category: 'televisions',
        price: 499.99,
    },
    {
        name: 'iPhone 14',
        url: 'https://i.ibb.co/5vc7J6s/iphone-14.png',
        category: 'smartphones',
        price: 999.99,
    },
];

// Select DOM Elements
const productsWrapper = document.getElementById('product-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

// Initialize cart item count
let cartItemCount = 0;

// Initialize product element array
const productElements = [];

// Event Listener for filtering
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Loop over products and create an element
products.forEach((product) => {
    // Create an element for each product
    const productElement = createProductElement(product);

    productElements.push(productElement);  // Adding product ELement to the array
    productsWrapper.appendChild(productElement);  // Adding product to the DOM
});

// Create product element
function createProductElement(product) {
    const productElement = document.createElement('div');
    
    productElement.className = 'item space-y2';
    productElement.innerHTML = `
        <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
            <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover">
            <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transision group-hover:translate-y-0">
                    Add To Cart
                    </button>
        </div>
        <p class="text-xl">${product.name}</p>
        <strong>$${product.price.toLocaleString()}</strong>
    `;

    productElement.querySelector('.status').addEventListener('click', updateCart);

    return productElement;
}

// Add or remove an item from cart
function updateCart(e) {
    const statusElement = e.target;

    if (statusElement.classList.contains('added')) {
        // Remove from cart
        statusElement.classList.remove('added');  
        statusElement.innerText = 'Add To Cart';  // change the text inside the button
        statusElement.classList.remove('bg-red-600'); // remove current color
        statusElement.classList.add('bg-gray-800');  // add gray color

        cartItemCount--;
    } else {
        // Add to cart
        statusElement.classList.add('added');  // add new class to classList
        statusElement.innerText = 'Remove From Cart';  // change the text inside the button
        statusElement.classList.remove('bg-gray-800'); // remove current color
        statusElement.classList.add('bg-red-600');  // add red color

        cartItemCount++;
    }

    // Update cart Item Count
    cartCount.innerText = cartItemCount.toString();
}

// Filter products by checkboxes and search input
function filterProducts() {
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Get checked categories
    const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id)

    // Loop over products and check for matches
    productElements.forEach((productElement, index) => {
        const product = products[index];

        // Check to see if th e product matches the search or chcecked categories
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
        const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

        // Show or hide the product based on the matches
        if (matchesSearchTerm && isInCheckedCategory) {
            productElement.classList.remove('hidden');
        } else {
            productElement.classList.add('hidden');
        }
    })
}