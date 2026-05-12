/* =====================
   당근마켓 샘플 데이터 & 스토리지 관리
   ===================== */

const CATEGORIES = [
  { id: 'digital', name: '디지털기기', emoji: '📱', count: 4 },
  { id: 'appliance', name: '생활가전', emoji: '🏠', count: 3 },
  { id: 'furniture', name: '가구/인테리어', emoji: '🛋️', count: 3 },
  { id: 'clothing', name: '의류/잡화', emoji: '👗', count: 3 },
  { id: 'book', name: '도서/음반', emoji: '📚', count: 2 },
  { id: 'sports', name: '스포츠/레저', emoji: '⚽', count: 2 },
  { id: 'hobby', name: '취미/게임/음반', emoji: '🎮', count: 2 },
  { id: 'beauty', name: '뷰티/미용', emoji: '💄', count: 1 },
  { id: 'pet', name: '반려동물용품', emoji: '🐾', count: 1 },
  { id: 'plant', name: '식물', emoji: '🌱', count: 1 },
  { id: 'etc', name: '기타', emoji: '📦', count: 2 },
];

const REGIONS = ['서울 강남구', '서울 마포구', '서울 송파구', '경기 성남시', '경기 용인시', '부산 해운대구'];

const POPULAR_KEYWORDS = ['아이폰', '맥북', '에어팟', '나이키', '자전거', '소파', '책상', '카메라', '닌텐도', '향수'];

const CATEGORY_COLORS = {
  digital: '#E8F4FD', appliance: '#F0F8EE', furniture: '#FDF4E8',
  clothing: '#FDF0F8', book: '#F4F8E8', sports: '#EEF4FD',
  hobby: '#F4EEF8', beauty: '#FDF0F4', pet: '#FDF8EE', plant: '#EEFDF4', etc: '#F4F4F4'
};

