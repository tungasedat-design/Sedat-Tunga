/* Kuzey Hukuku: Sakin, erişilebilir etkileşimler; kararlı odak yönetimi ve minimal hareket. */
const articles = {
  'idari-yargi': {
    category: 'İdare Hukuku', date: '12 Haziran 2026',
    title: 'İdari işlemin gerekçesi: yargısal denetimin görünür zemini',
    body: `<p>İdari işlemlerde gerekçe, yalnızca şekli bir unsur değil; idarenin kararını hangi olgusal ve hukuki kabullere dayandırdığını görünür kılan bir güvence alanıdır. Bu görünürlük, ilgilinin etkili başvuru hakkını kullanabilmesi ve yargısal denetimin sağlıklı kurulabilmesi bakımından önem taşır.</p><h3>Gerekçenin işlevi</h3><p>Gerekçe, idari takdir yetkisinin sınırsız bir alan olmadığını gösterir. Karar ile dayanak arasındaki ilişki açıklaştıkça, işlemin ölçülülüğü ve kamu yararıyla bağlantısı daha somut biçimde değerlendirilebilir. Her olayın kendi maddi bağlamı içinde incelenmesi gerekir.</p><h3>Değerlendirme notu</h3><p>Bu yazı genel bilgilendirme amacı taşır; somut uyuşmazlıklara ilişkin hukuki görüş veya yönlendirme niteliğinde değildir. Güncel mevzuat, içtihat ve somut olay verileri birlikte değerlendirilmelidir.</p>`
  },
  'kisisel-veri': {
    category: 'Kişisel Verilerin Korunması', date: '28 Mayıs 2026',
    title: 'Aydınlatma yükümlülüğü ve veri işleme amacı arasındaki bağ',
    body: `<p>Kişisel verilerin işlenmesinde aydınlatma, veri sorumlusunun şeffaflık sorumluluğunun temel görünümüdür. Aydınlatma metninin, veri işleme amacını anlaşılır ve belirli şekilde ortaya koyması; kişinin bilgilenmiş karar verebilmesi bakımından işlevseldir.</p><h3>Belirlilik ilkesi</h3><p>Amacın soyut veya geniş ifadelerle kurulması, aydınlatmanın koruyucu etkisini zayıflatabilir. Veri kategorileri, hukuki sebep ve saklama yaklaşımı gibi başlıklar hedef kitleyi gözeten sade bir dilde ele alınmalıdır.</p><h3>Değerlendirme notu</h3><p>Bu metin akademik bir inceleme özeti niteliğindedir. Kurumsal uyum süreçleri özelinde güncel düzenlemeler ve somut veri akışları ayrıca değerlendirilmelidir.</p>`
  },
  'sozlesme': {
    category: 'Borçlar Hukuku', date: '06 Mayıs 2026',
    title: 'Sözleşme öncesi bilgi paylaşımında dürüstlük kuralının sınırları',
    body: `<p>Sözleşme görüşmeleri aşamasında taraflar, ekonomik serbestilerini korurken dürüstlük kuralının doğurduğu özen yükümlülüklerini de dikkate alır. Bu denge, görüşmelerin niteliğine, tarafların uzmanlığına ve paylaşılmayan bilginin karar üzerindeki etkisine göre değişebilir.</p><h3>Bağlamsal inceleme</h3><p>Her eksik bilginin otomatik olarak sorumluluk doğuracağı ileri sürülemez. Buna karşılık, karşı tarafın kararını esaslı şekilde etkileyebilecek olguların gizlenmesi farklı hukuki sonuçlar doğurabilir. İnceleme, görüşmelerin tamamı ve tarafların makul beklentileri üzerinden yürütülmelidir.</p><h3>Değerlendirme notu</h3><p>Bu yazı, genel kavramsal çerçeve sunar ve hukuki danışmanlık yerine geçmez. Somut olaylara göre güncel kanun hükümleri ile yargı kararları incelenmelidir.</p>`
  }
};

