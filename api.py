import requests

kategori = 'terbaru'  # Ganti dengan kategori yang diinginkan
url = f'https://api-berita-indonesia.vercel.app/cnn/{kategori}'

response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Error fetching data: {response.status_code}')
