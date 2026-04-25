/**
 * script.js — Cybrexa_01_SecureProfile
 * Author: Muhammed Nafih AK
 *
 * ✅ SECURITY NOTES:
 *    - All user inputs are sanitized before use (XSS Prevention)
 *    - No eval() used anywhere in this file
 *    - No innerHTML used with user-controlled data
 *    - Input validation runs BEFORE sanitization
 *    - See SECURITY.md for full security documentation
 */

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top = mouseY - 6 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX - 18) * 0.15;
  ringY += (mouseY - ringY - 18) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorRing.style.transform = 'scale(1.5)';
    cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
    cursorRing.style.opacity = '0.5';
  });
});

// ── Starfield Canvas ──
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    });
  }
}
createStars(200);

let shootingStars = [];
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    vx: Math.random() * 6 + 4,
    vy: Math.random() * 3 + 2,
    length: Math.random() * 80 + 40,
    alpha: 1,
  });
}
setInterval(spawnShootingStar, 3000);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.opacity += s.twinkleSpeed * s.twinkleDir;
    if (s.opacity >= 1 || s.opacity <= 0.1) s.twinkleDir *= -1;
    s.y -= s.speed;
    if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 232, 255, ${s.opacity})`;
    ctx.fill();
  });

  const gradient1 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.3, 0, canvas.width * 0.2, canvas.height * 0.3, 300);
  gradient1.addColorStop(0, 'rgba(0, 80, 120, 0.04)');
  gradient1.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 0, canvas.width * 0.8, canvas.height * 0.7, 250);
  gradient2.addColorStop(0, 'rgba(40, 0, 80, 0.05)');
  gradient2.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shootingStars = shootingStars.filter(s => s.alpha > 0);
  shootingStars.forEach(s => {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * (s.length / 10), s.y - s.vy * (s.length / 10));
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * (s.length / 10), s.y - s.vy * (s.length / 10));
    grad.addColorStop(0, `rgba(0, 212, 255, ${s.alpha})`);
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 0.015;
  });

  requestAnimationFrame(drawStars);
}
drawStars();

// ── Scroll-triggered card animations ──
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
cards.forEach(card => cardObserver.observe(card));

// ────────────────────────────────────────────────
// ✅ SECURITY: Contact Form Handler
// Implements: Input Validation + XSS Prevention
// Reference: OWASP A03 — Injection Prevention
// ────────────────────────────────────────────────
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', function () {

    // Step 1: Read raw input values (untrusted — treat as dangerous)
    const rawName    = document.getElementById('name').value.trim();
    const rawEmail   = document.getElementById('email').value.trim();
    const rawMessage = document.getElementById('message').value.trim();
    const response   = document.getElementById('response');

    // ✅ SECURITY: Step 2 — Input Validation
    // Runs BEFORE sanitization. Reject empty fields immediately.
    // Never process or sanitize blank input — fail fast.
    if (!rawName || !rawEmail || !rawMessage) {
      response.style.color = '#ff3366';
      response.textContent = '⚠ ALL FIELDS ARE REQUIRED.';
      return; // Hard stop — do not continue
    }

    // ✅ SECURITY: Basic email format check
    // Rejects obviously malformed addresses before any processing
    if (!rawEmail.includes('@') || !rawEmail.includes('.')) {
      response.style.color = '#ff3366';
      response.textContent = '⚠ ENTER A VALID EMAIL ADDRESS.';
      return; // Hard stop
    }

    // ✅ SECURITY: Step 3 — XSS Prevention via HTML Entity Encoding
    // Converts special HTML characters into their safe entity equivalents.
    //
    // Attack example blocked:
    //   Input:  <script>alert(document.cookie)</script>
    //   Output: &lt;script&gt;alert(document.cookie)&lt;/script&gt;
    //   Result: Rendered as plain text — NOT executed by the browser ✅
    //
    // Why & first? Prevents double-encoding bugs like &amp;lt; appearing
    function sanitize(input) {
      return input
        .replace(/&/g, '&amp;')   // & → &amp;  (must be first)
        .replace(/</g, '&lt;')    // < → &lt;   (blocks opening tags)
        .replace(/>/g, '&gt;')    // > → &gt;   (blocks closing tags)
        .replace(/"/g, '&quot;')  // " → &quot; (blocks attribute injection)
        .replace(/'/g, '&#x27;'); // ' → &#x27; (blocks single-quote injection)
    }

    // Apply sanitization to all text fields that could appear in the DOM
    const safeName    = sanitize(rawName);
    const safeMessage = sanitize(rawMessage);
    // Note: email is not rendered in the DOM, only used for logic

    // ✅ SECURITY: Output uses textContent — NOT innerHTML
    // textContent never parses HTML so it is XSS-safe by design.
    //
    //   UNSAFE ❌:  element.innerHTML = userInput
    //               (browser parses input as HTML — scripts can execute)
    //
    //   SAFE   ✅:  element.textContent = userInput
    //               (browser treats input as plain text — no parsing)

    // Step 4: Simulate transmission (replace with real backend/EmailJS call)
    sendBtn.textContent = '...TRANSMITTING';
    sendBtn.disabled = true;

    setTimeout(() => {
      response.style.color = 'var(--accent)';
      response.textContent = `✓ MESSAGE FROM ${safeName.toUpperCase()} TRANSMITTED SUCCESSFULLY.`;
      sendBtn.textContent = '⟶ TRANSMIT';
      sendBtn.disabled = false;

      // Clear fields after submission
      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('message').value = '';
    }, 1500);
  });
}

// ── Nav active page highlight ──
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
  else link.classList.remove('active');
});

