const INITIAL_PRODUCTS = [
  {
    id: 1, title: '아이폰 14 Pro 256GB 딥퍼플', price: 850000,
    category: 'digital', categoryName: '디지털기기', emoji: '📱',
    location: '서울 강남구', region: '서울 강남구',
    description: '아이폰 14 Pro 256GB 딥퍼플 판매합니다.\n\n사용감 거의 없고 케이스 씌워서 사용했습니다.\n배터리 94% 유지 중이에요.\n\n구성: 본체, 충전기, 케이블 포함\n애플케어+ 내년까지 적용됩니다.\n\n급하게 13인치 맥북 구매 자금 마련 때문에 판매합니다.\n직거래 우선, 택배 거래 시 착불입니다.',
    status: '판매중', likes: 24, views: 187, chatCount: 8,
    seller: { name: '당근이', emoji: '🙂', region: '서울 강남구', temp: 42.3, sellCount: 12, buyCount: 5 },
    images: ['📱', '📱', '📱'], color: '#E8F4FD', createdAt: '2026-05-11T09:30:00'
  },
  {
    id: 2, title: '맥북 에어 M2 스페이스그레이 256GB', price: 1150000,
    category: 'digital', categoryName: '디지털기기', emoji: '💻',
    location: '서울 마포구', region: '서울 마포구',
    description: '맥북 에어 M2 스페이스그레이 256GB 판매합니다.\n\n2022년 구입, 현재 매우 깔끔한 상태입니다.\n스크래치 전혀 없으며 풀박스 포함입니다.\n\n업그레이드로 인해 판매하게 됐습니다.\n직거래 선호하나 택배도 가능합니다.',
    status: '판매중', likes: 18, views: 143, chatCount: 5,
    seller: { name: '별하', emoji: '⭐', region: '서울 마포구', temp: 38.1, sellCount: 7, buyCount: 3 },
    images: ['💻', '💻'], color: '#E8F4FD', createdAt: '2026-05-10T14:20:00'
  },
  {
    id: 3, title: '에어팟 프로 2세대 (MagSafe 충전케이스)', price: 220000,
    category: 'digital', categoryName: '디지털기기', emoji: '🎧',
    location: '서울 강남구', region: '서울 강남구',
    description: '에어팟 프로 2세대 판매합니다.\n\n6개월 사용했으며 상태 매우 좋습니다.\n노이즈 캔슬링 정상 작동, 배터리도 거의 새것 수준입니다.\n정품 박스 포함.\n\n가격 네고 불가합니다.',
    status: '예약중', likes: 31, views: 256, chatCount: 15,
    seller: { name: '노을', emoji: '🌅', region: '서울 강남구', temp: 45.7, sellCount: 20, buyCount: 8 },
    images: ['🎧', '🎧'], color: '#E8F4FD', createdAt: '2026-05-09T11:00:00'
  },
  {
    id: 4, title: '갤럭시 S24 울트라 256GB 티타늄블랙', price: 780000,
    category: 'digital', categoryName: '디지털기기', emoji: '📱',
    location: '경기 성남시', region: '경기 성남시',
    description: '갤럭시 S24 울트라 256GB 티타늄블랙입니다.\n\n구입한지 4개월 됐습니다.\n케이스, 강화유리 씌워 사용했습니다.\n S펜 정상 작동, 흠집 없는 상태입니다.\n\n판매 이유: 아이폰으로 기변 예정\n완충기, 케이블 함께 드립니다.',
    status: '판매중', likes: 12, views: 98, chatCount: 3,
    seller: { name: '빛나', emoji: '✨', region: '경기 성남시', temp: 36.5, sellCount: 4, buyCount: 9 },
    images: ['📱', '📱'], color: '#E8F4FD', createdAt: '2026-05-08T16:45:00'
  },
  {
    id: 5, title: '다이슨 에어랩 멀티스타일러 롱', price: 430000,
    category: 'appliance', categoryName: '생활가전', emoji: '💇',
    location: '서울 마포구', region: '서울 마포구',
    description: '다이슨 에어랩 멀티스타일러 롱 버전 판매합니다.\n\n작년에 구입하였으나 사용 빈도가 낮아 판매합니다.\n모든 어태치먼트 구성품 포함, 케이스도 드립니다.\n정상 작동이며 외관도 깨끗합니다.',
    status: '판매중', likes: 45, views: 312, chatCount: 22,
    seller: { name: '하늘', emoji: '☁️', region: '서울 마포구', temp: 41.2, sellCount: 16, buyCount: 11 },
    images: ['💇', '💇'], color: '#F0F8EE', createdAt: '2026-05-10T10:15:00'
  },
  {
    id: 6, title: '삼성 로봇청소기 비스포크 제트봇 콤보', price: 520000,
    category: 'appliance', categoryName: '생활가전', emoji: '🤖',
    location: '서울 송파구', region: '서울 송파구',
    description: '삼성 로봇청소기 비스포크 제트봇 콤보 판매합니다.\n\n1년 미만 사용, 상태 최상입니다.\n이사로 인해 판매하게 됐습니다.\n청소/물걸레 기능 모두 정상입니다.',
    status: '판매중', likes: 9, views: 78, chatCount: 2,
    seller: { name: '초록', emoji: '🌿', region: '서울 송파구', temp: 37.8, sellCount: 3, buyCount: 6 },
    images: ['🤖', '🤖'], color: '#F0F8EE', createdAt: '2026-05-07T13:30:00'
  },
  {
    id: 7, title: '이케아 칼락스 책장 4칸 (화이트)', price: 45000,
    category: 'furniture', categoryName: '가구/인테리어', emoji: '🗄️',
    location: '서울 강남구', region: '서울 강남구',
    description: '이케아 칼락스 책장 4칸 화이트입니다.\n\n2년 사용했으나 상태 깔끔합니다.\n이사 때문에 판매하며 직거래만 가능합니다.\n운반은 구매자께서 해주셔야 합니다.\n\n인서트 박스 2개 같이 드립니다.',
    status: '판매중', likes: 7, views: 55, chatCount: 4,
    seller: { name: '봄이', emoji: '🌸', region: '서울 강남구', temp: 39.4, sellCount: 9, buyCount: 14 },
    images: ['🗄️'], color: '#FDF4E8', createdAt: '2026-05-09T09:00:00'
  },
  {
    id: 8, title: '북유럽 원목 커피 테이블 (60x90cm)', price: 120000,
    category: 'furniture', categoryName: '가구/인테리어', emoji: '🛋️',
    location: '경기 용인시', region: '경기 용인시',
    description: '북유럽 스타일 원목 커피 테이블입니다.\n\n직접 구입한 것으로 오크 원목 재질입니다.\n사용감 있으나 스크래치 없고 탄탄합니다.\n60x90cm 크기로 투룸/원룸에 딱 맞아요.\n\n직거래만 가능합니다.',
    status: '판매중', likes: 15, views: 122, chatCount: 6,
    seller: { name: '단풍', emoji: '🍁', region: '경기 용인시', temp: 36.9, sellCount: 5, buyCount: 7 },
    images: ['🛋️', '🛋️'], color: '#FDF4E8', createdAt: '2026-05-08T15:00:00'
  },
  {
    id: 9, title: '나이키 에어맥스 270 270mm (새상품)', price: 78000,
    category: 'clothing', categoryName: '의류/잡화', emoji: '👟',
    location: '서울 마포구', region: '서울 마포구',
    description: '나이키 에어맥스 270 화이트/블랙 270mm 판매합니다.\n\n선물 받은 건데 사이즈가 맞지 않아 판매합니다.\n미착용 새상품이며 풀박스 포함입니다.\n정가 169,000원짜리입니다.',
    status: '판매중', likes: 33, views: 289, chatCount: 19,
    seller: { name: '여름', emoji: '☀️', region: '서울 마포구', temp: 43.6, sellCount: 28, buyCount: 12 },
    images: ['👟', '👟', '👟'], color: '#FDF0F8', createdAt: '2026-05-11T08:00:00'
  },
  {
    id: 10, title: '무인양품 린넨 셔츠 L사이즈 (화이트)', price: 25000,
    category: 'clothing', categoryName: '의류/잡화', emoji: '👕',
    location: '서울 송파구', region: '서울 송파구',
    description: '무인양품 린넨 셔츠 L사이즈 화이트입니다.\n\n두 번 착용했습니다. 세탁 후 판매합니다.\n품이 넉넉하고 여름에 시원하게 입기 좋아요.\n소재: 리넨 100%',
    status: '판매중', likes: 8, views: 64, chatCount: 3,
    seller: { name: '구름', emoji: '🌤️', region: '서울 송파구', temp: 38.2, sellCount: 6, buyCount: 4 },
    images: ['👕'], color: '#FDF0F8', createdAt: '2026-05-06T12:00:00'
  },
  {
    id: 11, title: '포터 탄커 토트백 (올리브)', price: 180000,
    category: 'clothing', categoryName: '의류/잡화', emoji: '👜',
    location: '서울 강남구', region: '서울 강남구',
    description: '포터 탄커 토트백 올리브 컬러 판매합니다.\n\n1년 사용했으며 잘 닦아서 상태 좋습니다.\n보증서, 정품 박스 없으나 정품입니다.\n구입처: 도쿄 포터 직구\n\n택배 거래 시 안전 포장해서 보내드립니다.',
    status: '판매중', likes: 21, views: 198, chatCount: 11,
    seller: { name: '파도', emoji: '🌊', region: '서울 강남구', temp: 40.8, sellCount: 15, buyCount: 9 },
    images: ['👜', '👜'], color: '#FDF0F8', createdAt: '2026-05-09T17:00:00'
  },
  {
    id: 12, title: '자전거 삼천리 레스포 21단 (블루)', price: 150000,
    category: 'sports', categoryName: '스포츠/레저', emoji: '🚲',
    location: '경기 성남시', region: '경기 성남시',
    description: '삼천리 레스포 21단 자전거 블루 판매합니다.\n\n3년 사용했으나 관리 잘 했습니다.\n변속 잘 되고 브레이크 패드 최근에 교체했습니다.\n직거래만 가능합니다.',
    status: '판매중', likes: 5, views: 43, chatCount: 2,
    seller: { name: '하랑', emoji: '🏃', region: '경기 성남시', temp: 35.9, sellCount: 2, buyCount: 3 },
    images: ['🚲', '🚲'], color: '#EEF4FD', createdAt: '2026-05-05T10:00:00'
  },
  {
    id: 13, title: '닌텐도 스위치 OLED 화이트 + 게임 3개', price: 340000,
    category: 'hobby', categoryName: '취미/게임/음반', emoji: '🎮',
    location: '서울 마포구', region: '서울 마포구',
    description: '닌텐도 스위치 OLED 화이트 판매합니다.\n\n게임: 모여봐요 동물의 숲, 젤다의 전설 왕국의 눈물, 스플래툰 3\n1년 사용, 깨끗하게 사용했습니다.\n케이스, 충전기 모두 포함입니다.',
    status: '판매중', likes: 39, views: 347, chatCount: 25,
    seller: { name: '달빛', emoji: '🌙', region: '서울 마포구', temp: 44.1, sellCount: 22, buyCount: 18 },
    images: ['🎮', '🎮', '🎮'], color: '#F4EEF8', createdAt: '2026-05-11T11:30:00'
  },
  {
    id: 14, title: '소니 알파7C 미러리스 카메라 바디', price: 1680000,
    category: 'hobby', categoryName: '취미/게임/음반', emoji: '📷',
    location: '서울 강남구', region: '서울 강남구',
    description: '소니 알파7C 바디 판매합니다.\n\n촬영횟수 약 3,000회입니다.\n외관 상태 좋으며 센서 이물질 없습니다.\n메모리카드 128GB 포함.\n\n풀프레임 입문자분께 강추합니다.',
    status: '판매중', likes: 28, views: 245, chatCount: 14,
    seller: { name: '은빛', emoji: '🌟', region: '서울 강남구', temp: 41.5, sellCount: 10, buyCount: 7 },
    images: ['📷', '📷', '📷'], color: '#F4EEF8', createdAt: '2026-05-08T09:00:00'
  },
  {
    id: 15, title: '코스트코 가죽 소파 3인용 (베이지)', price: 280000,
    category: 'furniture', categoryName: '가구/인테리어', emoji: '🛋️',
    location: '부산 해운대구', region: '부산 해운대구',
    description: '코스트코 3인용 가죽 소파 베이지 판매합니다.\n\n3년 사용했으나 가죽 상태 좋습니다.\n이사 가면서 처분합니다.\n직거래만 가능하며 운반은 구매자 부담입니다.\n\n부산 해운대 직거래입니다.',
    status: '판매중', likes: 11, views: 89, chatCount: 5,
    seller: { name: '바람', emoji: '💨', region: '부산 해운대구', temp: 37.3, sellCount: 4, buyCount: 2 },
    images: ['🛋️', '🛋️'], color: '#FDF4E8', createdAt: '2026-05-07T14:00:00'
  },
  {
    id: 16, title: '오설록 우전 선물세트 (미개봉)', price: 28000,
    category: 'etc', categoryName: '기타', emoji: '🍵',
    location: '서울 마포구', region: '서울 마포구',
    description: '오설록 우전 고급 선물세트 미개봉 판매합니다.\n\n명절 선물로 받았는데 차를 잘 마시지 않아서요.\n유통기한 2027년 3월까지입니다.\n미개봉 새상품입니다.',
    status: '판매중', likes: 4, views: 32, chatCount: 1,
    seller: { name: '이슬', emoji: '💧', region: '서울 마포구', temp: 36.1, sellCount: 1, buyCount: 5 },
    images: ['🍵'], color: '#F4F4F4', createdAt: '2026-05-04T15:00:00'
  },
  {
    id: 17, title: '레드윙 아이리시 세터 875 (265mm)', price: 220000,
    category: 'clothing', categoryName: '의류/잡화', emoji: '🥾',
    location: '경기 용인시', region: '경기 용인시',
    description: '레드윙 아이리시 세터 875 오로 레거시 265mm 판매합니다.\n\n2년 사용 후 판매합니다.\n착화감 좋고 정기적으로 오일 발라줬습니다.\n박스 없습니다.',
    status: '판매중', likes: 17, views: 134, chatCount: 8,
    seller: { name: '나무', emoji: '🌳', region: '경기 용인시', temp: 39.7, sellCount: 8, buyCount: 6 },
    images: ['🥾', '🥾'], color: '#FDF0F8', createdAt: '2026-05-06T11:30:00'
  },
  {
    id: 18, title: '도서 - 클린 코드 (로버트 마틴)', price: 0,
    category: 'book', categoryName: '도서/음반', emoji: '📖',
    location: '서울 강남구', region: '서울 강남구',
    description: '클린 코드 (Robert C. Martin) 나눔합니다.\n\n2번 읽었습니다. 책 상태 좋습니다.\n개발자라면 꼭 읽어보시길 권장합니다.\n\n오시는 분께 그냥 드립니다.',
    status: '판매중', likes: 6, views: 48, chatCount: 3,
    seller: { name: '코드', emoji: '💻', region: '서울 강남구', temp: 38.8, sellCount: 3, buyCount: 11 },
    images: ['📖'], color: '#F4F8E8', createdAt: '2026-05-03T10:00:00'
  },
  {
    id: 19, title: '스타벅스 텀블러 (500ml, 블랙)', price: 18000,
    category: 'etc', categoryName: '기타', emoji: '☕',
    location: '서울 송파구', region: '서울 송파구',
    description: '스타벅스 한정판 텀블러 500ml 블랙입니다.\n\n선물 받았으나 이미 있어서 판매합니다.\n미사용 새상품입니다.\n박스 포함.',
    status: '판매중', likes: 13, views: 105, chatCount: 7,
    seller: { name: '민들레', emoji: '🌼', region: '서울 송파구', temp: 40.2, sellCount: 11, buyCount: 8 },
    images: ['☕'], color: '#F4F4F4', createdAt: '2026-05-02T09:00:00'
  },
  {
    id: 20, title: '식물 몬스테라 대형 화분 포함', price: 35000,
    category: 'plant', categoryName: '식물', emoji: '🌿',
    location: '서울 강남구', region: '서울 강남구',
    description: '몬스테라 대형 화분째로 판매합니다.\n\n약 1.2m 높이이며 잎이 정말 건강합니다.\n2년 키운 건강한 아이입니다.\n직거래만 가능하며 운반 조심해주세요.',
    status: '판매중', likes: 22, views: 178, chatCount: 10,
    seller: { name: '초원', emoji: '🌾', region: '서울 강남구', temp: 42.7, sellCount: 6, buyCount: 4 },
    images: ['🌿', '🌿'], color: '#EEFDF4', createdAt: '2026-05-01T14:00:00'
  }
];

