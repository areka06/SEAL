function fetchNews() {
    const kategori = document.getElementById('kategori').value;
    const url = `https://api-berita-indonesia.vercel.app/cnn/${kategori}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            const container = document.getElementById('news-container');
            container.innerHTML = '';
            
            if (data.success && data.data && Array.isArray(data.data.posts)) {
                data.data.posts.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    newsItem.innerHTML = `
                        <h2>${item.title || 'No Title'}</h2>
                        <p>${item.description || 'No Description'}</p>
                        <img src="${item.thumbnail || 'https://via.placeholder.com/100'}" alt="Thumbnail">
                        <a href="${item.link || '#'}" target="_blank">Baca lebih lanjut</a>
                    `;
                    container.appendChild(newsItem);
                });
            } else {
                container.innerHTML = '<p>No news available</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}