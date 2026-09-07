/* ===================== EASY EDIT SETTINGS =====================
   Change these values to personalize the experience.
================================================================ */
const BIRTHDAY_PERSON_NAME = "Minna - Kuchu puchu"; // EDIT HERE: Birthday person's name.
const BIRTHDAY_DATE = "2026-12-25T00:00:00"; // EDIT HERE: Use YYYY-MM-DDTHH:mm:ss.
const TYPING_MESSAGE = "You are the most beautiful part of my every day."; // EDIT HERE: Hero message.

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function personalize() {
  $$("[data-name]").forEach((element) => { element.textContent = BIRTHDAY_PERSON_NAME; });
  document.title = `Happy Birthday, ${BIRTHDAY_PERSON_NAME}`;
}

function createParticles() {
  const field = $("#particleField");
  for (let i = 0; i < 42; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * -8}s`;
    particle.style.animationDuration = `${5 + Math.random() * 7}s`;
    field.appendChild(particle);
  }
}

function createCelebration() {
  const confettiLayer = $("#confettiLayer");
  const heartLayer = $("#heartLayer");
  for (let i = 0; i < 90; i += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-Math.random() * 20}%`;
    confetti.style.backgroundColor = ["#ff83b7", "#ffd4e8", "#a68bff", "#fff"][i % 4];
    confetti.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.style.animationDelay = `${Math.random() * .7}s`;
    confettiLayer.appendChild(confetti);
  }
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = i % 3 === 0 ? "♥" : "♡";
    heart.style.left = `${5 + Math.random() * 90}%`;
    heart.style.bottom = `${-5 - Math.random() * 15}%`;
    heart.style.animationDelay = `${Math.random() * 1.5}s`;
    heartLayer.appendChild(heart);
  }
  window.setTimeout(() => { confettiLayer.replaceChildren(); heartLayer.replaceChildren(); }, 5000);
}

function typeMessage() {
  const output = $("#typedMessage");
  let index = 0;
  const type = () => {
    output.textContent = TYPING_MESSAGE.slice(0, index);
    index += 1;
    if (index <= TYPING_MESSAGE.length) window.setTimeout(type, 48);
  };
  type();
}

function openBirthday() {
  const introGift = $(".gift-intro");
  introGift.classList.add("open");
  createCelebration();
  window.setTimeout(() => {
    $("#opening").classList.add("leaving");
    $("#birthdayContent").hidden = false;
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(() => { $("#opening").hidden = true; typeMessage(); }, 700);
  }, 750);
}

function setupCountdown() {
  const date = new Date(BIRTHDAY_DATE).getTime();
  const update = () => {
    let remaining = date - Date.now();
    if (remaining < 0) {
      const nextYear = new Date(BIRTHDAY_DATE);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      remaining = nextYear.getTime() - Date.now();
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining / 3600000) % 24);
    const minutes = Math.floor((remaining / 60000) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    $("#days").textContent = String(days).padStart(2, "0");
    $("#hours").textContent = String(hours).padStart(2, "0");
    $("#minutes").textContent = String(minutes).padStart(2, "0");
    $("#seconds").textContent = String(seconds).padStart(2, "0");
  };
  update();
  window.setInterval(update, 1000);
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal").forEach((element) => observer.observe(element));
}

function setupGallery() {
  $$(".gallery-item img").forEach((image) => {
    image.addEventListener("error", () => {
      const palette = { sunset: ["#f48c9f", "#5c2d70"], rose: ["#ffb1c9", "#843b67"], lavender: ["#c0a8ff", "#39245e"], night: ["#4c5b9e", "#151735"] };
      const colors = palette[image.dataset.placeholder] || palette.rose;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="620" cy="160" r="110" fill="#fff" opacity=".2"/><path d="M0 500 Q180 350 360 490 T800 420 V600 H0Z" fill="#160c2f" opacity=".38"/><text x="400" y="330" fill="#fff" opacity=".9" font-family="Georgia" font-size="34" text-anchor="middle">Your photo goes here</text></svg>`;
      image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }, { once: true });
  });
  $$(".gallery-item").forEach((item) => item.addEventListener("click", () => {
    const image = item.querySelector("img");
    $("#lightboxImage").src = image.src;
    $("#lightboxImage").alt = image.alt;
    $("#lightboxCaption").textContent = item.dataset.caption;
    $("#lightbox").hidden = false;
  }));
}

personalize();
createParticles();
setupCountdown();
setupRevealAnimations();
setupGallery();
$("#openSurprise").addEventListener("click", openBirthday);
$("#secondGift").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("open");
  $("#surpriseMessage").classList.toggle("show");
  createCelebration();
});
$("#closeLightbox").addEventListener("click", () => { $("#lightbox").hidden = true; });
$("#lightbox").addEventListener("click", (event) => { if (event.target.id === "lightbox") $("#lightbox").hidden = true; });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") $("#lightbox").hidden = true; });
