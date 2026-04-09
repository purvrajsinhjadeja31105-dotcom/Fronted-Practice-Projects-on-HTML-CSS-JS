const testominals = [
  {
    name: "Cherise G",
    role: "Verified Customer",
    photoUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
    text: "This is simply unbelievable! I would be lost without Apple. The very best. Not able to tell you how happy I am with Apple.",
  },
  {
    name: "Rosetta Q",
    role: "Tech Enthusiast",
    photoUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
    text: "I would also like to say thank you to all your staff. Wow what great service, I love it! Apple impressed me on multiple levels.",
  },
  {
    name: "Constantine V",
    role: "Daily User",
    photoUrl:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
    text: "Thank you for making it painless, pleasant and most of all hassle free! I wish I would have thought of it first. The very best.",
  }
];

const image = document.querySelector('.photo');
const textEl = document.querySelector('.text');
const username = document.querySelector('.username');
const role = document.querySelector('.role');
const content = document.querySelector('.content');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots-container');
const progressBar = document.querySelector('.progress-bar');
const container = document.querySelector('.testominal-container');

let idx = 0;
let timerId;
let remainingTime = 6000;
let resumeTime = 0;
let isFirstLoad = true;

// Initialize 3D tilt only on larger screens
function initializeTilt() {
  if (window.innerWidth > 768 && window.VanillaTilt) {
    VanillaTilt.init(container, {
      max: 10,
      speed: 400,
      glare: false,
      scale: 1
    });
  }
}

// Handle window resize for responsive tilt
function handleResize() {
  if (window.innerWidth <= 768 && container.vanillaTilt) {
    container.vanillaTilt.destroy();
  } else if (window.innerWidth > 768) {
    initializeTilt();
  }
}

// Initialize dots
testominals.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    idx = i;
    updateTestominal();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[idx].classList.add('active');
}

function resetProgress() {
  progressBar.classList.remove('active');
  void progressBar.offsetWidth; // Trigger reflow
  progressBar.classList.add('active');
  progressBar.style.animationPlayState = 'running';
}

function updateTestominal() {
  const { name, photoUrl, text, role: userRole } = testominals[idx];

  clearTimeout(timerId); // Clear any existing timer

  updateDots();
  resetProgress();

  if (isFirstLoad) {
    isFirstLoad = false;
    image.src = photoUrl;
    textEl.innerText = text;
    username.innerText = name;
    role.innerText = userRole;

    remainingTime = 6000;
    resumeTime = Date.now();
    timerId = setTimeout(handleNext, remainingTime);
    return;
  }

  // Fade out
  content.classList.add('fade');
  image.style.opacity = '0';
  image.style.transform = 'translateX(-50%) translateZ(60px) scale(0.95)';
  image.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  setTimeout(() => {
    // Update content while invisible
    image.src = photoUrl;
    textEl.innerText = text;
    username.innerText = name;
    role.innerText = userRole;

    // Fade in
    content.classList.remove('fade');
    image.style.opacity = '1';
    image.style.transform = 'translateX(-50%) translateZ(60px) scale(1)';
  }, 500); // Wait for fade out transition to complete

  // Restart timer unless hovering (handled by mouse events later)
  remainingTime = 6000;
  resumeTime = Date.now();
  timerId = setTimeout(handleNext, remainingTime);
}

function handleNext() {
  idx++;
  if (idx === testominals.length) {
    idx = 0;
  }
  updateTestominal();
}

function handlePrev() {
  idx--;
  if (idx < 0) {
    idx = testominals.length - 1;
  }
  updateTestominal();
}

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

container.addEventListener('mouseenter', () => {
  clearTimeout(timerId);
  remainingTime -= (Date.now() - resumeTime);
  progressBar.style.animationPlayState = 'paused';
});

container.addEventListener('mouseleave', () => {
  resumeTime = Date.now();
  timerId = setTimeout(handleNext, remainingTime);
  progressBar.style.animationPlayState = 'running';
});

// Prevent touch events from interfering on mobile
container.addEventListener('touchstart', () => {
  clearTimeout(timerId);
  remainingTime -= (Date.now() - resumeTime);
  progressBar.style.animationPlayState = 'paused';
}, { passive: true });

container.addEventListener('touchend', () => {
  resumeTime = Date.now();
  timerId = setTimeout(handleNext, remainingTime);
  progressBar.style.animationPlayState = 'running';
}, { passive: true });

// Initialize tilt and add resize listener
initializeTilt();
window.addEventListener('resize', handleResize);

// Start the sequence
updateTestominal();
