# News App Guide

This repository contains a simple NEWS (National Early Warning Score) calculator with:

- a .NET 9 minimal backend (`news-backend`) that exposes a REST endpoint for calculating the score
- a Vite + React frontend (`news-frontend`) that collects measurements and displays the result

Use this guide to spin up both services locally and understand the moving parts before an interview.

## Prerequisites

- .NET SDK 9.0 (preview or better)
- Node.js 18+ (or 20+) and npm
- PowerShell (commands below assume the repo root) and a modern browser

## Backend (news-backend)

1. `cd news-backend`
2. Restore dependencies: `dotnet restore`
3. Run the API (serves by default at `http://localhost:3001`): `dotnet run`

## Frontend (news-frontend)

1. In a separate terminal, `cd news-frontend`
2. Install dependencies: `npm install`
3. Create `news-frontend/.env` using `news-frontend/.env.example` with `VITE_API_BASE_URL=http://localhost:3001`
4. Start the dev server: `npm run dev`

Vite prints the local URL. Open it in a browser, submit a form, and the app will POST to the backend.
