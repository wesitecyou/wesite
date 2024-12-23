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

// document.getElementById('tableDropdown').addEventListener('focus', function() {
//     this.querySelector('option[value=""]').style.display = 'none';
// });
// document.getElementById('tableDropdown').addEventListener('blur', function() {
//     if (this.value === '') {
//         this.querySelector('option[value=""]').style.display = 'block';
//     }
// });

// function navigateToLink() {
//     var dropdown = document.getElementById("tableDropdown");
//     var selectedValue = dropdown.value;
//     if (selectedValue) {
//         window.open(selectedValue, '_blank');
//     }
// }



// page2分类折叠
function toggleCategory(categoryId) {
    var subButtons = document.getElementById(categoryId);
    if (subButtons.style.display === 'block') {
      subButtons.style.display = 'none';
    } else {
      subButtons.style.display = 'block';
    }
  }
  

  function toggleCategory(categoryId) {
    var subButtons = document.getElementById(categoryId);
    if (subButtons.style.display === 'block') {
      subButtons.style.display = 'none';
    } else {
      subButtons.style.display = 'block';
    }
  }
  
  function loadContent(page) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<iframe src="' + page + '" width="100%" height="100dvh"></iframe>';
  }


  var sidebar = document.getElementById('sidebar');
  var content = document.getElementById('content');
  var toggleButton = document.getElementById('toggle-button');
  var isSidebarVisible = false;

  toggleButton.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    if (isSidebarVisible) {
      // sidebar.style.width = '0';
      // sidebar.style.padding = '3dvh 0';
      
      content.style.width = '100dvw';
      toggleButton.style.left = '0';
      toggleButton.textContent = '展开';
      isSidebarVisible = false;
    } else {
      // sidebar.style.width = '15dvw';
      // sidebar.style.padding = '3dvh 1dvw';
    //   sidebar.style.position = 'fixed';
    // sidebar.style.position = 'absolute';
      content.style.width = '85dvw';
      toggleButton.style.left = '15dvw';
      toggleButton.textContent = '收起';
      isSidebarVisible = true;
    }
  });