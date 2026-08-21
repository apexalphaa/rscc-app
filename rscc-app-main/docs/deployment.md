# Deployment Guide

## Backend

### Environment variables
Set the following environment variables on your hosting platform:

- PORT
- HOST=0.0.0.0
- NODE_ENV=production
- MONGODB_URI or DATABASE_URL
- CLIENT_URL
- JWT_SECRET
- JWT_REFRESH_SECRET

### Start command
For platforms that use a start command, use:

```bash
node server.js
```

### Render / Railway / Heroku-style hosts
If the platform supports a Procfile, the included Procfile will start the app automatically.

## Frontend

Build the frontend before deployment:

```bash
cd apps/frontend
npm install
npm run build
```

Deploy the generated static output from the frontend build directory.

