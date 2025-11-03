function waitForElement(els, func, timeout = 100) {
  const queries = els.map((el) => document.querySelector(el));
  if (queries.every((a) => a)) {
    func(queries);
  } else if (timeout > 0) {
    setTimeout(waitForElement, 300, els, func, --timeout);
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

waitForElement(['.starrynight-bg-container'], ([backgroundContainer]) => {
  const r = document.documentElement;
  const rs = window.getComputedStyle(r);

  const rootElement = document.querySelector('.starrynight-bg-container');
  rootElement.style.zIndex = '-1';
  const canvasSize =
    backgroundContainer.clientWidth * backgroundContainer.clientHeight;
  const starsFraction = canvasSize / 4000;
  for (let i = 0; i < starsFraction; i++) {
    const size = Math.random() < 0.5 ? 1 : 2;

    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.left = `${random(0, 99)}%`;
    star.style.top = `${random(0, 99)}%`;
    star.style.opacity = random(0.5, 1);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = rs.getPropertyValue('--spice-star');
    star.style.zIndex = '-1';
    star.style.borderRadius = '50%';

    if (Math.random() < 1 / 5) {
      star.style.setProperty("animation", `twinkle${Math.floor(Math.random() * 4) + 1} 5s infinite`, "important");
    }

    backgroundContainer.appendChild(star);
  }

  for (let i = 0; i < 4; i++) {
    const shootingstar = document.createElement('span');
    shootingstar.className = 'shootingstar';
    if (Math.random() < 0.75) {
      shootingstar.style.top = '-4px';
      shootingstar.style.right = `${random(0, 90)}%`;
    } else {
      shootingstar.style.top = `${random(0, 50)}%`;
      shootingstar.style.right = '-4px';
    }

    const shootingStarGlowColor = `rgba(${rs.getPropertyValue(
      '--spice-rgb-shooting-star-glow'
    )},${0.1})`;
    shootingstar.style.boxShadow = `0 0 0 4px ${shootingStarGlowColor}, 0 0 0 8px ${shootingStarGlowColor}, 0 0 20px ${shootingStarGlowColor}`;

    shootingstar.style.animationDuration = `${
      Math.floor(Math.random() * 3) + 3
    }s`;
    shootingstar.style.animationDelay = `${Math.floor(Math.random() * 7)}s`;

    backgroundContainer.appendChild(shootingstar);

    shootingstar.addEventListener('animationend', () => {
      if (Math.random() < 0.75) {
        shootingstar.style.top = '-4px';
        shootingstar.style.right = `${random(0, 90)}%`;
      } else {
        shootingstar.style.top = `${random(0, 50)}%`;
        shootingstar.style.right = '-4px';
      }

      shootingstar.style.animation = 'none';

      void shootingstar.offsetWidth;

      shootingstar.style.animation = '';
      shootingstar.style.setProperty("animation-duration", `${Math.floor(Math.random() * 4) + 3}s`, "important");
    });
  }
});