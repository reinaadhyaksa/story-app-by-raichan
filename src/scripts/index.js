import '../styles/styles.css';
import '../styles/responsives.css';
import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';
import { registerServiceWorker } from './utils';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 


async function initializeApp(retryCount = 0) {
  window.appLoaded = false;

  try {
    const mainContent = document.getElementById('main-content');
    const drawerButton = document.getElementById('drawer-button');
    const navigationDrawer = document.getElementById('navigation-drawer');
    const skipLink = document.getElementById('skip-link');

    if (!mainContent || !drawerButton || !navigationDrawer || !skipLink) {
      throw new Error('Elemen DOM tidak ditemukan');
    }

    const app = new App({
      content: mainContent,
      drawerButton,
      drawerNavigation: navigationDrawer,
      skipLinkButton: skipLink
    });

    await app.renderPage();
    await registerServiceWorker();

    window.addEventListener('hashchange', async () => {
      await app.renderPage();
      Camera.stopAllStreams();
    });

  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error);

    if (retryCount < MAX_RETRIES - 1) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return initializeApp(retryCount + 1);
    } else {
      showErrorUI();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  window.appLoaded = true;
  console.log('Aplikasi berhasil dimuat');
}

function showErrorUI() {
  document.body.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <h1>Gagal Memuat Aplikasi</h1>
      <p>Sedang mencoba kembali...</p>
      <p>Halaman akan otomatis direfresh</p>
      <div class="loader" style="margin: 1rem auto;"></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const timeoutId = setTimeout(() => {
    console.warn('Timeout: Aplikasi terlalu lama memuat');
    window.location.reload();
  }, 8000);

  initializeApp().then(() => {
    clearTimeout(timeoutId);
  });
});