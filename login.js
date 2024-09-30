let loginModalBtn = document.getElementById("login-modal");
let signupModal = document.getElementById("signup-modal");
let closeSignupModal = document.getElementById("close-signup-modal");
let signinModal = document.getElementById("signin-modal");
let closeSigninModal = document.getElementById("close-signin-modal");
let goToLoginLink = document.getElementById("go-to-login");
let goBackSignupLink = document.getElementById("go-back-signup");
let form_data = document.getElementById("signup-form");
let loginForm = document.getElementById("login-form");


// Open the signup modal when login button is clicked

loginModalBtn.addEventListener("click", () => {
    signupModal.style.display = "block";
});

// Close the signup modal

closeSignupModal.addEventListener("click", () => {
    signupModal.style.display = "none";
});

// Open the sign in modal when Already have an account Sign in is clicked

goToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.style.display = "none";
    signinModal.style.display = "block";
});

// Close the signin modal

closeSigninModal.addEventListener("click", () => {
    signinModal.style.display = "none";
});

// Switch back to signup modal when "Don't have an account? Sign up" is clicked

goBackSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    signinModal.style.display = "none";
    signupModal.style.display = "block";
});

// Save data in local storage and show signin modal

form_data.addEventListener("submit", (e) => {
    e.preventDefault();
    let userName = document.getElementById("name").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (userName === "" || userEmail === "" || password === "") {
        alert("Please Fill The Form Completely !");
    } else {
        localStorage.setItem("Name", userName);
        localStorage.setItem("Email", userEmail);
        localStorage.setItem("Password", password);
        signupModal.style.display = "none";
        signinModal.style.display = "block";
        alert("Signup Successfully !");
    }
});

// login Form getting data from localStorage

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();
    let userEmail = document.getElementById("email-signin").value.trim();
    let password = document.getElementById("password-signin").value.trim();

    let localName = localStorage.getItem("Email");
    let localPassword = localStorage.getItem("Password");

    if (userEmail === localName && password === localPassword) {
        alert("Welcome To Home My Boy !");
        signinModal.style.display = "none";
    }
    else {
        alert("User Not Found");


    }
});

// Shopping cart function
let cart = [];

// Function to display the cart items
function displayCart() {
    const items = document.getElementById("list-items");
    items.innerHTML = ""; 
    let total = 0;

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "Your cart is empty.";
        emptyMessage.className = "empty-message"; // Added class for styling
        items.appendChild(emptyMessage);
        document.querySelector(".button-container").style.display = "none"; // Hide buttons
    } else {
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.className = "cart-item";

            const namePriceContainer = document.createElement("div");
            namePriceContainer.className = "name-price-container";

            const itemName = document.createElement("span");
            itemName.className = "item-name";
            itemName.textContent = item.name;

            const quantityContainer = document.createElement("div");
            quantityContainer.className = "quantity-container";

            const minusButton = document.createElement("button");
            minusButton.textContent = "-";
            minusButton.className = "quantity-button";
            minusButton.onclick = () => updateQuantity(index, -1);

            const quantityDisplay = document.createElement("span");
            quantityDisplay.className = "quantity-display";
            quantityDisplay.textContent = item.quantity;

            const plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.className = "quantity-button";
            plusButton.onclick = () => updateQuantity(index, 1);

            quantityContainer.appendChild(minusButton);
            quantityContainer.appendChild(quantityDisplay);
            quantityContainer.appendChild(plusButton);

            const itemPrice = document.createElement("span");
            itemPrice.className = "item-price";
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            namePriceContainer.appendChild(itemName);
            namePriceContainer.appendChild(quantityContainer);
            namePriceContainer.appendChild(itemPrice);
            listItem.appendChild(namePriceContainer);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "remove-button";
            removeButton.onclick = () => removeFromCart(index);

            listItem.appendChild(removeButton);
            items.appendChild(listItem);

            total += item.price * item.quantity; // Update total
        });

        const totalItem = document.createElement("li");
        totalItem.className = "total-bill";
        totalItem.textContent = `Total: $${total.toFixed(2)}`;
        items.appendChild(totalItem);

        document.querySelector(".button-container").style.display = "flex"; // Show buttons
    }

    document.getElementById("total-amount").textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(index, delta) {
    if (delta === 1) {
        cart[index].quantity++;
    } else if (delta === -1 && cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    displayCart();
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    displayCart();
    showPopup();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function handleCheckout() {
    alert("Proceeding to checkout...");
}

function handleCancel() {
    alert("Cart cancelled. Returning to shopping.");
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

// Example of adding event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-cart-button").forEach(button => {
    button.addEventListener("click", function() {
        const card = button.closest('.card-body');
        const productName = card.querySelector('.card-title').textContent;
        const priceText = card.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', '').trim());

        addToCart(productName, price);
    });
});


