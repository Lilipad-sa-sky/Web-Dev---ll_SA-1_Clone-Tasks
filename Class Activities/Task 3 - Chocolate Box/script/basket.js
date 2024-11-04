// Add event listener to the add buttons
document.addEventListener('DOMContentLoaded', () => {
  const cartPopup = document.getElementById('cart-popup');
  const cartList = document.getElementById('cart-list');
  const totalElement = document.getElementById('total');
  const closeBtn = document.getElementById('close-btn');
  const cartIcon = document.querySelector('.fa-cart-shopping');

  let cart = [];

  // Function to add an item to the cart
  function addItemToCart(item) {
    const itemName = item.querySelector('h2').textContent;
    const itemPrice = item.querySelector('p').textContent.replace('$', '');
    const itemQuantity = 1;

    const cartItem = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity
    };

    cart.push(cartItem);
    updateCartList();
    updateTotalCounter();
  }

  // Function to update the cart list
  //i hate functions
  function updateCartList() {
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <span>${item.name}</span>
          <span>x${item.quantity}</span>
          <span>$${item.price}</span>
          <button class="remove-btn">Remove</button>
      `;
      cartList.appendChild(listItem);

      // Add event listener to the remove button
      listItem.querySelector('.remove-btn').addEventListener('click', () => {
        cart.splice(index, 1);
        updateCartList();
        updateTotalCounter();
      });
    });
  }

  // Function to update the total counter
  function updateTotalCounter() {
    const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Add event listener to the add buttons
  document.querySelectorAll('.add').forEach((addButton) => {
    addButton.addEventListener('click', () => {
      const item = addButton.closest('.item');
      addItemToCart(item);
    });
  });

  // Toggle cart popup visibility
  cartIcon.addEventListener('click', (e) => {
    e.stopPropagation();  // Prevent the event from bubbling up to the body
    cartPopup.classList.toggle('show');  // Toggle the .show class to display/hide
  });

  // Close popup when the button is clicked 
  closeBtn.addEventListener('click', () => {
    console.log('Close button clicked');  // Debugging log
    cartPopup.classList.remove('show');  // Hide the popup
  });

  // Close the cart popup when clicking outside of the no no square
  document.body.addEventListener('click', (e) => {
    // Check if the click was outside the cart popup or the cart icon
    if (!cartPopup.contains(e.target) && e.target.closest('.fa-cart-shopping') === null) {
      cartPopup.classList.remove('show');  // Hide the popup
    }
  });

  // Prevent the popup from closing when clicking inside it
  cartPopup.addEventListener('click', (e) => {
    e.stopPropagation();  
  });
});
//the end 
// i hate javascript