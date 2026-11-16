// header script
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});


// projects card hover effect
document.querySelectorAll('.custom-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});


// offcanvas mobile menu 
document.addEventListener('DOMContentLoaded', () => {
  const offcanvasElement = document.getElementById('offcanvasNavbar');
  const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
  const navLinks = offcanvasElement.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      offcanvasInstance.hide();
    });
  });
});


// Contact Form - EmailJS Integration
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.send-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm('service_4dsmxzb', 'template_913otrw', contactForm)
      .then(() => {
        alert("Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
      })
      .catch((error) => {
        alert("Oops! Something went wrong. Please try again.");
        console.error(error);
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}