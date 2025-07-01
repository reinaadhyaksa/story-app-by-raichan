export default class NotFoundPage {
    constructor() {
        this.template = `
        <div class="not-found-page">
            <div class="not-found-container">
                <div class="not-found-animation">
                <svg class="barca-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- FC Barcelona Logo Simplified -->
                    <circle cx="50" cy="50" r="45" fill="#a50044" stroke="#004d98" stroke-width="3"/>
                    <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="#edbb00" stroke-width="4"/>
                    <path d="M50,20 L50,80 M20,50 L80,50" stroke="#ffffff" stroke-width="3"/>
                </svg>
                <h1 class="not-found-title">404</h1>
                </div>
                <h2 class="not-found-subtitle">Oops! Page Not Found</h2>
                <p class="not-found-message">Halaman tidak tersedia.</p>
                <a href="/" class="not-found-button">
                <span>Kembali ke beranda</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </a>
            </div>
        </div>
      `;
    }

    render() {
        return this.template;
    }
}