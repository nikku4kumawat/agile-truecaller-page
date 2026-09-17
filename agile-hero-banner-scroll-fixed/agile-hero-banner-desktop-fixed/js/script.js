const CALL_NUMBER = '+918005677079';
const WHATSAPP_NUMBER = '918005677079';

// Every click outside the demo form opens the phone dialer.
document.addEventListener('click', (event) => {
  if (event.target.closest('#demoForm')) return;
  if (event.target.closest('a[href^="tel:"]')) return;
  // Let browser controls and external scripts behave normally.
  if (event.target.closest('script, option')) return;
  window.location.href = `tel:${CALL_NUMBER}`;
});

const form = document.getElementById('demoForm');
const mobile = document.getElementById('mobile');
const status = document.getElementById('formStatus');

mobile.addEventListener('input', () => {
  mobile.value = mobile.value.replace(/\D/g, '').slice(0, 10);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('mobile') || '').trim();
  const email = String(data.get('email') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !/^\d{10}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email) || !service) {
    status.textContent = 'Please fill all required fields correctly.';
    status.style.color = '#d93025';
    return;
  }

  const text = [
    '🔵 *Agile Solutions – Free Demo Request*',
    '',
    `*Full Name:* ${name}`,
    `*Mobile Number:* ${phone}`,
    `*Email:* ${email}`,
    `*Service:* ${service}`,
    `*Message:* ${message || 'Not provided'}`,
    '',
    'Please contact me for a free demo.'
  ].join('\n');

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  status.textContent = 'Opening WhatsApp…';
  status.style.color = '#159b5b';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});










document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-agbenefits-carousel]');
  const track = document.querySelector('[data-agbenefits-track]');
  const dots = [...document.querySelectorAll('[data-agbenefits-dots] .agbenefits-dot')];

  if (!carousel || !track || dots.length === 0) return;

  let index = 0;
  let timer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  const isMobile = () => window.innerWidth <= 800;

  function updateDots() {
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function goTo(nextIndex, animate = true) {
    index = (nextIndex + 3) % 3;

    if (!isMobile()) {
      track.style.transform = 'translate3d(0,0,0)';
      return;
    }

    track.style.transition = animate
      ? 'transform .75s cubic-bezier(.22,.61,.36,1)'
      : 'none';

    track.style.transform = `translate3d(-${index * 100}%,0,0)`;
    updateDots();
  }

  function next() {
    if (!isMobile()) return;
    goTo(index + 1);
  }

  function startAutoScroll() {
    clearInterval(timer);
    timer = setInterval(next, 6500);
  }

  function stopAutoScroll() {
    clearInterval(timer);
  }

  function resetForViewport() {
    if (isMobile()) {
      goTo(index, false);
      startAutoScroll();
    } else {
      stopAutoScroll();
      index = 0;
      track.style.transition = 'none';
      track.style.transform = 'translate3d(0,0,0)';
      updateDots();
    }
  }

  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoScroll();
  }, {passive:true});

  carousel.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > 45 && isMobile()) {
      if (distance < 0) goTo(index + 1);
      else goTo(index - 1);
    }

    startAutoScroll();
  }, {passive:true});

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resetForViewport, 150);
  });

  resetForViewport();
});
