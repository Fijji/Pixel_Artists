(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const mobileMenuOverlay = document.querySelector('.js-menu-overlay');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    mobileMenuOverlay.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  mobileMenuLinks.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();

      const section = document.querySelector(e.target.getAttribute('href'));
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
        });

        toggleMenu();
      }
    })
  );

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    mobileMenuOverlay.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
