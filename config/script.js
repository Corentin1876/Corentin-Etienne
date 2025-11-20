document.addEventListener('DOMContentLoaded', function () {
  // Met à jour l'année du footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle menu mobile
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.querySelector('.main-nav .nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isHidden = navList.style.display === '' || navList.style.display === 'none';
      navList.style.display = isHidden ? 'flex' : 'none';
    });
  }

  // Bouton télécharger CV
  var downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var link = document.createElement('a');
      link.href = 'cv/CV-Etienne-Corentin.pdf';
      link.download = 'CV-Etienne-Corentin.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Animation de frappe au clavier pour le titre
  var mainTitle = document.querySelector('.main-title');
  if (mainTitle) {
    var fullText = mainTitle.textContent;
    mainTitle.textContent = '';
    var isDeleting = false;
    var currentText = '';
    var charIndex = 0;

    function typeWriter() {
      if (!isDeleting && charIndex < fullText.length) {
        // Mode écriture
        currentText += fullText.charAt(charIndex);
        mainTitle.textContent = currentText;
        charIndex++;
        setTimeout(typeWriter, 150); // Vitesse d'écriture (un peu plus lent)
      } else if (isDeleting && charIndex > 0) {
        // Mode suppression
        currentText = currentText.slice(0, -1);
        mainTitle.textContent = currentText;
        charIndex--;
        setTimeout(typeWriter, 75); // Vitesse de suppression (un peu plus lent)
      } else if (charIndex === fullText.length && !isDeleting) {
        // Pause avant de commencer à supprimer
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Pause de 2 secondes
      } else if (charIndex === 0 && isDeleting) {
        // Pause avant de recommencer à écrire
        isDeleting = false;
        setTimeout(typeWriter, 500); // Pause de 0.5 seconde
      }
    }

    typeWriter();
  }

  // Animations aléatoires pour les icônes en orbite avec variation de distance
  var orbitIcons = document.querySelectorAll('.orbit-icon');
  orbitIcons.forEach(function (icon, index) {
    // Durée plus lente et similaire pour toutes les icônes (entre 30s et 38s)
    var duration = Math.random() * 8 + 30;

    // Direction complètement aléatoire (50% de chance pour chaque sens)
    var clockwise = Math.random() > 0.5;

    // Distances variables pendant l'animation (toujours loin du centre - photo = 200px de diamètre)
    var distanceStart = Math.random() * 40 + 200; // 200-240px (toujours > 200px)
    var distanceMid1 = Math.random() * 50 + 210;  // 210-260px
    var distanceMid2 = Math.random() * 40 + 200;  // 200-240px
    var distanceMid3 = Math.random() * 45 + 205;  // 205-250px
    var distanceEnd = distanceStart; // Revient à la distance de départ

    // Angle de départ complètement aléatoire
    var startAngle = Math.random() * 360;

    // Calcul des angles selon la direction
    var angle90, angle180, angle270, angle360;
    if (clockwise) {
      angle90 = startAngle + 90;
      angle180 = startAngle + 180;
      angle270 = startAngle + 270;
      angle360 = startAngle + 360;
    } else {
      angle90 = startAngle - 90;
      angle180 = startAngle - 180;
      angle270 = startAngle - 270;
      angle360 = startAngle - 360;
    }

    // Application des styles
    icon.style.animationDuration = duration + 's';
    icon.style.animationTimingFunction = 'ease-in-out';

    // Création de l'animation personnalisée avec variation de distance
    var keyframeName = 'orbit-random-' + index + '-' + Date.now();
    var keyframes = '@keyframes ' + keyframeName + ' {' +
      '0% { transform: rotate(' + startAngle + 'deg) translateX(' + distanceStart + 'px) rotate(-' + startAngle + 'deg); }' +
      '25% { transform: rotate(' + angle90 + 'deg) translateX(' + distanceMid1 + 'px) rotate(-' + angle90 + 'deg); }' +
      '50% { transform: rotate(' + angle180 + 'deg) translateX(' + distanceMid2 + 'px) rotate(-' + angle180 + 'deg); }' +
      '75% { transform: rotate(' + angle270 + 'deg) translateX(' + distanceMid3 + 'px) rotate(-' + angle270 + 'deg); }' +
      '100% { transform: rotate(' + angle360 + 'deg) translateX(' + distanceEnd + 'px) rotate(-' + angle360 + 'deg); }' +
      '}';

    // Injection de l'animation dans le style (méthode compatible fichier local)
    var styleElement = document.createElement('style');
    styleElement.textContent = keyframes;
    document.head.appendChild(styleElement);

    // Application de l'animation
    icon.style.animationName = keyframeName;
    icon.style.animationPlayState = 'running';

    // Pause l'animation au survol
    icon.addEventListener('mouseenter', function () {
      console.log('Souris sur icône - pause');
      this.style.animationPlayState = 'paused';
    });

    // Reprend l'animation quand la souris quitte
    icon.addEventListener('mouseleave', function () {
      console.log('Souris hors icône - reprise');
      this.style.animationPlayState = 'running';
    });
  });

  console.log('Script chargé — ' + orbitIcons.length + ' icônes trouvées');
});