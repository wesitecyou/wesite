document.addEventListener("DOMContentLoaded", () => {
    // sidebar
    const toggleButton = document.querySelector(".toggle-toc");
    const sidebarToc = document.querySelector(".sidebar-toc");
    const contentTopTitle = document.querySelector(".content-top-title");
    const backToTheTop = document.querySelector(".back-to-the-top");

    let isHidden = false;

    toggleButton.addEventListener("click", () => {
        if (isHidden) {
            sidebarToc.style.position = 'relative';
            sidebarToc.classList.remove("hidden");
            toggleButton.textContent = "⇦";
            toggleButton.title = "收起目录";
            contentTopTitle.style.display = 'none';

        } else {
            sidebarToc.style.position = 'absolute';
            sidebarToc.classList.add("hidden");
            toggleButton.textContent = "⇨";
            toggleButton.title = "展开目录";
            contentTopTitle.style.display = 'flex';
        }
        isHidden = !isHidden;
    });
    //--------------------------------------------
    
    // ----------------------------------------------

    // mobi-sidebar
    const toggleButtonMobi = document.querySelector(".mobi-toggle-toc");
    const sidebarTocMobi = document.querySelector(".sidebar-toc");
    const contentMobi = document.querySelector(".content");


    let isHiddenMobi = false;

    toggleButtonMobi.addEventListener("click", () => {
        if (isHiddenMobi) {
            sidebarTocMobi.style.display = 'none';
            toggleButtonMobi.textContent = "⇨";
            toggleButtonMobi.title = "展开目录";
            contentMobi.style.minWidth = "100%";

        } else {
            sidebarTocMobi.style.display = 'flex';
            toggleButtonMobi.textContent = "⇦";
            toggleButtonMobi.title = "收起目录";
            contentMobi.style.minWidth = "calc(100% - 100px)";

        }
        isHiddenMobi = !isHiddenMobi;
    });

// ----------------------------------------   

    // toggle-color
    // 获取所有链接元素，类名为 toggle-color
    const toggleColorLinks = document.querySelectorAll('.toggle-color');

    // 为每个链接添加点击事件
    toggleColorLinks.forEach(link => {
        link.addEventListener('click', function () {
            // 先移除所有链接的高亮样式
            toggleColorLinks.forEach(l => l.classList.remove('active'));

            // 给当前点击的链接添加高亮样式
            this.classList.add('active');
        });
    });

});

// ----------------------------------------
function updateTime() {
    const date = new Date();
    
    // 日期处理[1,4](@ref)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // 时间处理（去除秒）[5,7](@ref)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // 星期处理[1,4](@ref)
    const weekDays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    const week = weekDays[date.getDay()];

    // 组合显示内容[5](@ref)
    const timeString = `${year}-${month}-${day} ${week} ${hours}:${minutes}`;
    document.getElementById('timeBox').textContent = timeString;
}

// 初始显示
updateTime();
// 每分钟更新（与秒无关）[5](@ref)
setInterval(updateTime, 60000);
// -----------------------------------------

// ---------------------------------------------------

// search
// 定义分类和对应的搜索引擎
const categories = {
    '搜索': [
        { name: '百度', engine: 'baidu' },
        { name: '谷歌', engine: 'google' },
        { name: '搜狗', engine: 'sogou' },
        { name: '必应', engine: 'bing' },
        { name: '站内', engine: 'insite' }
    ],
    '社区': [
        { name: '知乎', engine: 'zhihu' },
        { name: '贴吧', engine: 'tieba' },
        { name: '豆瓣', engine: 'douban' },
        { name: '微博', engine: 'weibo' },
        { name: '小红书', engine: 'xhs' }
    ],
    '购物': [
        { name: '淘宝', engine: 'taobao' },
        { name: '天猫', engine: 'tmall' },
        { name: '闲鱼', engine: 'goofish' },
        { name: '京东', engine: 'jd' },
        { name: '亚马逊', engine: 'amazon' },
    ],
    '图片': [
        { name: '百度图片', engine: 'duckduckgo' },
        { name: '小红书', engine: 'startpage' },
        { name: '堆糖', engine: 'duckduckgo' },
        { name: '花瓣', engine: 'startpage' },
        { name: '谷歌图片', engine: 'startpage' },

    ],
    '视频': [
        { name: '哔哩哔哩', engine: 'duckduckgo' },
        { name: '腾讯视频', engine: 'startpage' },
        { name: '爱奇艺', engine: 'duckduckgo' },
        { name: '优酷', engine: 'startpage' },
        { name: 'FreeOK', engine: 'startpage' }
    ],
    '音乐': [
        { name: 'Apple Music', engine: 'applemusic' },
        { name: 'QQ音乐', engine: 'qqmusic' },
        { name: '酷狗', engine: 'kugou' },
        { name: '网易云音乐', engine: 'wyyyy' },
        { name: '酷我', engine: 'kuwo' },
        { name: 'Spotify', engine: 'spotify' },
        { name: 'MyFreeMP3', engine: 'myfreemp3' }
    ],
    '读书': [
        { name: '豆瓣读书', engine: 'dbbook' },
        { name: 'Z-Library', engine: 'z-lib' },
        { name: '安娜的档案', engine: 'anna' },
        { name: '古腾堡计划', engine: 'gutenberg' },
        { name: 'LibGen', engine: 'libgen' }
    ],
    '更多': [
        { name: '翻译', engine: 'dbbook' },
        { name: '快递查询', engine: 'z-lib' },
        { name: '软件下载', engine: 'anna' },
        { name: 'Whois', engine: 'gutenberg' },
        { name: 'LibGen', engine: 'libgen' }
    ]
};

