/**
 * Valentine Kiady
 * - Messages taquins : change à chaque clic sur le bouton Oui
 * - Bouton Non qui fuit
 * - Bouton Oui : grandit 5 fois, au 5e clic → confettis + "Je t'aime tu sais"
 */

(function () {
  const btnOui = document.getElementById('btn-oui');
  const btnNon = document.getElementById('btn-non');
  const questionScreen = document.getElementById('question-screen');
  const successScreen = document.getElementById('success-screen');
  const teaseMsg = document.getElementById('tease-msg');
  const confettiContainer = document.getElementById('confetti-container');
  const heartsContainer = document.getElementById('hearts-container');

  // ---- Messages taquins : change uniquement au clic sur Oui ----
  const TEASE_MESSAGES = [
    'Tu es sûre ? 😏',
    'Réfléchis encore 💭',
    'Vraiment ? 💕'
  ];
  let teaseIndex = 0;

  function showNextTease() {
    teaseMsg.textContent = TEASE_MESSAGES[teaseIndex];
    teaseIndex = (teaseIndex + 1) % TEASE_MESSAGES.length;
    teaseMsg.classList.remove('hidden');
  }

  // ---- Bouton Non : se déplace au survol / clic ----
  btnNon.addEventListener('mouseenter', moveNonButton);
  btnNon.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moveNonButton();
  });
  btnNon.addEventListener('click', function (e) {
    e.preventDefault();
    moveNonButton();
  });

  // ---- Bouton Non qui fuit ----
  const buttonsWrap = document.querySelector('.buttons');

  function getRandomPosition() {
    const rect = buttonsWrap.getBoundingClientRect();
    const maxX = rect.width - btnNon.offsetWidth - 20;
    const maxY = rect.height - btnNon.offsetHeight - 20;
    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);
    return { x, y };
  }

  function moveNonButton() {
    const pos = getRandomPosition();
    btnNon.style.left = pos.x + 'px';
    btnNon.style.top = pos.y + 'px';
  }

  function initNonPosition() {
    const rect = buttonsWrap.getBoundingClientRect();
    btnNon.style.left = rect.width / 2 + 20 + 'px';
    btnNon.style.top = '50%';
    btnNon.style.transform = 'translateY(-50%)';
  }
  initNonPosition();

  // ---- Bouton Oui : grandit 5 fois, au 5e clic → succès "Je t'aime tu sais" ----
  const CLICKS_NEEDED = 5;
  const SCALES = [1, 1.25, 1.5, 1.75, 2];
  let ouiClickCount = 0;

  btnOui.addEventListener('click', function () {
    ouiClickCount++;
    if (ouiClickCount <= CLICKS_NEEDED) {
      btnOui.style.transform = 'scale(' + SCALES[ouiClickCount - 1] + ')';
    }
    // Message taquin : change à chaque clic (sauf au 5e où on affiche le succès)
    if (ouiClickCount < CLICKS_NEEDED) {
      showNextTease();
    }
    if (ouiClickCount === CLICKS_NEEDED) {
      questionScreen.classList.add('hidden');
      successScreen.classList.remove('hidden');
      launchConfetti();
      launchHearts();
    }
  });

  function launchConfetti() {
    const colors = ['#ff85a2', '#e6396b', '#ffb3c6', '#c9184a', '#ffd6e0'];
    const count = 60;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10px';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = 3 + Math.random() * 2 + 's';
        el.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(el);
        setTimeout(() => el.remove(), 6000);
      }, i * 35);
    }
  }

  function launchHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌹', '✨'];
    const count = 18;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'heart-float';
        el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.bottom = '-20px';
        el.style.color = '#e6396b';
        el.style.fontSize = (14 + Math.random() * 14) + 'px';
        el.style.animationDuration = 4 + Math.random() * 2 + 's';
        el.style.animationDelay = Math.random() * 1 + 's';
        heartsContainer.appendChild(el);
        setTimeout(() => el.remove(), 7000);
      }, i * 150);
    }
  }
})();
