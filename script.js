/* ═══════════════════════════════════════════════════════
   1. СЛАЙДЕР ПРЕПОДАВАТЕЛЕЙ (ФОТО НА ВСЮ КАРТОЧКУ)
   ═══════════════════════════════════════════════════════ */
const teachersData = [
  { photo: "teacher1.jpg", name: "Асель Нурланова",  role: "Информатика · 7 лет опыта" },
  { photo: "teacher2.jpg", name: "Данияр Сейткали",  role: "Программирование · 5 лет опыта" },
  { photo: "teacher3.jpg", name: "Мадина Ахметова",  role: "Методист · Куратор" }
];

let currentIdx = 0;
const totalTeachers = teachersData.length;

const tsTrack       = document.getElementById('tsTrack');
const tsPhotoCard   = document.querySelector('.ts-photo-card');
const tsAvatarImg   = document.getElementById('tsAvatarImg');
const tsOverlayName = document.getElementById('tsOverlayName');
const tsOverlayRole = document.getElementById('tsOverlayRole');
const dots          = document.querySelectorAll('.ts-dot');

function updateTeacherCard(index) {
  const t = teachersData[index];

  /* Анимация карточки */
  if (tsPhotoCard) {
    tsPhotoCard.classList.add('pop');
    setTimeout(() => tsPhotoCard.classList.remove('pop'), 400);
  }

  /* Fade-swap фото */
  if (tsAvatarImg) {
    tsAvatarImg.style.opacity = '0';
    tsAvatarImg.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      tsAvatarImg.src = t.photo;
      tsAvatarImg.style.opacity = '1';
    }, 200);
  }

  /* Обновляем имя и роль */
  if (tsOverlayName) {
    tsOverlayName.style.opacity = '0';
    tsOverlayRole.style.opacity  = '0';
    setTimeout(() => {
      tsOverlayName.textContent = t.name;
      tsOverlayRole.textContent  = t.role;
      tsOverlayName.style.transition = 'opacity 0.4s';
      tsOverlayRole.style.transition  = 'opacity 0.4s';
      tsOverlayName.style.opacity = '1';
      tsOverlayRole.style.opacity  = '1';
    }, 250);
  }

  /* Сдвиг правой панели */
  if (tsTrack) {
    tsTrack.style.transform = `translateX(-${index * 33.333}%)`;
  }

  /* Точки */
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
}

function nextTeacher() {
  currentIdx = (currentIdx + 1) % totalTeachers;
  updateTeacherCard(currentIdx);
}

function prevTeacher() {
  currentIdx = (currentIdx - 1 + totalTeachers) % totalTeachers;
  updateTeacherCard(currentIdx);
}

function goTo(index) {
  currentIdx = index;
  updateTeacherCard(currentIdx);
}

/* Автопереключение */
setInterval(nextTeacher, 20000);


/* ═══════════════════════════════════════════════════════
   2. БЕСКОНЕЧНЫЙ КОНВЕЙЕР УЧЕНИКОВ (ФОТО НА ВСЮ КАРТОЧКУ)
   ═══════════════════════════════════════════════════════ */
const studentsList = [
  { photo: "student1.jpg", score: 138 }, // Имя и год выпуска уже внутри картинки
  { photo: "student2.jpg", score: 140 },
  { photo: "student3.jpg", score: 138 },
  { photo: "student4.jpg", score: 129 },
  { photo: "student5.jpg", score: 140 },
  { photo: "student6.jpg", score: 132 },
  { photo: "student7.jpg", score: 137 }
];

const row1 = document.getElementById('row1');
const row2 = document.getElementById('row2');

// Новый шаблон карточки: картинка на весь размер + плашка с баллом сверху
function createStudentCard(student) {
  return `
    <div class="sc-card">
      <img src="${student.photo}" alt="Ученик" class="sc-photo-img">
      <div class="sc-score-badge">${student.score}<span>/140</span></div>
    </div>
  `;
}

function initConveyor() {
  const cardsHTML = studentsList.map(st => createStudentCard(st)).join('');
  
  // Дублируем для создания бесшовной бесконечной ленты
  if (row1) row1.innerHTML = cardsHTML + cardsHTML + cardsHTML;
  if (row2) row2.innerHTML = cardsHTML + cardsHTML + cardsHTML;
}

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  initConveyor();
});

/* ═══════════════════════════════════════════════════════
   3. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
   ═══════════════════════════════════════════════════════ */
function toggleMenu() {
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  burger.classList.toggle('open');
  links.classList.toggle('open');
}

function closeMenu() {
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  burger.classList.remove('open');
  links.classList.remove('open');
}
