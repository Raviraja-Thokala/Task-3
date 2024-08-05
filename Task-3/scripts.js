// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const dragDropArea = document.getElementById('dragDropArea');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');
    const fileList = document.getElementById('fileList');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drag area
    ['dragenter', 'dragover'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, () => {
            dragDropArea.classList.add('highlight');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, () => {
            dragDropArea.classList.remove('highlight');
        }, false);
    });

    // Handle dropped files
    dragDropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle browse files
    browseButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        ([...files]).forEach(displayFile);
    }

    function displayFile(file) {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
        fileList.appendChild(fileItem);
    }
});
