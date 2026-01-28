# Audio Folder

Folder ini disediakan untuk file audio lokal jika diperlukan di masa depan.

Saat ini, website menggunakan YouTube IFrame API untuk memutar musik "Perfect" by Ed Sheeran secara langsung dari YouTube, sehingga tidak perlu file audio lokal.

## Jika Ingin Menggunakan File Audio Lokal

1. Tambahkan file MP3/audio ke folder ini
2. Edit `assets/js/music.js` untuk menggunakan HTML5 Audio API
3. Update referensi dari YouTube embed ke file lokal

Contoh:
```javascript
const audio = new Audio('assets/audio/perfect.mp3');
audio.play();
```
