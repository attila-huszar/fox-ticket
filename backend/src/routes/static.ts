import express from 'express';
import path from 'path';

const staticRouter = express.Router();

const publicDir = path.resolve(
  path.join(__dirname, '..', '..', '..', '..', 'frontend', 'build'),
);

staticRouter.use(express.static(publicDir));

staticRouter.get('/*', (req, res) => res.sendFile(
  path.join(publicDir, 'index.html'),
));

export default staticRouter;
