# Firebase Deployment Setup

## 1. Install Firebase CLI

If you do not already have it:

```bash
npm install -g firebase-tools
```

## 2. Log in

```bash
firebase login
```

## 3. Initialize Firebase in the project root

Run this in the repository root:

```bash
firebase init hosting
firebase init functions
```

Use the existing configuration files already added in this repo.

## 4. Build the frontend

```bash
cd apps/frontend
npm install
npm run build
```

## 5. Install backend functions dependencies

```bash
cd apps/backend
npm install
```

## 6. Set environment variables

Set these in your Firebase environment or local shell before deployment:

```bash
export PORT=5000
export HOST=0.0.0.0
export NODE_ENV=production
export MONGODB_URI=your_mongodb_connection_string
export CLIENT_URL=https://your-frontend-domain.web.app
export JWT_SECRET=your-secret
export JWT_REFRESH_SECRET=your-refresh-secret
```

## 7. Deploy

```bash
firebase deploy
```

## Notes

- Hosting will serve the frontend from the Vite build output.
- The backend API will be available through Firebase Functions at the configured function endpoint.
- If you want the frontend to call the deployed backend, update VITE_API_URL in the frontend environment to your deployed function URL.
