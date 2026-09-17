const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const copyButton = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('.copy-status');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mobileMenu.classList.toggle('hidden', isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileMenu.classList.add('hidden');
  });
});

copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.copyEmail;
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Email copied to clipboard.';
  } catch {
    copyStatus.textContent = `You can reach me at ${email}.`;
  }
  window.setTimeout(() => { copyStatus.textContent = ''; }, 3000);
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
