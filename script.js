// Carrossel automático principal
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let currentIndex = 0;

function moveSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(moveSlide, 4000); // Troca automática a cada 4 segundos

// Modal de produto
const modal = document.getElementById('product-modal');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalQuantity = document.getElementById('modal-quantity');
const modalAddBtn = document.getElementById('modal-add-to-cart');
const modalCloseBtn = document.querySelector('.modal-close');

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('click', () => {
    modalName.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.desc;
    modalPrice.textContent = card.dataset.price;
    modalQuantity.value = 1;
    modal.classList.remove('hidden');
  });
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Carrinho lateral
const cartSidebar = document.getElementById('cart-sidebar');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');

let cartItems = [];

function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      ${item.name} x${item.quantity} - R$ ${ (item.price * item.quantity).toFixed(2) }
      <button data-index="${index}" class="remove-item">&times;</button>
    `;
    cartItemsList.appendChild(li);
  });
  cartTotalDisplay.textContent = total.toFixed(2);

  // Remove item event
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      cartItems.splice(idx, 1);
      updateCart();
    });
  });
}

cartCloseBtn.addEventListener('click', () => {
  cartSidebar.classList.add('hidden');
});

modalAddBtn.addEventListener('click', () => {
  const name = modalName.textContent;
  const desc = modalDesc.textContent;
  const price = parseFloat(modalPrice.textContent);
  const quantity = parseInt(modalQuantity.value);

  const existingIndex = cartItems.findIndex(item => item.name === name);
  if (existingIndex >= 0) {
    cartItems[existingIndex].quantity += quantity;
  } else {
    cartItems.push({ name, desc, price, quantity });
  }
  updateCart();
  modal.classList.add('hidden');
  cartSidebar.classList.remove('hidden');
});

// Mostrar categoria clicada em destaque e maior
const categoriesLinks = document.querySelectorAll('.categories a');
const categorySections = document.querySelectorAll('.category-section');

categoriesLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    categorySections.forEach(section => {
      if (section.id === targetId) {
        section.style.display = 'flex';
        section.style.flexWrap = 'wrap';
        section.style.justifyContent = 'flex-start';
        section.style.marginTop = '60px';
        section.style.width = '100%';
        section.style.maxWidth = '1200px';
      } else {
        section.style.display = 'none';
      }
    });
    window.scrollTo({
      top: document.getElementById(targetId).offsetTop - 70,
      behavior: 'smooth',
    });
  });
});

// Mostrar todas as categorias novamente ao clicar no logo
const logoLink = document.querySelector('header a');

logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  categorySections.forEach(section => {
    section.style.display = 'flex';
    section.style.flexWrap = 'wrap';
    section.style.justifyContent = 'flex-start';
    section.style.marginTop = '20px';
    section.style.width = '100%';
    section.style.maxWidth = '1200px';
  });
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
