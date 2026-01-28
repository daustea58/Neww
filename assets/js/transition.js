// Page transition with loading overlay

const loadingTexts = [
    "Tunggu sebentar ya… aku lagi nyiapin cerita kita 💙",
    "Pelan-pelan… kenangan nggak bisa dibuka buru-buru",
    "Sedang membuka bagian yang paling aku syukuri…",
    "Sebentar ya, lagi nyiapin sesuatu yang spesial…",
    "Aku senang kamu mau lihat cerita kita 💙"
];

function navigateWithTransition(targetPage) {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    const progressFill = document.getElementById('progressFill');
    
    // Show overlay
    overlay.classList.add('active');
    
    // Random loading text
    const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
    loadingText.textContent = randomText;
    
    // Animate progress bar
    setTimeout(() => {
        progressFill.style.width = '100%';
    }, 100);
    
    // Navigate after delay
    setTimeout(() => {
        window.location.href = targetPage;
    }, 1800);
}

// Handle back/forward navigation
window.addEventListener('pageshow', function(event) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
});
