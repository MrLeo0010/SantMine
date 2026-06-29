document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyIPBtn');
    const ipTextElement = document.getElementById('serverIP');
    const copyIcon = document.getElementById('copyIcon');
    const checkIcon = document.getElementById('checkIcon');

    if (!copyButton || !ipTextElement || !copyIcon || !checkIcon) {
        console.warn('Не удалось найти элементы копирования IP на странице.');
        return;
    }

    copyButton.addEventListener('click', async () => {
        const ipText = ipTextElement.innerText.trim();

        if (!navigator.clipboard) {
            console.error('Clipboard API не поддерживается.');
            return;
        }

        try {
            await navigator.clipboard.writeText(ipText);
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');

            setTimeout(() => {
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
            }, 2000);
        } catch (err) {
            console.error('Ошибка при копировании IP:', err);
        }
    });
});
