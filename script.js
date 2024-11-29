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

// -----------------------------P2------------------------------
function showSheet(sheetId) {
    // Hide all sheets
    document.querySelectorAll('.sheet').forEach(sheet => {
        sheet.classList.remove('active');
    });
    // Show the selected sheet
    document.getElementById(sheetId).classList.add('active');
}

document.getElementById('tableDropdown').addEventListener('focus', function() {
    this.querySelector('option[value=""]').style.display = 'none';
});
document.getElementById('tableDropdown').addEventListener('blur', function() {
    if (this.value === '') {
        this.querySelector('option[value=""]').style.display = 'block';
    }
});

function navigateToLink() {
    var dropdown = document.getElementById("tableDropdown");
    var selectedValue = dropdown.value;
    if (selectedValue) {
        window.open(selectedValue, '_blank');
    }
}