// ── DATA ──
const booksData = [
    { id:1, title:"Мастер и Маргарита", author:"М. Булгаков", genre:"Классика", price:590, oldPrice:790, rating:4.9, reviews:1420, cover:"https://ir.ozone.ru/s3/multimedia-1-9/6950027457.jpg", badge:"Бестселлер", isNew:false },
    { id:2, title:"Преступление и наказание", author:"Ф. Достоевский", genre:"Классика", price:450, oldPrice:null, rating:4.8, reviews:980, cover:"https://avatars.mds.yandex.net/i?id=2ef4b5b2aa288a068e709d0626fe4a273889a1bb-4587230-images-thumbs&n=13", badge:null, isNew:false },
    { id:3, title:"Гарри Поттер и философский камень", author:"Дж. Роулинг", genre:"Фэнтези", price:780, oldPrice:990, rating:4.9, reviews:3200, cover:"https://basket-13.wbbasket.ru/vol1986/part198681/198681681/images/big/1.webp", badge:"Хит", isNew:false },
    { id:4, title:"Убийство в Восточном экспрессе", author:"А. Кристи", genre:"Детектив", price:520, oldPrice:null, rating:4.7, reviews:740, cover:"https://static10.labirint.ru/books/207132/cover.jpg", badge:null, isNew:false },
    { id:5, title:"Атомные привычки", author:"Джеймс Клир", genre:"Психология", price:680, oldPrice:850, rating:4.8, reviews:2100, cover:"https://avatars.mds.yandex.net/get-mpic/16317423/2a0000019a40d58547108558ce7e71b1e7b9/orig", badge:"sale", isNew:true },
    { id:6, title:"Сто лет одиночества", author:"Г. Маркес", genre:"Роман", price:610, oldPrice:null, rating:4.7, reviews:890, cover:"https://storage.yandexcloud.net/colorlon-prod/PICS/BBCC6D0C-8562-11EF-AD22-003048FBFCC9.jpg", badge:null, isNew:true },
    { id:7, title:"1984", author:"Дж. Оруэлл", genre:"Классика", price:390, oldPrice:490, rating:4.9, reviews:2800, cover:"https://avatars.mds.yandex.net/get-mpic/5254754/img_id2006889584684277330.jpeg/orig", badge:"Бестселлер", isNew:false },
    { id:8, title:"Думай медленно… решай быстро", author:"Д. Канеман", genre:"Психология", price:720, oldPrice:null, rating:4.6, reviews:560, cover:"https://catalog-cdn.detmir.st/media/GvQSRbgCeeC76R2tu00NO026DUApAegaXXBymlRl5Jc=.jpeg", badge:null, isNew:true },
    { id:9, title:"Шерлок Холмс", author:"А. К. Дойл", genre:"Детектив", price:480, oldPrice:600, rating:4.8, reviews:1100, cover:"https://avatars.mds.yandex.net/get-mpic/11549745/2a0000018d55166fa35b94a1d254c6943d28/orig", badge:"sale", isNew:false },
    { id:10, title:"Маленький принц", author:"А. Сент-Экзюпери", genre:"Классика", price:340, oldPrice:null, rating:4.9, reviews:3500, cover:"https://avatars.mds.yandex.net/get-mpic/16294320/2a0000019afb7bb6503d5122abfcedb05d0a/orig", badge:"Хит", isNew:false },
    { id:11, title:"Игра престолов", author:"Дж. Мартин", genre:"Фэнтези", price:890, oldPrice:1100, rating:4.8, reviews:1900, cover:"https://avatars.mds.yandex.net/get-mpic/18498696/2a0000019bde9cce6c187670807820520e17/orig", badge:null, isNew:false },
    { id:12, title:"Биография Стива Джобса", author:"У. Айзексон", genre:"Биография", price:750, oldPrice:950, rating:4.7, reviews:820, cover:"https://avatars.mds.yandex.net/get-mpic/4818396/img_id926748364707026810.jpeg/orig", badge:"Новинка", isNew:true },
];

let cart = [];
let wishlist = [];
let filteredBooks = [...booksData];
let currentPage = 1;
const booksPerPage = 8;

