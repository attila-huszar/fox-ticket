### Fox Ticket Full Stack Project

CI

## Workspaces

frontend: the frontend code using React
backend: the backend code using Express

## Frontend Packages

[NextUI](https://nextui.org/docs/guide/getting-started)  
[React Query](https://react-query-v3.tanstack.com/overview)  
[React Icons](https://react-icons.github.io/react-icons)  
[usehooks-ts React hooks library](https://usehooks-ts.com/)  
[Zod Validation](https://www.npmjs.com/package/zod)  
[React Helmet](https://www.npmjs.com/package/react-helmet-async)  
[react-transition-group](https://www.npmjs.com/package/react-transition-group)  
[QR Generator](https://www.npmjs.com/package/react-qr-code)

## Backend Packages

[Express](https://www.npmjs.com/package/express) ([TS types](https://www.npmjs.com/package/@types/express))  
[Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)  
[JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) ([TS types](https://www.npmjs.com/package/@types/jsonwebtoken))  
[bcrypt Password hash](https://www.npmjs.com/package/bcrypt) ([TS types](https://www.npmjs.com/package/@types/bcrypt))  
[Mail Service SendGrid Web API](https://www.npmjs.com/package/@sendgrid/mail)  
[CORS](https://www.npmjs.com/package/cors) ([TS types](https://www.npmjs.com/package/@types/cors))  
[Helmet](https://www.npmjs.com/package/helmet)  
[dotenv](https://www.npmjs.com/package/dotenv)  
[HTTP Status codes](https://www.npmjs.com/package/http-status)  
[MySQL 2](https://www.npmjs.com/package/mysql2)  
[Sequelize](https://www.npmjs.com/package/sequelize)  
[Sequelize Typescript](https://www.npmjs.com/package/sequelize-typescript)  
[nodemon](https://www.npmjs.com/package/nodemon)  
[pino HTTP logger](https://www.npmjs.com/package/pino-http)  
[pino Formatter](https://www.npmjs.com/package/pino-pretty)  
_Run backend only with "npx nodemon server.ts | npx pino-pretty" (npx if devDep)_

## Getting Started

Run npm install from the repository root
Duplicate backend/.env.example as backend/.env
Edit database connection parameters in backend/.env
Run npm run dev

## Scripts

npm run build: Build the app for production
npm start: Start the full stack in production mode
npm run lint: Run static code analysis
npm run test: Run automated tests
npm run dev: Start the full stack in development mode
npm install <pkg> -w backend: Add backend dependency
npm install <pkg> -w frontend: Add frontend dependency
