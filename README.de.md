# ICHGRAM - Frontend (React / Vite)

Benutzeroberfläche des Social-Network-Klons. Das Projekt bietet ein modernes Design mit globalem State-Management, responsivem Layout und KI-Integration.

🌐 **Live Demo:** [ichgram-alexp.vercel.app](https://ichgram-alexp.vercel.app/)  
⚡ **Schnellzugriff:** Klicken Sie auf dem Anmeldebildschirm auf die Schaltfläche **"Demo User"** für einen sofortigen 1-Klick-Zugang (keine Registrierung erforderlich).  
🔗 **Backend Repository:** [instagram-clone-api](https://github.com/AlexPlotnikovICH/instagram-clone-api)

🌍 Lesen Sie dies auf: [English](README.md) | [Русский](README.ru.md)

## 🚀 Schnellstart

**1. Abhängigkeiten installieren**  
Stellen Sie sicher, dass Node.js installiert ist (v18+ empfohlen).
```bash
npm install

2. Umgebungskonfiguration

Das Projekt ist so vorkonfiguriert, dass es automatisch auf das lokale Backend (http://localhost:3333/api) zugreift. Daher ist die Erstellung einer .env-Datei für einen einfachen lokalen Start optional.

Für ein Production-Deployment oder eine benutzerdefinierte Konfiguration erstellen Sie jedoch bitte eine .env-Datei im Stammverzeichnis des Projekts und geben Sie Folgendes an:

VITE_API_URL=http://localhost:3333/api

3. Projekt starten
npm run dev

Das Projekt ist erreichbar unter: http://localhost:5173

🛠 Tech Stack
Bundler: Vite (rasantes HMR)

Core: React 18 (Hooks)

Styling: Tailwind CSS v4 (Typografie global auf Roboto überschrieben)

Routing: React Router DOM v6

State Management: Zustand (leichtgewichtige Architektur für globale Benachrichtigungen)

Icons: Lucide React

API Client: Axios mit konfigurierten Interceptors für die automatische Übertragung von JWT-Token

KI-Integration: Groq API (llama-3.1-8b-instant Modell) über das Backend

Medienspeicher: Cloudinary (optimierte Bildverarbeitung)

🏗 Architektur & Implementierte Funktionen
Globaler Feed (Home): Rendering von Posts aus der Datenbank mit Platzhaltern für Likes. Adaptives Mobile-First-Design.

KI Business-Assistent: Ein integrierter Chat basierend auf Groq (llama-3.1-8b-instant), der als SMM-Experte und Texter fungiert.

Optimierte Medien-Uploads: Formulare, die für das effiziente Hochladen von Bildern entwickelt wurden, welche anschließend über das Backend in Cloudinary verarbeitet und gespeichert werden.

Suchfunktion (Search Drawer): Implementiert mit dem Debounce-Muster (500 ms), um das Backend nicht bei jedem Tastendruck mit Anfragen zu überlasten.

Benachrichtigungen (Zustand Store): Globales State-Management. Der Indikator für ungelesene Nachrichten (roter Punkt) wird beim Öffnen des Drawers durch optimistische UI-Updates deaktiviert.

Direktnachrichten (Direct Messages): Für das MVP gemockt. Um Ressourcen zu sparen und die Serverless-Bereitstellung vorzubereiten, wurden Echtzeit-Chats über WebSockets eingefroren (ein UI-Block mit einer Erklärung ist implementiert).

⚠️ Wichtiger Hinweis für Reviewer
Für die korrekte Funktion der Anwendung starten Sie bitte zuerst das Backend und führen Sie das Skript zur Datenbankbefüllung (node seed.js) aus, wie im README.md des Backend-Repositories beschrieben. Ohne diesen Schritt bleibt der Feed leer, da die Datenbank anfänglich keine Daten enthält.