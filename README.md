## Fox Ticket Full Stack Project

CI

### Workspaces

Frontend: the frontend code using React  
Backend: the backend code using Express

### Frontend Packages

[NextUI](https://nextui.org/docs/guide/getting-started)  
[React Icons](https://react-icons.github.io/react-icons)  
[usehooks-ts React hooks library](https://usehooks-ts.com/)  
[Axios](https://www.npmjs.com/package/axios)  
[React Helmet](https://www.npmjs.com/package/react-helmet-async)  
[React Awesome Reveal](https://react-awesome-reveal.morello.dev/)  
[QR Generator](https://www.npmjs.com/package/react-qr-code)

### Backend Packages

[Express](https://www.npmjs.com/package/express) ([TS types](https://www.npmjs.com/package/@types/express))  
[JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) ([TS types](https://www.npmjs.com/package/@types/jsonwebtoken))  
[Zod Validation](https://www.npmjs.com/package/zod)  
[bcrypt Password hash](https://www.npmjs.com/package/bcrypt) ([TS types](https://www.npmjs.com/package/@types/bcrypt))  
[Mail Service SendGrid API](https://www.npmjs.com/package/@sendgrid/mail)  
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
