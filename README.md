# YouTube Video Tracker

Eine Progressive Web App (PWA) zum Tracken von YouTube-Videos mit automatischen Updates, Statistiken und Widget-Unterstützung.

## Features

1. **Google Login** - Authentifizierung mit Google Account
2. **YouTube Video Tracking** - Tracken Sie Videos und sehen Sie aktuelle Statistiken
3. **Automatische Updates** - Jede Stunde automatische Aktualisierung der Daten
4. **Widget-Ansicht** - Optimale Ansicht für Home-Screen-Widgets (Views-Anzeige)
5. **Statistiken & Diagramme** - Detaillierte Performance-Analyse:
   - Views letztes Jahr
   - Views letzter Monat
   - Aktuelle Views, Likes, Comments
   - Historische Daten als Linien-Diagramm

## Installation als App

### Android (Chrome)
1. Öffnen Sie die App in Chrome
2. Tippen Sie auf das 3-Punkte-Menü
3. Wählen Sie "Zum Startbildschirm hinzufügen"

### iOS (Safari)
1. Öffnen Sie die App in Safari
2. Tippen Sie auf das Teilen-Symbol
3. Wählen Sie "Zum Home-Bildschirm"

## Setup

1. Erstellen Sie eine Google OAuth Client ID in der [Google Cloud Console](https://console.cloud.google.com/)
2. Aktivieren Sie die YouTube Data API v3
3. Erstellen Sie einen API Key
4. Tragen Sie beide Keys in `src/app/app.config.ts` und `src/app/app.ts` ein

## Entwicklung

```bash
npm install
npx ng serve
```

## Build

```bash
npx ng build --configuration production
```

Dieses Projekt wurde mit Angular CLI 21.2.6 erstellt.
