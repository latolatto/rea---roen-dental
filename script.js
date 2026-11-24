const cases = [
  { image: 'assets/media-17.jpg', title: 'Zëvendësimi i dhëmbëve të munguar', category: 'Implantologji', filter: 'implante', alt: 'Rast para dhe pas trajtimit me implante dentare' },
  { image: 'assets/media-16.jpg', title: 'Kurora full zirkon', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast para dhe pas me kurora full zirkon' },
  { image: 'assets/media-15.jpg', title: 'Alignerë transparentë dhe zbardhim', category: 'Ortodonci', filter: 'ortodonci', alt: 'Dhëmbët para dhe pas trajtimit me alignerë transparentë dhe zbardhimit' },
  { image: 'assets/media-08.jpg', title: 'Transformim me kurora zirkoni', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast para dhe pas me kurora zirkoni' },
  { image: 'assets/media-31.jpg', title: 'Rikthim i buzëqeshjes me zirkon', category: 'Estetikë dentare', filter: 'estetike', alt: 'Buzëqeshje para dhe pas trajtimit me zirkon' },
  { image: 'assets/media-32.jpg', title: 'Ura dentare për funksion dhe estetikë', category: 'Restaurime', filter: 'restaurim', alt: 'Rast para dhe pas me ura dentare' },
  { image: 'assets/media-33.jpg', title: 'Zëvendësim i punimit me zirkon', category: 'Estetikë dentare', filter: 'estetike', alt: 'Punim dentar para dhe pas zëvendësimit me zirkon' },
  { image: 'assets/media-10.jpg', title: 'Buzëqeshje e re me kurora EMAX', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast para dhe pas me kurora EMAX' },
  { image: 'assets/media-18.jpg', title: 'Kompozit dhe zbardhim profesional', category: 'Estetikë dentare', filter: 'estetike', alt: 'Dhëmbët pas mbushjes së hapësirave me kompozit dhe zbardhimit' },
  { image: 'assets/media-30.jpg', title: 'Rehabilitim me punim full zirkon', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast klinik para dhe pas me punim full zirkon' },
  { image: 'assets/media-14.jpg', title: 'Aparat ortodontik i lëvizshëm', category: 'Ortodonci', filter: 'ortodonci', alt: 'Drejtimi i dhëmbëve me aparat të lëvizshëm' },
  { image: 'assets/media-21.jpg', title: 'Mbushje estetike kompoziti', category: 'Restaurime', filter: 'restaurim', alt: 'Dhëmballë para dhe pas zëvendësimit të amalgamit me kompozit' },
  { image: 'assets/media-26.jpg', title: 'Restaurim i buzëqeshjes', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast para dhe pas restaurimit estetik të dhëmbëve' },
  { image: 'assets/media-04.jpg', title: 'Rikonstruksion i buzëqeshjes', category: 'Estetikë dentare', filter: 'estetike', alt: 'Rast para dhe pas i restaurimit të dhëmbëve' },
];

const videos = [
  { src: 'assets/media-25.mp4', title: 'Një vizitë pa frikë', poster: 'assets/media-29.jpg' },
  { src: 'assets/media-11.mp4', title: 'Çdo pacient është unik', poster: 'assets/media-17.jpg' },
  { src: 'assets/media-03.mp4', title: 'Dashuria jonë, buzëqeshja juaj', poster: 'assets/media-27.jpg' },
  { src: 'assets/media-07.mp4', title: 'Kujdes periodik për buzëqeshjen', poster: 'assets/media-28.jpg' },
];

const gallery = document.querySelector('#gallery-grid');
const videoGrid = document.querySelector('#video-grid');
const dialog = document.querySelector('#image-dialog');

function renderCases(filter = 'all') {
  const filtered = filter === 'all' ? cases : cases.filter((item) => item.filter === filter);
  gallery.innerHTML = filtered.map((item) => `
    <article class="case-card">
      <button class="case-image-button" type="button" data-image="${item.image}" data-caption="${item.title}" aria-label="Hap foton: ${item.title}">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
      </button>
      <div class="case-meta"><span class="case-category">${item.category}</span><h3>${item.title}</h3></div>
    </article>`).join('');
}

function renderVideos() {
  videoGrid.innerHTML = videos.map((item) => `
    <article class="video-card">
      <video controls playsinline preload="metadata" poster="${item.poster}" aria-label="${item.title}">
        <source src="${item.src}" type="video/mp4" />
        Shfletuesi juaj nuk e mbështet videon.
      </video>
      <div class="video-title">${item.title}<span aria-hidden="true">↗</span></div>
    </article>`).join('');
}

renderCases();
renderVideos();

document.querySelector('.gallery-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('.filter-button').forEach((filter) => filter.classList.toggle('is-active', filter === button));
  renderCases(button.dataset.filter);
});

gallery.addEventListener('click', (event) => {
  const button = event.target.closest('[data-image]');
  if (!button) return;
  document.querySelector('#dialog-image').src = button.dataset.image;
  document.querySelector('#dialog-caption').textContent = button.dataset.caption;
  dialog.showModal();
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Hap menunë' : 'Mbyll menunë');
  nav.classList.toggle('is-open', !isOpen);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Hap menunë');
  }
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const phone = form.get('phone').trim();
  const service = form.get('service');
  const message = `Përshëndetje, jam ${name}. Dëshiroj të kërkoj një konsultë për: ${service}. Numri im i telefonit: ${phone}.`;
  const whatsapp = `https://wa.me/355685319988?text=${encodeURIComponent(message)}`;
  window.open(whatsapp, '_blank', 'noopener,noreferrer');
  document.querySelector('#form-feedback').textContent = 'WhatsApp u hap me kërkesën tuaj gati për dërgim.';
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