// ── RENDER BOOKS ──
function renderBooks() {
    const start = (currentPage - 1) * booksPerPage;
    const pageBooks = filteredBooks.slice(start, start + booksPerPage);
    const grid = document.getElementById('booksGrid');

    document.getElementById('booksCount').textContent = `Показано ${filteredBooks.length} книг`;

    grid.innerHTML = pageBooks.map(b => `
        <div class="book-card" onclick="event.stopPropagation()">
            <div class="book-cover">
                <img src="${b.cover}" alt="${b.title}" loading="lazy">
                ${b.badge ? `<span class="book-badge ${b.badge==='sale'?'sale':''}">${b.badge==='sale'?'Скидка':b.badge}</span>` : ''}
                <button class="wishlist-btn ${wishlist.includes(b.id)?'active':''}" onclick="toggleWishlist(${b.id},this)">
                    <i class="fa${wishlist.includes(b.id)?'s':'r'} fa-heart"></i>
                </button>
            </div>
            <div class="book-info">
                <div class="book-genre">${b.genre}</div>
                <div class="book-title">${b.title}</div>
                <div class="book-author">${b.author}</div>
                <div class="book-rating">
                    <span class="stars">${'★'.repeat(Math.round(b.rating))}${'☆'.repeat(5-Math.round(b.rating))}</span>
                    <span class="rating-count">${b.rating} (${b.reviews})</span>
                </div>
                <div class="book-footer">
                    <div>
                        <div class="book-price">${b.price} ₽</div>
                        ${b.oldPrice ? `<div class="book-price-old">${b.oldPrice} ₽</div>` : ''}
                    </div>
                    <button class="btn-cart ${cart.find(c=>c.id===b.id)?'added':''}" onclick="addToCart(${b.id},this)">
                        <i class="fas fa-${cart.find(c=>c.id===b.id)?'check':'cart-plus'}"></i>
                        ${cart.find(c=>c.id===b.id)?'В корзине':'В корзину'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const total = Math.ceil(filteredBooks.length / booksPerPage);
    const pg = document.getElementById('pagination');
    if (total <= 1) { pg.innerHTML = ''; return; }
    pg.innerHTML = Array.from({length: total}, (_,i) =>
        `<button class="page-btn ${i+1===currentPage?'active':''}" onclick="goPage(${i+1})">${i+1}</button>`
    ).join('');
}

function goPage(n) { currentPage = n; renderBooks(); window.scrollTo({top: document.getElementById('catalog').offsetTop - 80, behavior:'smooth'}); }

// ── FILTERS ──
function applyFilters() {
    const genre = document.getElementById('filterGenre').value;
    const maxPrice = parseInt(document.getElementById('filterPrice').value);
    const sort = document.getElementById('filterSort').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    filteredBooks = booksData.filter(b => {
        if (genre && b.genre !== genre) return false;
        if (b.price > maxPrice) return false;
        if (search && !b.title.toLowerCase().includes(search) && !b.author.toLowerCase().includes(search)) return false;
        return true;
    });

    if (sort === 'price-asc') filteredBooks.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') filteredBooks.sort((a,b) => b.price - a.price);
    else if (sort === 'new') filteredBooks.sort((a,b) => b.isNew - a.isNew);
    else filteredBooks.sort((a,b) => b.reviews - a.reviews);

    currentPage = 1;
    renderBooks();
}

function resetFilters() {
    document.getElementById('filterGenre').value = '';
    document.getElementById('filterPrice').value = 2000;
    document.getElementById('filterSort').value = 'popular';
    document.getElementById('searchInput').value = '';
    updatePrice(2000);
    filteredBooks = [...booksData];
    currentPage = 1;
    renderBooks();
}

function updatePrice(v) { document.getElementById('priceLabel').textContent = v + ' ₽'; }

document.getElementById('searchInput').addEventListener('input', applyFilters);

// ── CART ──
function addToCart(id, btn) {
    const book = booksData.find(b => b.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) { existing.qty++; }
    else { cart.push({...book, qty: 1}); }
    updateCartBadge();
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> В корзине';
    showToast(`«${book.title}» добавлена в корзину`);
}

function updateCartBadge() {
    const total = cart.reduce((s,c) => s + c.qty, 0);
    document.getElementById('cartBadge').textContent = total;
}

function openCart(e) { e.preventDefault(); renderCart(); document.getElementById('cartModal').classList.add('open'); }
function closeCart() { document.getElementById('cartModal').classList.remove('open'); }

function renderCart() {
    const el = document.getElementById('cartContent');
    if (!cart.length) {
        el.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Корзина пуста</p></div>`;
        return;
    }
    const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
    const delivery = total >= 1000 ? 0 : 299;
    el.innerHTML = `
        ${cart.map(c => `
        <div class="cart-item">
            <img src="${c.cover}" alt="${c.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${c.title}</div>
                <div class="cart-item-author">${c.author}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
                    <span class="qty">${c.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.8rem">
                <div class="cart-item-price">${c.price * c.qty} ₽</div>
                <button class="remove-item" onclick="removeFromCart(${c.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>`).join('')}
        <div class="cart-total">
            <div class="cart-total-row"><span>Товары (${cart.reduce((s,c)=>s+c.qty,0)} шт.)</span><span>${total} ₽</span></div>
            <div class="cart-total-row"><span>Доставка</span><span>${delivery === 0 ? '<span style="color:var(--green)">Бесплатно</span>' : delivery + ' ₽'}</span></div>
            <div class="cart-total-row cart-total-final"><span>Итого</span><span>${total + delivery} ₽</span></div>
        </div>
        <button class="btn btn-primary btn-checkout" onclick="closeCart();openOrder()">Оформить заказ</button>
        ${total < 1000 ? `<p style="text-align:center;font-size:1.2rem;color:var(--text-light);margin-top:1rem">До бесплатной доставки: ${1000-total} ₽</p>` : ''}
    `;
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    updateCartBadge();
    renderCart();
    renderBooks();
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartBadge();
    renderCart();
    renderBooks();
}

// ── WISHLIST ──
function toggleWishlist(id, btn) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(w => w !== id);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        wishlist.push(id);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        showToast('Добавлено в избранное');
    }
}

// ── ORDER ──
function openOrder() { document.getElementById('orderModal').classList.add('open'); }
function closeOrder() { document.getElementById('orderModal').classList.remove('open'); }

document.querySelectorAll('input[name="delivery"]').forEach(r => {
    r.addEventListener('change', () => {
        document.getElementById('addressGroup').style.display = r.value === 'pickup' ? 'none' : 'block';
    });
});

function submitOrder() {
    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    if (!name || !phone || !email) { showToast('Пожалуйста, заполните все обязательные поля'); return; }
    closeOrder();
    cart = [];
    updateCartBadge();
    renderBooks();
    document.getElementById('successOverlay').classList.add('open');
}

function closeSuccess() { document.getElementById('successOverlay').classList.remove('open'); }

// ── AUTH ──
function openAuth(e) { e.preventDefault(); document.getElementById('authModal').classList.add('open'); }
function closeAuth() { document.getElementById('authModal').classList.remove('open'); }
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
    document.getElementById('loginForm').classList.toggle('active', tab==='login');
    document.getElementById('registerForm').classList.toggle('active', tab==='register');
}
function loginUser() { closeAuth(); showToast('Вы успешно вошли в аккаунт!'); }
function registerUser() { closeAuth(); showToast('Аккаунт создан! Добро пожаловать!'); }

// ── MOBILE MENU ──
function toggleMenu() { document.getElementById('navbar').classList.toggle('open'); }

// ── TOAST ──
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ── CLOSE MODALS ON OVERLAY CLICK ──
document.getElementById('cartModal').addEventListener('click', e => { if(e.target===e.currentTarget) closeCart(); });
document.getElementById('orderModal').addEventListener('click', e => { if(e.target===e.currentTarget) closeOrder(); });
document.getElementById('authModal').addEventListener('click', e => { if(e.target===e.currentTarget) closeAuth(); });
document.getElementById('successOverlay').addEventListener('click', e => { if(e.target===e.currentTarget) closeSuccess(); });

// ── INIT ──
renderBooks();
