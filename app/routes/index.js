import express from 'express';
import bookRoutes from './book';

const router = express.Router(); // eslint-disable-line new-cap


router.use('/books', bookRoutes);

export default router;
