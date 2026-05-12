/* =====================
   공통 앱 유틸리티
   ===================== */

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderHeader();
  if (typeof onPageReady === 'function') onPageReady();
});

/* ===== HEADER RENDER ===== */
function renderHeader() {
  const user = getUser();
  const nav = document.getElementById('header-nav');
  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <a href="write.html" class="btn btn-primary btn-round btn-sm">
        <span>+</span> 판매하기
      </a>
      <a href="mypage.html" class="header-nav-link">
        <span class="avatar-sm">${user.emoji || '👤'}</span>
        <span>${user.name}</span>
      </a>
      <button class="btn btn-gray btn-sm btn-round" onclick="handleLogout()">로그아웃</button>
    `;
  } else {
    nav.innerHTML = `
      <a href="write.html" class="btn btn-outline btn-round btn-sm">
        <span>+</span> 판매하기
      </a>
      <a href="login.html" class="btn btn-primary btn-round btn-sm">로그인</a>
    `;
  }
}

function handleLogout() {
  logout();
  showToast('로그아웃되었습니다.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 800);
}

/* ===== AUTH GUARD ===== */
function requireAuth(redirect = 'login.html') {
  const user = getUser();
  if (!user) {
    sessionStorage.setItem('dg_redirect', window.location.href);
    window.location.href = redirect;
    return false;
  }
  return true;
}

/* ===== TOAST ===== */
function showToast(message, duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ===== MODAL ===== */
function showModal(title, desc, confirmText, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-desc">${desc}</div>
      <div class="modal-actions">
        <button class="btn btn-gray btn-full" id="modal-cancel">취소</button>
        <button class="btn btn-primary btn-full" id="modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));

  overlay.querySelector('#modal-cancel').addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 200);
  });
  overlay.querySelector('#modal-confirm').addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 200);
    onConfirm();
  });
}

/* ===== PRODUCT CARD ===== */
function createProductCard(product, viewMode = 'grid') {
  const liked = isLiked(product.id);
  const isGrid = viewMode === 'grid';

  return `
    <div class="product-card" data-id="${product.id}" onclick="goToDetail(${product.id})">
      <div class="product-thumb" style="background: ${product.color || '#F4F4F4'}">
        <span style="font-size: ${isGrid ? '52px' : '42px'}">${product.emoji}</span>
        ${product.status !== '판매중' ? `<div class="product-status-badge ${product.status === '거래완료' ? 'sold' : 'reserved'}">${product.status}</div>` : ''}
        <button class="like-btn ${liked ? 'liked' : ''}" onclick="handleLike(event, ${product.id})" title="찜하기">
          ${liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price ${product.price === 0 ? 'free' : ''}">${formatPrice(product.price)}</div>
        <div class="product-meta">
          <span>${product.location}</span>
          <span class="dot">·</span>
          <span>${timeAgo(product.createdAt)}</span>
          ${product.likes > 0 ? `<span class="product-likes">❤️ ${product.likes}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

function handleLike(e, productId) {
  e.stopPropagation();
  const user = getUser();
  if (!user) {
    showToast('찜하기는 로그인 후 이용하세요.');
    return;
  }
  const liked = toggleLike(productId);
  const btn = e.currentTarget;
  btn.textContent = liked ? '❤️' : '🤍';
  btn.classList.toggle('liked', liked);
  showToast(liked ? '찜 목록에 추가했습니다.' : '찜 목록에서 제거했습니다.');

  // Update count in UI if visible
  const card = btn.closest('.product-card');
  if (card) {
    const product = getProductById(productId);
    const meta = card.querySelector('.product-meta');
    let likeEl = meta.querySelector('.product-likes');
    if (product && product.likes > 0) {
      if (!likeEl) {
        likeEl = document.createElement('span');
        likeEl.className = 'product-likes';
        meta.appendChild(likeEl);
      }
      likeEl.textContent = `❤️ ${product.likes}`;
    } else if (likeEl) likeEl.remove();
  }
}

/* ===== SEARCH ===== */
function setupSearch(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) window.location.href = `index.html?q=${encodeURIComponent(q)}`;
    }
  });
  // Pre-fill from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('q')) input.value = params.get('q');
}

/* ===== URL PARAMS ===== */
function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ===== NUMBER FORMAT ===== */
function formatNumber(n) {
  return n?.toLocaleString('ko-KR') || '0';
}
