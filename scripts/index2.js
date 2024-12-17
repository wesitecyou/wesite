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
  