const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle?.querySelector('use');
const menuToggle = document.querySelector('#menu-toggle');
const mobilePanel = document.querySelector('#mobile-panel');
const modal = document.querySelector('#article-modal');
const modalDialog = modal?.querySelector('.modal-dialog');
const closeModal = document.querySelector('#modal-close');
let lastFocused = null;

function setTheme(theme) {
  body.classList.toggle('dark', theme === 'dark');
  themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
  if (themeIcon) themeIcon.setAttribute('href', theme === 'dark' ? '#sun' : '#moon');
  localStorage.setItem('sedat-tunga-theme', theme);
}

const savedTheme = localStorage.getItem('sedat-tunga-theme');
setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => setTheme(body.classList.contains('dark') ? 'light' : 'dark'));

menuToggle?.addEventListener('click', () => {
  const isOpen = mobilePanel.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
});
mobilePanel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobilePanel.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

function openArticle(id, trigger) {
  const article = articles[id];
  if (!article || !modal) return;
  lastFocused = trigger;
  modal.querySelector('#modal-kicker').textContent = `${article.category} · ${article.date}`;
  modal.querySelector('#modal-title').textContent = article.title;
  modal.querySelector('#modal-body').innerHTML = article.body;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  closeModal?.focus();
}
function closeArticle() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  lastFocused?.focus();
}
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article, button)));
closeModal?.addEventListener('click', closeArticle);
modal?.addEventListener('click', event => { if (event.target === modal) closeArticle(); });

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) closeArticle();
  if (event.key === 'Tab' && modal?.classList.contains('open')) {
    const focusable = [...modalDialog.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const searchInput = document.querySelector('#article-search');
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.article-card');
const noResults = document.querySelector('#no-results');
let activeFilter = 'Tümü';
function applyFilters() {
  const term = searchInput.value.trim().toLocaleLowerCase('tr-TR');
  let shown = 0;
  cards.forEach(card => {
    const matchesCategory = activeFilter === 'Tümü' || card.dataset.category === activeFilter;
    const matchesSearch = !term || card.textContent.toLocaleLowerCase('tr-TR').includes(term);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  noResults.style.display = shown ? 'none' : 'block';
}
searchInput?.addEventListener('input', applyFilters);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  button.setAttribute('aria-pressed', 'true');
  filterButtons.forEach(item => { if (item !== button) item.setAttribute('aria-pressed', 'false'); });
  applyFilters();
}));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const required = [...form.querySelectorAll('[required]')];
  let valid = true;
  required.forEach(field => {
    const fieldValid = field.value.trim() && (field.type !== 'email' || field.validity.valid);
    field.setAttribute('aria-invalid', String(!fieldValid));
    if (!fieldValid) valid = false;
  });
  if (!valid) {
    status.textContent = 'Lütfen zorunlu alanları uygun biçimde doldurunuz.';
    status.className = 'form-status error';
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  status.textContent = 'Mesajınız bu statik demo içinde doğrulandı. Gönderim altyapısı yayına alınırken kurumsal e-posta hizmetine bağlanmalıdır.';
  status.className = 'form-status success';
  form.reset();
});

document.querySelector('#vcard-download')?.addEventListener('click', () => {
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Av. Sedat Tunga\nN:Tunga;Sedat;;;\nTITLE:Avukat | Hukuk ve Akademik İncelemeler\nEMAIL;TYPE=WORK:iletisim@sedattunga.av.tr\nTEL;TYPE=WORK:+90 212 000 00 00\nADR;TYPE=WORK:;;[Ofis Adresi];İstanbul;;;Türkiye\nURL:https://example.github.io/av-sedat-tunga/\nEND:VCARD`;
  const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'av-sedat-tunga.vcf'; link.click(); URL.revokeObjectURL(url);
});

document.querySelector('#year').textContent = new Date().getFullYear();
