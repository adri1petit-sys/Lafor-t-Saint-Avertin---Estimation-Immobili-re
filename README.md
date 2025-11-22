
# Laforêt Saint-Avertin - Estimation Immobilière

This is a complete web application for real estate estimation, built with React, Vite, TypeScript, and Tailwind CSS. It uses the Google Gemini API for estimations and the Google Maps API for address autocomplete and maps.

## Prerequisites

- Node.js (version 18.x or higher recommended)
- npm, yarn, or pnpm

## 1. Setup

First, clone the repository and install the dependencies.

```bash
npm install
```

## 2. Environment Variables

This project requires API keys to function correctly. Copy the example environment file to a new file named `.env.local`:

```bash
cp .env.local.example .env.local
```

Now, open `.env.local` and add your API keys:

```
# Get your Gemini API key from Google AI Studio
VITE_GEMINI_API_KEY="AIzaSyCJQM0dHNALXTJW0jN--ogwz_OqOzT9fZU"

# Get your Google Maps API key from Google Cloud Console
# Make sure to enable "Places API" and "Maps JavaScript API"
VITE_GOOGLE_MAPS_API_KEY="AIzaSyDhX0aZHTqC-alniGDAV_KHcsztqhnVmQ0"
```

**Important:** The `.env.local` file is listed in `.gitignore` and should never be committed to your repository for security reasons.

## 3. Running the Development Server

To start the app in development mode with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 4. Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized static files will be generated in the `dist/` directory.

## 5. Deploying to Vercel / Netlify

This project is ready for seamless deployment on platforms like Vercel or Netlify.

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  **Import your project** on the Vercel/Netlify dashboard.
3.  **Configure the settings:**
    -   **Framework Preset:** Vite
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `dist`
4.  **Add Environment Variables:**
    -   In your Vercel/Netlify project settings, go to the "Environment Variables" section.
    -   Add `VITE_GEMINI_API_KEY` with your Gemini key.
    -   Add `VITE_GOOGLE_MAPS_API_KEY` with your Google Maps key.
5.  **Deploy!** Your site will be built and deployed automatically.
