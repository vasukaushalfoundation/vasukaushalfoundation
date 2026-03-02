alert("JS Loaded");

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {

  const loader = document.getElementById("loadingScreen");
  const percentText = document.getElementById("percent");
  const terminal = document.getElementById("terminalText");

  /* ===== MATRIX EFFECT ===== */

  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);

  /* ===== TERMINAL TEXT ===== */

  const messages = [
    "Initializing Secure System...",
    "Scanning Database...",
    "Decrypting Records...",
    "Loading Protected Files..."
  ];

  let msgIndex = 0;
  let charIndex = 0;

  function typeEffect() {
    if (charIndex < messages[msgIndex].length) {
      terminal.innerHTML += messages[msgIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 40);
    } else {
      setTimeout(() => {
        terminal.innerHTML = "";
        charIndex = 0;
        msgIndex = (msgIndex + 1) % messages.length;
        typeEffect();
      }, 800);
    }
  }

  typeEffect();

  /* ===== PERCENT COUNTER ===== */

  let percent = 0;

  const interval = setInterval(() => {
    percent++;
    percentText.innerText = percent + "%";

    if (percent >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        loader.classList.add("hide");
      }, 500);

      setTimeout(() => {
        loader.style.display = "none";
      }, 1500);
    }

  }, 90); // 9 seconds total


});
