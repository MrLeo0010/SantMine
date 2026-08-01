// 1. Наша база данных контента
const contentData = {
    lore: {
        title: "Добро пожаловать в историю SantMine",
        imagesCount: 3,
        folder: "Lore",
        text: `
            <p class="font-semibold text-green-300">Нудный текст:</p>
            <p>Лор появится, когда кто либо его начнет раскрывать. До этого момента здесь будет пусто.</p>
            <p>(Оплата по ранее указааным реквезитам, информацию в скобках удалить)</p>
        `
    },
    minigames: {
        title: "Уникальные Мини-Игры",
        imagesCount: 6,
        folder: "Minigames",
        text: `
            <p class="font-semibold text-green-300">Снова нудный текст:</p>
            <p>Мы (я) создаем уникальные мини-режимы, которых нет на других серверах. Тебя ждут полностью авторские разработки и крутые интерактивные пародии на популярные игры (например, наш атмосферный DOORS!). Каждый режим мы строим вручную и с душой, прорабатывая каждую деталь, чтобы ты получил максимум эмоций от геймплея.</p>
        `
    },
    textures: {
        title: "Фирменные Текстуры сервера",
        imagesCount: 3,
        folder: "Textures",
        text: `
            <p class="font-semibold text-green-300">Да сколько можно, а?</p>
            <p>Для полной атмосферы рекомендуем установить наш текстурпак. Он заменяет стандартные предметы, добавляет кастомное оружие, интерфейсы и элементы погружения в Лор.</p>
        `
    },
    nothing: {
        title: "А что ты тут делаешь?",
        imagesCount: 0,
        folder: "",
        text: `
            <p class="font-semibold text-red-400">Ошибка 404:</p>
            <p>Тута пусто. Бегом на главную страницу!</p>

            <a href="index.html#home" class="escape-btn inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white mt-4">
                Сбежать отсюда
            </a>
        `
    }
};

// 2. Определяем, какую страницу открыл пользователь
const urlParams = new URLSearchParams(window.location.search);
let pageType = urlParams.get('type');

// Если параметр пустой ИЛИ такого ключа нет в нашей базе данных — включаем "nothing"
if (!pageType || !contentData[pageType]) {
    pageType = 'nothing';
}

// Теперь безопасно берем данные
const data = contentData[pageType];

if (data) {
    // Заполняем тексты
    document.getElementById('page-title').innerHTML = data.title;
    document.getElementById('page-text').innerHTML = data.text;

    // Генерируем скриншоты в цикле
    const screenshotsContainer = document.getElementById('screenshots-container');
    const modalOverlay = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openImageModal(src) {
        modalImage.src = src;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalImage.src = '';
    }

    closeModalBtn.addEventListener('click', closeImageModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeImageModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeImageModal();
        }
    });

    for (let i = 1; i <= data.imagesCount; i++) {
        const imgCard = document.createElement('div');
        imgCard.className = "screenshot-card aspect-[16/9] rounded-2xl card-glass border border-white/10 hover:border-green-500/30 overflow-hidden flex items-center justify-center group transition-all duration-300";
        
        const img = document.createElement('img');
        img.src = `${data.folder}/${i}.png`;
        img.alt = `Скриншот ${i}`;
        img.className = "screenshot-image w-full h-full object-cover hidden";
        img.addEventListener('load', () => {
            img.classList.remove('hidden');
            syncHistorySize();
        });
        img.addEventListener('click', () => openImageModal(img.src));
        imgCard.appendChild(img);
        screenshotsContainer.appendChild(imgCard);
    }
}

// Анимация частиц
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particle.style.opacity = 0.3 + Math.random() * 0.4;
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function syncHistorySize() {
    const screenshots = document.getElementById('screenshots-container');
    const historyCard = document.getElementById('historyCard');
    if (!screenshots || !historyCard) return;

    const computedStyles = getComputedStyle(screenshots);
    const width = screenshots.clientWidth + parseFloat(computedStyles.paddingLeft) + parseFloat(computedStyles.paddingRight);
    const height = screenshots.offsetHeight;

    historyCard.style.minWidth = `${width}px`;
    historyCard.style.minHeight = `${height}px`;
}

createParticles();
window.addEventListener('resize', syncHistorySize);
