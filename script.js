const products = [
  { id: 1, name: "Ladies tranies", price: 400 },
  { id: 2, name: "Men casual shoes", price: 600 },
  { id: 3, name: "Ladies casual shoes", price: 500 },
  { id: 4, name: "Shinny One", price: 400 },
  { id: 5, name: "Almost Allstar", price: 650 },
  { id: 6, name: "Almost Yeezy", price: 900 },
];

// Function to populate the products on the products.html page
function populateProducts() {
  const productsSection = document.getElementById("products");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-card";

    productDiv.innerHTML = `
        <img src="images/product${product.id}.jpg" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>M${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

    productsSection.appendChild(productDiv);
  });
}

// Call the function to populate products when the page loads
window.onload = function () {
  populateProducts();
};

let cart = [];

function addToCart(productId) {
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const product = products.splice(productIndex, 1)[0];
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(productId) {
  const cartIndex = cart.findIndex((item) => item.id === productId);

  if (cartIndex !== -1) {
    const removedItem = cart.splice(cartIndex, 1)[0];
    products.push(removedItem);
    updateCart();
  }
}

function updateCart() {
  const cartItemsElement = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  // Update cart display
  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - M${item.price.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item.id);
    listItem.appendChild(removeButton);
    cartItemsElement.appendChild(listItem);

    total += item.price;
  });

  // Update total price
  cartTotalElement.textContent = total.toFixed(2);

  // Show/hide the modal based on the cart items
  const modal = document.getElementById("cartModal");
  const overlay = document.getElementById("overlay");

  if (cart.length > 0) {
    // Show the modal
    modal.style.display = "block";
    overlay.style.display = "none";
  } else {
    // Hide the modal
    modal.style.display = "none";
    overlay.style.display = "none";
  }
}

function closeModal() {
  // Hide the modal
  const modal = document.getElementById("cartModal");
  const overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
}

let modalDisplayed = false;

function openPayPalModal() {
  if (!modalDisplayed) {
    // Show the modal and overlay
    document.getElementById("paypalModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    // Render the PayPal button and options
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "1.00",
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            closePayPalModal();
          });
        },
      })
      .render("#paypal-button-container");

    modalDisplayed = true;
  }
}

function closePayPalModal() {
  // Hide the modal and overlay
  document.getElementById("paypalModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );

  displayProducts(filteredProducts);
}

function sortProducts(option) {
  let sortedProducts;

  switch (option) {
    case "nameAsc":
      sortedProducts = products
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      sortedProducts = products
        .slice()
        .sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceAsc":
      sortedProducts = products.slice().sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      sortedProducts = products.slice().sort((a, b) => b.price - a.price);
      break;
    default:
      sortedProducts = products;
  }

  displayProducts(sortedProducts);
}

function displayProducts(productsToDisplay) {
  const productsSection = document.getElementById("products");
  productsSection.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-card";

    productDiv.innerHTML = `
        <img src="images/product${product.id}.jpg" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>M${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

    productsSection.appendChild(productDiv);
  });
}

function openUserModal() {
  // Show the user modal and overlay
  document.getElementById("userModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeUserModal() {
  // Hide the user modal and overlay
  document.getElementById("userModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  // Send registration data to the server

  const response = { message: "Registration successful." };

  alert(response.message);
  closeUserModal();
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Send login data to the server

  const response = { message: "Login successful." };

  alert(response.message);
  closeUserModal();
}