/* ===== STORAGE UTILS ===== */

function initStorage() {
  if (!sessionStorage.getItem('dg_products')) {
    sessionStorage.setItem('dg_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!sessionStorage.getItem('dg_likes')) {
    sessionStorage.setItem('dg_likes', JSON.stringify([]));
  }
  if (!sessionStorage.getItem('dg_next_id')) {
    sessionStorage.setItem('dg_next_id', '21');
  }
}

function getProducts() {
  const data = sessionStorage.getItem('dg_products');
  return data ? JSON.parse(data) : INITIAL_PRODUCTS;
}

function saveProducts(products) {
  sessionStorage.setItem('dg_products', JSON.stringify(products));
}

function getProductById(id) {
  return getProducts().find(p => p.id === parseInt(id));
}

function addProduct(product) {
  const products = getProducts();
  const nextId = parseInt(sessionStorage.getItem('dg_next_id') || '21');
  product.id = nextId;
  product.createdAt = new Date().toISOString();
  product.likes = 0;
  product.views = 0;
  product.chatCount = 0;
  product.status = '판매중';
  products.unshift(product);
  saveProducts(products);
  sessionStorage.setItem('dg_next_id', String(nextId + 1));
  return product;
}

function updateProduct(id, updates) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === parseInt(id));
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    saveProducts(products);
    return products[idx];
  }
  return null;
}

