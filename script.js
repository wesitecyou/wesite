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
    if (selectedEngines.size === 0) {
        alert("请至少选择一个搜索引擎");
        return;
    }

    var query = document.getElementById('searchBox').value;
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
        }
        window.open(searchUrl, '_blank');
    });
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



// // Enter key---------------------------------------------------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', function () {
//     // 获取输入框和按钮的引用
//     var input = document.getElementById('searchBox');
//     var button = document.getElementById('searchButton');
//     // 为输入框添加键盘按下事件监听器
//     input.addEventListener('keypress', function (event) {
//         // 检查按下的键是否是'Enter'
//         if (event.key === 'Enter') {
//             // 阻止Enter键的默认行为（例如表单提交）
//             event.preventDefault();
//             // 触发按钮的点击事件
//             button.click();
//         }
//     });
// });

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