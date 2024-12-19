document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const fileList = e.target.files;
            const previewContainer = document.createElement('div');
            previewContainer.className = 'file-preview';
            
            // Очищаем предыдущий предпросмотр
            const existingPreview = input.parentElement.querySelector('.file-preview');
            if (existingPreview) {
                existingPreview.remove();
            }

            // Создаем предпросмотр для каждого файла
            Array.from(fileList).forEach(file => {
                const preview = document.createElement('div');
                preview.className = 'file-item';

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    preview.appendChild(img);
                }

                const info = document.createElement('span');
                info.textContent = `${file.name} (${formatFileSize(file.size)})`;
                preview.appendChild(info);

                previewContainer.appendChild(preview);
            });

            input.parentElement.appendChild(previewContainer);
        });
    });

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 