function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== parseInt(id));
  saveProducts(products);
}

function incrementViews(id) {
  updateProduct(id, { views: (getProductById(id)?.views || 0) + 1 });
}

// Likes
function getLikes() {
  const data = sessionStorage.getItem('dg_likes');
  return data ? JSON.parse(data) : [];
}
function saveLikes(likes) {
  sessionStorage.setItem('dg_likes', JSON.stringify(likes));
}
function toggleLike(productId) {
  const likes = getLikes();
  const idx = likes.indexOf(productId);
  if (idx === -1) {
    likes.push(productId);
    updateProduct(productId, { likes: (getProductById(productId)?.likes || 0) + 1 });
  } else {
    likes.splice(idx, 1);
    updateProduct(productId, { likes: Math.max(0, (getProductById(productId)?.likes || 1) - 1) });
  }
  saveLikes(likes);
  return idx === -1;
}
function isLiked(productId) {
  return getLikes().includes(productId);
}

// Auth
function getUser() {
  const data = sessionStorage.getItem('dg_user');
  return data ? JSON.parse(data) : null;
}
function saveUser(user) {
  sessionStorage.setItem('dg_user', JSON.stringify(user));
}
function logout() {
  sessionStorage.removeItem('dg_user');
}
function getUsers() {
  const data = sessionStorage.getItem('dg_users');
  return data ? JSON.parse(data) : [];
}
function saveUsers(users) {
  sessionStorage.setItem('dg_users', JSON.stringify(users));
}
function registerUser(user) {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) return { success: false, message: '이미 사용 중인 이메일입니다.' };
  users.push(user);
  saveUsers(users);
  return { success: true };
}
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    saveUser(user);
    return { success: true, user };
  }
  return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
}

// Formatting
function formatPrice(price) {
  if (price === 0) return '나눔';
  return price.toLocaleString('ko-KR') + '원';
}
function timeAgo(dateStr) {
  const now = new Date('2026-05-12');
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return '방금 전';
  if (diff < 3600) return Math.floor(diff / 60) + '분 전';
  if (diff < 86400) return Math.floor(diff / 3600) + '시간 전';
  if (diff < 604800) return Math.floor(diff / 86400) + '일 전';
  return Math.floor(diff / 604800) + '주 전';
}
function getCategoryInfo(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES.find(c => c.id === 'etc');
}
