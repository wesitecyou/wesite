// Keep auto focus input
function keepFocusOnInput() {
    var input = document.getElementById('searchBox');
    // 确保输入框存在
    if (input) {
        input.focus();
    }
}
// 当文档加载完毕时执行函数
window.onload = function () {
    keepFocusOnInput();
    // 监听整个页面的点击事件
    document.addEventListener('click', function (event) {
        // 阻止默认行为，比如链接的点击跳转
        event.preventDefault();
        // 调用函数使输入框保持焦点
        keepFocusOnInput();
    });
};

// Select, Input, Search-----------------------------------------------------------------------------------------------
// 初始化时默认选中百度
var selectedEngines = new Set(['baidu']);

// 切换搜索引擎的选中状态
function selectEngine(engine) {
    if (selectedEngines.has(engine)) {
        selectedEngines.delete(engine); // 如果已经选中，则取消选中
        document.getElementById(engine).classList.remove('active');
    } else {
        selectedEngines.add(engine); // 如果未选中，则添加到选中集合
        document.getElementById(engine).classList.add('active');
    }
}

// 确保在页面加载时百度是选中状态
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('baidu').classList.add('active');
});

// 执行搜索
function performSearch() {
    var query = document.getElementById('searchBox').value.trim();
    if (query === '') {
        // 如果输入框为空
        if (selectedEngines.size === 0) {
            alert("请至少选择一个搜索引擎");
            return;
        }
        // 打开选中的搜索引擎的首页
        selectedEngines.forEach(function (engine) {
            var defaultSearchUrl;
            switch (engine) {
                case 'baidu':
                    defaultSearchUrl = "https://www.baidu.com/";
                    break;
                case 'bing':
                    defaultSearchUrl = "https://cn.bing.com/";
                    break;
                case 'sogou':
                    defaultSearchUrl = "https://www.sogou.com/";
                    break;
                case 'zhihu':
                    defaultSearchUrl = "https://www.zhihu.com/";
                    break;
                case 'weixin':
                    defaultSearchUrl = "https://weixin.sogou.com/";
                    break;
                case 'google':
                    defaultSearchUrl = "https://www.google.com/";
                    break;
                case 'weibo':
                    defaultSearchUrl = "https://weibo.com/";
                    break;
                case 'douban':
                    defaultSearchUrl = "https://www.douban.com/";
                    break;
                // case 'wangpan':
                //     defaultSearchUrl = "https://s.quark.cn/";
                //     break;
                case 'baidutupian':
                    defaultSearchUrl = "https://image.baidu.com/";
                    break;
                case 'bilibili':
                    defaultSearchUrl = "https://www.bilibili.com/";
                    break;
                case 'tieba':
                    defaultSearchUrl = "https://tieba.baidu.com/";
                    break;
                case 'music':
                    defaultSearchUrl = "https://tools.liumingye.cn/music/#/";
                    break;
                case 'baike':
                    defaultSearchUrl = "https://baike.baidu.com/";
                    break;
                case 'yingshi':
                    defaultSearchUrl = "https://www.freeok.vip/";
                    break;
                case 'wangpan':
                    defaultSearchUrl = "https://www.dashengpan.com/";
                    break;
                case 'amap':
                    defaultSearchUrl = "https://www.amap.com/";
                    break;
                case 'github':
                    defaultSearchUrl = "https://github.com/";
                    break;
                case 'douyin':
                    defaultSearchUrl = "https://www.douyin.com/discover";
                    break;
                case 'kuaishou':
                    defaultSearchUrl = "https://www.kuaishou.com/brilliant";
                    break;
                case 'xiachufang':
                    defaultSearchUrl = "https://www.xiachufang.com/";
                    break;
                case 'fanyi':
                    defaultSearchUrl = "https://fanyi.baidu.com/";
                    break;
                case 'cnki':
                    defaultSearchUrl = "https://www.cnki.net/";
                    break;
                case 'weipu':
                    defaultSearchUrl = "https://www.cqvip.com/";
                    break;
                case 'wanfang':
                    defaultSearchUrl = "https://www.wanfangdata.com.cn/";
                    break;
                case 'chaoxing':
                    defaultSearchUrl = "https://qikan.chaoxing.com/";
                    break;
                case 'Google Scholar':
                    defaultSearchUrl = "https://scholar.google.com/";
                    break;
                case 'baiduxueshu':
                    defaultSearchUrl = "https://xueshu.baidu.com/";
                    break;
            }
            window.open(defaultSearchUrl, '_blank');
        });
    } else {
        // 输入框有内容，执行搜索
        if (selectedEngines.size === 0) {
            alert("请至少选择一个搜索引擎");
            return;
        }
        selectedEngines.forEach(function (engine) {
            var searchUrl;
            switch (engine) {
                case 'baidu':
                    searchUrl = "https://www.baidu.com/s?wd=" + encodeURIComponent(query);
                    break;
                case 'bing':
                    searchUrl = "https://cn.bing.com/search?q=" + encodeURIComponent(query);
                    break;
                case 'sogou':
                    searchUrl = "https://www.sogou.com/web?query=" + encodeURIComponent(query);
                    break;
                case 'zhihu':
                    searchUrl = "https://www.zhihu.com/search?type=content&q=" + encodeURIComponent(query);
                    break;
                case 'weixin':
                    searchUrl = "https://weixin.sogou.com/weixin?ie=utf8&type=2&query=" + encodeURIComponent(query);
                    break;
                case 'google':
                    searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
                    break;
                case 'weibo':
                    searchUrl = "https://s.weibo.com/weibo?q=" + encodeURIComponent(query);
                    break;
                case 'douban':
                    searchUrl = "https://www.douban.com/search?q=" + encodeURIComponent(query);
                    break;
                case 'baidutupian':
                    searchUrl = "https://image.baidu.com/search/index?tn=baiduimage&word=" + encodeURIComponent(query);
                    break;
                case 'bilibili':
                    searchUrl = "https://search.bilibili.com/video?keyword=" + encodeURIComponent(query);
                    break;
                case 'tieba':
                    searchUrl = "https://tieba.baidu.com/f/search/res?ie=utf-8&qw=" + encodeURIComponent(query);
                    break;
                case 'music':
                    searchUrl = "https://tools.liumingye.cn/music/#/search/M/song/" + encodeURIComponent(query);
                    break;
                case 'baike':
                    searchUrl = "https://baike.baidu.com/search?enc=utf8&word=" + encodeURIComponent(query);
                    break;
                case 'yingshi':
                    searchUrl = "https://www.freeok.vip/so1so/-------------.html?wd=" + encodeURIComponent(query);
                    break;
                case 'wangpan':
                    searchUrl = "https://www.dashengpan.com/#/main/search?keyword=" + encodeURIComponent(query);
                    break;
                case 'amap':
                    searchUrl = "https://www.amap.com/search?query=" + encodeURIComponent(query);
                    break;
                case 'github':
                    searchUrl = "https://github.com/search?q=" + encodeURIComponent(query) + "&type=repositories";
                    break;
                case 'douyin':
                    searchUrl = "https://www.douyin.com/search/" + encodeURIComponent(query) + "?type=general";
                    break;
                case 'kuaishou':
                    searchUrl = "https://www.kuaishou.com/search/video?searchKey=" + encodeURIComponent(query);
                    break;
                case 'xiachufang':
                    searchUrl = "https://www.xiachufang.com/search/?keyword=" + encodeURIComponent(query);
                    break;
                case 'fanyi':
                    searchUrl = "https://fanyi.baidu.com/mtpe-individual/multimodal?query=" + encodeURIComponent(query) + "&lang=auto2auto";
                    break;
                case 'cnki':
                    searchUrl = "https://kns.cnki.net/kns8s/defaultresult/index?korder=SU&kw=" + encodeURIComponent(query);
                    break;
                case 'weipu':
                    searchUrl = "https://www.cqvip.com/search?k=" + encodeURIComponent(query);
                    break;
                case 'wanfang':
                    searchUrl = "https://s.wanfangdata.com.cn/paper?q=" + encodeURIComponent(query);
                    break;
                case 'chaoxing':
                    searchUrl = "https://qikan.chaoxing.com/searchjour?sw=" + encodeURIComponent(query) + "&topsearch=0&size=100";
                    break;
                case 'Google Scholar':
                    searchUrl = "https://scholar.google.com/scholar?hl=zh-CN&q=" + encodeURIComponent(query);
                    break;
                case 'baiduxueshu':
                    searchUrl = "https://xueshu.baidu.com/s?wd=" + encodeURIComponent(query) + "&rsv_bp=0&tn=SE_baiduxueshu_c1gjeupa&rsv_spt=3&ie=utf-8&f=3&rsv_sug2=1&sc_f_para=sc_tasktype%3D%7BfirstSimpleSearch%7D&rsp=1";
                    break;
            }
            window.open(searchUrl, '_blank');
        });
    }
}

