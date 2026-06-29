document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadBtn');
    const githubReleaseApi = 'https://api.github.com/repos/santayar/Resourspack-SantMine/releases/latest';
    const filename = 'SantMine.zip';

    if (!downloadButton) {
        console.warn('Кнопка загрузки не найдена: #downloadBtn');
        return;
    }

    downloadButton.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const releaseResponse = await fetch(githubReleaseApi);
            if (!releaseResponse.ok) {
                throw new Error(`Не удалось получить данные релиза: ${releaseResponse.status} ${releaseResponse.statusText}`);
            }

            const releaseData = await releaseResponse.json();
            const asset = (releaseData.assets || []).find(assetItem => assetItem.name.endsWith('.zip'));

            if (!asset || !asset.browser_download_url) {
                throw new Error('ZIP-ассет последнего релиза не найден.');
            }

            const downloadUrl = asset.browser_download_url;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Ошибка при скачивании последней версии:', err);
            window.open('https://github.com/santayar/Resourspack-SantMine/releases/latest', '_blank');
        }
    });
});
