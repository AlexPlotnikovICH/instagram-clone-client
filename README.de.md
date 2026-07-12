# ICHGRAM - Frontend (React / Vite)
UI-Teil des Social-Network-Klons. Das Projekt bietet eine moderne Benutzeroberfläche unter Verwendung von globalem State-Management und responsivem Design.

🌍 Auf anderen Sprachen lesen: [English](README.md) | [Русский](README.ru.md)

## 🚀 Schnellstart

1. Abhängigkeiten installieren
Stellen Sie sicher, dass Node.js installiert ist (v18+ empfohlen).

npm install

2. Umgebungskonfiguration
Das Projekt ist so vorkonfiguriert, dass es automatisch auf das lokale Backend (http://localhost:3333/api) zurückgreift. Daher ist das Erstellen einer .env-Datei für einen einfachen lokalen Start optional.

Für das Production-Deployment oder eine benutzerdefinierte Konfiguration erstellen Sie jedoch eine .env-Datei im Projektwurzelverzeichnis und geben Sie Folgendes an:

VITE_API_URL=http://localhost:3333/api

3. Projekt starten
npm run dev

Das Projekt wird unter folgender Adresse verfügbar sein: http://localhost:5173

🛠 Technologiestack
Bundler: Vite (blitzschnelles HMR)

Kern: React 18 (Hooks)

Styling: Tailwind CSS v4 (Typografie auf globales Roboto überschrieben)

Routing: React Router DOM v6

State-Management: Zustand (leichtgewichtige Architektur für globale Benachrichtigungen)

Icons: Lucide React

API-Client: Axios mit konfigurierten Interceptoren für die automatische JWT-Token-Übertragung.

🏗 Architektur & implementierte Funktionen
Globaler Feed (Home): Rendern von Beiträgen aus der Datenbank mit Platzhaltern für Likes.

Search Drawer: Implementiert mit dem Debounce-Muster (500 ms), um das Backend nicht bei jedem Tastenanschlag mit Anfragen zu überfluten.

Benachrichtigungen (Zustand Store): Globales State-Management. Die Anzeige für ungelesene Nachrichten (roter Punkt) erlischt beim Öffnen des Drawers durch optimistische UI-Updates.

Direct Messages: Als Mockups für das MVP implementiert. Um Ressourcen zu sparen und auf das Serverless-Deployment vorzubereiten, wurden Echtzeit-WebSocket-Chats vorerst eingefroren (eine UI-Sperre mit Begründung wurde implementiert).

⚠️ Wichtiger Hinweis für Prüfer
Damit die Anwendung korrekt funktioniert, starten Sie bitte zuerst das Backend und führen Sie das Skript zur Datenbankbefüllung (node seed.js) aus, wie in der README.md des Backend-Repositorys beschrieben. Ohne diesen Schritt bleibt die Feed-Oberfläche leer, da die Datenbank anfangs komplett unbefüllt ist.