// 监听键盘事件，当用户按下Enter键时执行搜索
document.addEventListener('DOMContentLoaded', function () {
    // 获取输入框和按钮的引用
    var input = document.getElementById('searchBox');
    var button = document.getElementById('searchButton');
    // 为输入框添加键盘按下事件监听器
    input.addEventListener('keypress', function (event) {
        // 检查按下的键是否是'Enter'
        if (event.key === 'Enter') {
            // 阻止Enter键的默认行为（例如表单提交）
            event.preventDefault();
            // 触发按钮的点击事件
            button.click();
        }
    });
});

// 网址链接-----------------------------------------------------------------------------------------------------------------
function showCategory(categoryId) {
    // Remove active class from all category buttons
    var categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(function (button) {
        button.classList.remove('active');
    });

    // Add active class to the clicked category button
    event.target.classList.add('active');

    // Hide all category lists
    var categoryLists = document.querySelectorAll('.category-list');
    categoryLists.forEach(function (list) {
        list.classList.remove('active');
    });

    // Show the selected category list
    var selectedCategory = document.getElementById(categoryId);
    selectedCategory.classList.add('active');
}





// ------------------------------------------------------------
// function selectEngine(engine) {
//     console.log("Selected engine: " + engine);
//     // 这里可以添加更多选择搜索引擎后的逻辑
// }

function toggleMoreTop() {
    var moreOptions = document.getElementById('moreOptionsTop');
    moreOptions.style.display = moreOptions.style.display === 'flex' ? 'none' : 'flex';
}
function toggleMoreBottom() {
    var moreOptions = document.getElementById('moreOptionsBottom');
    moreOptions.style.display = moreOptions.style.display === 'flex' ? 'none' : 'flex';
}






// ppppppppppppppppppp
