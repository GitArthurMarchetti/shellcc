# ShellCC – Shared Asset & Expense Manager (front end)

Team project (SENAI) for managing shared **rooms**, their **assets (patrimony)** and **expenses**, with invitations and authentication.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix) components, Recharts dashboards
- React Router with private routes and an auth context
- Axios to consume the API

A lightweight Express + PostgreSQL prototype API also lives in `backend/` (auth, rooms and patrimony routes, SQL schema in `backend/database/Tables.sql`). The main API is in [shellcc_backend](https://github.com/GitArthurMarchetti/shellcc_backend).

## Run

```bash
npm install
npm run dev
```

## Team

Eduardo Borges, Arthur Marchetti and team.
