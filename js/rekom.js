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
            console.log(data); // Untuk memeriksa struktur data
            const container = document.querySelectorAll('.rekomendasicontent');

            if (data.success && data.data && Array.isArray(data.data.posts)) {
                // Iterasi untuk mengisi container dengan data dari API
                data.data.posts.slice(0, container.length).forEach((item, index) => {
                    const newsItem = container[index];
                    const imgElement = newsItem.querySelector('.rekomendasiimg img');
                    const titleElement = document.createElement('h2');
                    const pubDateElement = document.createElement('p');
                    const linkElement = document.createElement('a');
                    
                    // Set gambar, judul, dan tanggal
                    imgElement.src = item.thumbnail || 'https://via.placeholder.com/100';
                    imgElement.alt = item.title || 'Thumbnail';
                    
                    titleElement.textContent = item.title || 'No Title';
                    pubDateElement.textContent = `Published on: ${new Date(item.pubDate).toLocaleDateString()}`;
                    linkElement.href = item.link || '#';
                    linkElement.textContent = 'Baca lebih lanjut';
                    linkElement.target = '_blank';

                    // Bersihkan konten lama sebelum menambah yang baru
                    newsItem.innerHTML = '';
                    newsItem.appendChild(imgElement);
                    newsItem.appendChild(titleElement);
                    newsItem.appendChild(pubDateElement);
                    newsItem.appendChild(linkElement);
                });
            } else {
                container.forEach(item => {
                    item.innerHTML = '<p>No news available</p>';
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
