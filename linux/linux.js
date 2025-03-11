// 应用数据
const apps = [
    {
        name: "Visual Studio Code",
        author: "Microsoft",
        category: "development",
        description: "微软推出的现代化代码编辑器，支持多种编程语言",
        icon: "https://code.visualstudio.com/assets/favicon.ico",
        official: "https://code.visualstudio.com/",
        x86deb: "https://code.visualstudio.com/docs/?dv=linux64_deb",
        download: "https://code.visualstudio.com/Download"
    },
    {
        name: "LibreOffice",
        author: "The Document Foundation",
        category: "office",
        description: "功能强大的开源办公套件，完美兼容Microsoft Office格式",
        icon: "https://www.libreoffice.org/assets/Common/images/favicon.ico",
        official: "https://www.libreoffice.org",
        deb: "https://www.libreoffice.org/donate/dl/deb-x86_64/25.2.1/zh-CN/LibreOffice_25.2.1_Linux_x86-64_deb.tar.gz",
        rpm: "https://download.documentfoundation.org/libreoffice/stable/latest/rpm/x86_64/LibreOffice_24.2.5_Linux_x86-64_rpm.tar.gz"
    },
    {
        name: "Steam",
        author: "Microsoft",
        category: "game",
        description: "全球最大的数字游戏发行平台，畅玩数万款游戏",
        icon: "https://store.steampowered.com/favicon.ico",
        official: "https://store.steampowered.com",
        deb: "https://cdn.cloudflare.steamstatic.com/client/installer/steam.deb",
        rpm: "https://cdn.cloudflare.steamstatic.com/client/installer/steam.rpm"
    },
    {
        name: "GIMP",
        author: "Microsoft",
        category: "multimedia",
        description: "专业级开源图像编辑器，媲美Photoshop",
        icon: "https://www.gimp.org/images/favicon.png",
        official: "https://www.gimp.org",
        deb: "https://download.gimp.org/mirror/pub/gimp/v2.10/gimp-2.10.34.tar.bz2",
        rpm: "https://download.gimp.org/mirror/pub/gimp/v2.10/gimp-2.10.34.tar.bz2"
    }
];

// DOM元素
const searchInput = document.querySelector('.search-box');
const appList = document.getElementById('app-list');
const categories = document.querySelectorAll('.category-item');

// 渲染应用卡片
function renderApps(filteredApps = apps) {
    appList.innerHTML = filteredApps.map(app => `
        <article class="app-card">
            <div class="app-header">
                <img src="${app.icon}" class="app-icon" alt="${app.name}图标" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzM0OThkYiIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMTguNWMtNC42OSAwLTguNS0zLjgxLTguNS04LjVTNy4zMSAzLjUgMTIgMy41czguNSAzLjgxIDguNSA4LjUtMy44MSA4LjUtOC41IDguNXpNMTIgN2MtMi43NiAwLTUgMi4yNC01IDVzMi4yNCA1IDUgNS01LTIuMjQtNS01IDIuMjQtNSA1LTV6Ii8+PC9zdmc+'">
                <div>
                    <h2 class="app-title">${app.name}</h2>
                    <div class="app-author">${app.author}</div>
                </div>
            </div>
            <p class="app-description">${app.description}</p>
            <div class="button-group">
                <a href="${app.official}" 
                   class="action-btn btn-official"
                   target="_blank"
                   rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    官网
                </a>
                <a href="${app.x86deb}" 
                   class="action-btn btn-deb"
                   download="package.deb">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm8-6v-3h-2v3H8l4 4 4-4h-3z"/>
                    </svg>
                    x86 .deb
                </a>
                <a href="${app.download}" 
                   class="action-btn btn-rpm"
                   download="package.rpm">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13H8v2h3v3h2v-3h3V7h-6z"/>
                    </svg>
                    下载
                </a>
            </div>
        </article>
    `).join('');
}

// 分类过滤
function filterByCategory(category) {
    const filtered = category === 'all' 
        ? apps 
        : apps.filter(app => app.category === category);
    renderApps(filtered);
}

// 搜索过滤
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = apps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) || 
        app.description.toLowerCase().includes(searchTerm)
    );
    renderApps(filtered);
}

// 事件监听
categories.forEach(item => {
    item.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        item.classList.add('active');
        filterByCategory(item.dataset.category);
    });
});

searchInput.addEventListener('input', handleSearch);

// 初始渲染
document.addEventListener('DOMContentLoaded', () => {
    renderApps();
    document.querySelector('[data-category="all"]').classList.add('active');
});