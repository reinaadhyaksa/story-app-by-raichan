import '../styles/styles.css';
import '../styles/responsives.css';
import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';
import { registerServiceWorker } from './utils';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const mainContent = document.getElementById('main-content');
    const drawerButton = document.getElementById('drawer-button');
    const navigationDrawer = document.getElementById('navigation-drawer');
    const skipLink = document.getElementById('skip-link');

    if (!mainContent || !drawerButton || !navigationDrawer || !skipLink) {
      throw new Error('Elemen penting tidak ditemukan di DOM');
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
    console.error('Aplikasi gagal dimuat:', error);
    document.body.innerHTML = '<h1>Terjadi Error</h1><p>Silakan refresh halaman</p>';
  }
});