// 当前选中的分类和搜索引擎
let currentCategory = null;

// 获取容器元素
const categoryContainer = document.getElementById('categoryContainer');
const searchEngineContainer = document.getElementById('searchEngineContainer');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search');

// 初始化分类按钮
function initCategories() {
    const categoryNames = Object.keys(categories);
    categoryNames.forEach((category, index) => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-button');
        if (index === 0) {
            button.classList.add('active');
            currentCategory = category;
        }
        button.addEventListener('click', () => {
            switchCategory(category);
        });
        categoryContainer.appendChild(button);
    });
}

// 初始化搜索引擎按钮
function initSearchEngines() {
    renderSearchEngines(currentCategory);
}

// 切换分类
function switchCategory(category) {
    if (currentCategory === category) return;

    // 更新分类按钮的样式
    const buttons = categoryContainer.getElementsByClassName('category-button');
    Array.from(buttons).forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    currentCategory = category;
    renderSearchEngines(category);
}

// 渲染搜索引擎按钮
function renderSearchEngines(category) {
    // 清空当前的搜索引擎按钮
    searchEngineContainer.innerHTML = '';

    const engines = categories[category];
    engines.forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = item.name;
        if (index === 0) {
            button.classList.add('active');
            changeSearchEngine(item.engine);
        }
        button.addEventListener('click', () => {
            // 移除其他按钮的active状态
            const buttons = searchEngineContainer.getElementsByTagName('button');
            Array.from(buttons).forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active状态
            button.classList.add('active');
            // 更改搜索引擎
            changeSearchEngine(item.engine);
        });
        searchEngineContainer.appendChild(button);
    });
}

// 更改搜索引擎
function changeSearchEngine(engine) {
    let baseUrl = ''; // 包含了所有固定参数的基础链接

    switch (engine) {
        case 'baidu':
            baseUrl = 'https://www.baidu.com/s?wd=';
            break;
        case 'google':
            baseUrl = 'https://www.google.com/search?q=';
            break;
        case 'bing':
            baseUrl = 'https://www.bing.com/search?q=';
            break;
        case 'duckduckgo':
            baseUrl = 'https://duckduckgo.com/?q=';
            break;
        case 'startpage':
            baseUrl = 'https://www.startpage.com/do/search?query=';
            break;
        // 读书
        case 'z-lib':
            baseUrl = 'https://zh.z-library.sk/s/';
            break;
        // 音乐
        case 'applemusic':
            baseUrl = 'https://music.apple.com/cn/search?term=';
            break;
        case 'qqmusic':
            baseUrl = 'https://y.qq.com/n/ryqq/search?w=';
            break;
        case 'kugou':
            baseUrl = 'https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=';
            break;
        case 'kuwo':
            baseUrl = 'https://kuwo.cn/search/list?key=';
            break;
        case 'wyyyy':
            baseUrl = 'https://music.163.com/#/search/m/?s=';
            break;
        case 'myfreemp3':
            baseUrl = 'https://tool.liumingye.cn/music/#/search/M/song/';
            break;
        // 默认
        default:
            baseUrl = 'https://www.baidu.com/s?wd=';
    }

    // 设置全局变量以便在表单提交时使用
    window.searchBaseUrl = baseUrl;
}

// 提交表单时构建完整的URL
searchForm.addEventListener('submit', function (event) {
    // event.preventDefault(); 

    const keyword = encodeURIComponent(searchInput.value); // 编码关键词以防止特殊字符问题


    let fullUrl = `${window.searchBaseUrl}${keyword}`;

    // 如果有额外的查询参数，则添加到URL中
    // if (window.searchQueryParams && !window.searchBaseUrl.includes('?')) {
    //     fullUrl += `&${window.searchQueryParams}`;
    // } else if (window.searchQueryParams) {
    //     fullUrl += `${window.searchQueryParams}`;
    // }

    // 重定向到构建的完整URL
    window.open(fullUrl, '_blank');
});

// 初始化页面
window.onload = function () {
    initCategories();
    initSearchEngines();
};