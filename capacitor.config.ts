import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.youtubetracker.app',
  appName: 'YouTube Tracker',
  webDir: 'dist/keppasjonpeckapp/browser',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1070552848227-tktrkk0r9u6v2h4s8ehaukh79eh19dbe.apps.googleusercontent.com',
      androidClientId: '213407330422-oe220iidjfu8oqmeh4eirai77gao5f09.apps.googleusercontent.com',
      forceCodeForRefreshToken: false
    }
  }
};

export default config;
