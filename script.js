document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const successMessage = document.querySelector('.success-message');
      if (successMessage) {
        successMessage.textContent = 'Thank you for your message. This form is ready for a live email service such as Formspree, Netlify Forms, or another backend provider before it can actually send submissions.';
        successMessage.classList.add('visible');
      }

      contactForm.reset();
    });
  }
});
