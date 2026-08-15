// Luma — interacciones de catálogo

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  const searchInput = document.getElementById('searchInput');
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.product-card');
  let activeFilter = 'todos';

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const matchesFilter = activeFilter === 'todos' || card.dataset.category === activeFilter;
      const matchesQuery = card.dataset.name.toLowerCase().includes(query);
      card.style.display = (matchesFilter && matchesQuery) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilters);

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  const WHATSAPP_NUMBER = '573000000000';
  const cart = {};
  const cartCountEl = document.getElementById('cartCount');
  const cartModal = document.getElementById('cartModal');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartTotalRow = document.getElementById('cartTotalRow');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCheckoutEl = document.getElementById('cartCheckout');

  function formatCOP(n) { return '$' + n.toLocaleString('es-CO'); }

  function renderCart() {
    const items = Object.values(cart);
    const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalCount;

    cartItemsEl.innerHTML = '';
    if (items.length === 0) {
      cartEmptyEl.style.display = '';
      cartTotalRow.style.display = 'none';
      cartCheckoutEl.style.display = 'none';
      return;
    }

    cartEmptyEl.style.display = 'none';
    cartTotalRow.style.display = 'flex';
    cartCheckoutEl.style.display = 'flex';

    let total = 0;
    let message = 'Hola, quiero hacer este pedido:%0A';

    items.forEach(item => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      message += `- ${item.name} x${item.qty} (${formatCOP(subtotal)})%0A`;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${item.id}" aria-label="Quitar uno">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${item.id}" aria-label="Agregar uno">+</button>
        </div>
        <span class="cart-item-price">${formatCOP(subtotal)}</span>
      `;
      cartItemsEl.appendChild(row);
    });

    message += `%0ATotal: ${formatCOP(total)}`;
    cartTotalEl.textContent = formatCOP(total);
    cartCheckoutEl.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }

  function addToCart(id, name, price) {
    if (!cart[id]) cart[id] = { id, name, price, qty: 0 };
    cart[id].qty++;
    renderCart();
  }

  cartItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'inc') cart[id].qty++;
    if (btn.dataset.action === 'dec') {
      cart[id].qty--;
      if (cart[id].qty <= 0) delete cart[id];
    }
    renderCart();
  });

  document.querySelectorAll('.product-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      addToCart(card.dataset.name, card.dataset.name, parseInt(card.dataset.price, 10));
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = '+'; }, 800);
    });
  });

  function openCart() { cartModal.classList.add('open'); }
  function closeCart() { cartModal.classList.remove('open'); }

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('floatCartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartModal.addEventListener('click', (e) => { if (e.target === cartModal) closeCart(); });

  renderCart();
});
