document.addEventListener('DOMContentLoaded', (event) => {
    let userLang = localStorage.getItem('userLang');
    
    if (!userLang) {
        userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('zh-TW')) {
            userLang = 'zh-TW';
        } else if (userLang.startsWith('zh')) {
            userLang = 'zh-CN';
        } else {
            userLang = 'en';
        }
    }

    setLanguage(userLang);
});

function setLanguage(lang) {
    localStorage.setItem('userLang', lang);
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        element.style.display = element.getAttribute('data-lang') === lang ? 'block' : 'none';
    });

    // 设置网页标题
    const titles = {
        'en': 'Language Switcher',
        'zh-CN': '语言切换器',
        'zh-TW': '語言切換器'
    };
    document.getElementById('page-title').innerText = titles[lang];
}