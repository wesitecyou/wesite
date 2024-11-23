let currentPage = 0;
const pages = document.querySelectorAll('.page');
const container = document.querySelector('.container');

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        // 向下滚动
        currentPage = Math.min(currentPage + 1, pages.length - 1);
    } else {
        // 向上滚动
        currentPage = Math.max(currentPage - 1, 0);
    }
    scrollToPage(currentPage);
    event.preventDefault(); // 防止页面滚动
}, { passive: false }); // 设置为非被动模式

function scrollToPage(pageIndex) {
    const scrollToPosition = pageIndex * window.innerHeight;
    container.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth' // 平滑滚动
    });
}
