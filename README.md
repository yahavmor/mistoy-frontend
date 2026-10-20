# MisToy · Frontend

React frontend for MisToy, a toy store with live chat, reviews and a dashboard.
Backend: [mistoy-backend](https://github.com/yahavmor/mistoy-backend)

<img width="1640" height="890" alt="mistoy-frontend screenshot" src="https://github.com/user-attachments/assets/98bd7bb5-6045-471a-8ed5-8740c7f30c6f" />

## Features

- Toy catalog with filtering, sorting and search
- Toy details with a live chat room per toy (Socket.io), including a typing indicator
- Add and edit toys with validated forms (Formik and Yup)
- Login and signup, a user page, and a reviews explorer
- Dashboard with charts (Chart.js)
- About page with the store branches on Google Maps
- English and Hebrew UI strings (i18next), an online status indicator, and a warning before closing the tab with an unsent chat message

## Tech

React, Redux, React Router, MUI, Formik, Yup, Chart.js, i18next, the Socket.io client, Axios and Vite.

## Run locally

```bash
cp .env.example .env   # add your Google Maps API key
npm install
npm run dev
```

---

Built by **Yahav Mor** · [Portfolio](https://yahavmor.github.io) · [LinkedIn](https://www.linkedin.com/in/yahav-mor-566291270/) · [GitHub](https://github.com/yahavmor)
