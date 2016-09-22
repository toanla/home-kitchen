import express from 'express';
import bookController from '../controllers/book';

const router = express.Router();

router.route('/')
    .get(bookController.list)
    .post(bookController.create);


router.route('/:bookId')
    .get(bookController.get)
    .put(bookController.update)
    .delete(bookController.remove);

router.param('bookId', bookController.load);

export default router;
