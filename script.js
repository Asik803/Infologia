/* ═══════════════════════════════════════════════════════
   1. СЛАЙДЕР ПРЕПОДАВАТЕЛЕЙ (ФОТО НА ВСЮ КАРТОЧКУ)
   ═══════════════════════════════════════════════════════ */
const teachersData = [
  { photo: "teacher1.jpg" }, // Фотография со вшитым текстом для 1-го учителя
  { photo: "teacher2.jpg" }, // Для 2-го учителя
  { photo: "teacher3.jpg" }  // Для 3-го учителя
];

let currentIdx = 0;
const totalTeachers = teachersData.length;

const tsTrack = document.getElementById('tsTrack');
const tsPhotoCard = document.querySelector('.ts-photo-card'); // Сама карточка для эффекта pop
const tsAvatarImg = document.getElementById('tsAvatarImg');     // Тег картинки
const dots = document.querySelectorAll('.ts-dot');

function updateTeacherCard(index) {
  // Легкая анимация карточки при переключении
  if (tsPhotoCard) {
    tsPhotoCard.classList.add('pop');
    setTimeout(() => tsPhotoCard.classList.remove('pop'), 400);
  }

  // Просто меняем фоновую картинку
  if (tsAvatarImg) {
    tsAvatarImg.src = teachersData[index].photo;
  }

  // Сдвиг текстового описания, которое находится справа
  if (tsTrack) {
    tsTrack.style.transform = `translateX(-${index * 33.333}%)`;
  }

  // Обновление активной точки
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
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


/* ═══════════════════════════════════════════════════════
   2. БЕСКОНЕЧНЫЙ КОНВЕЙЕР УЧЕНИКОВ (ФОТО НА ВСЮ КАРТОЧКУ)
   ═══════════════════════════════════════════════════════ */
const studentsList = [
  { photo: "student1.jpg", score: 135 }, // Имя и год выпуска уже внутри картинки
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