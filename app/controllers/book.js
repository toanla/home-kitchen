import Book from '../models/book';
import responseCodes from '../helpers/ApiResponseCode';
import ApiResponse from '../helpers/ApiResponse';

function load(req, res, next, id) {
    Book.get(id).then((book) => {
        req.book = book;
        return next();
    }).error(e => next(e));
}

function list(req, res, next) {
    const {
        limit = 50, skip = 0,
    } = req.query;
    Book.list({
            limit,
            skip,
        }).then(books => res.json(books))
        .error(e => next(e));
}

function get(req, res) {
    if (!req.book)
        return res.send('Book not found');

    res.json(req.book);
}

function create(req, res, next) {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        pages: req.body.pages,
        read: false,
    });
    saveBook(book, res, next);
}

function update(req, res, next) {
    const book = req.book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.year = req.body.year;
    book.pages = req.body.pages;
    book.read = req.body.read;
    saveBook(book, res, next);
}

/* Need to check if category has children*/
function remove(req, res, next) {
    const book = req.book;
    book.removeAsync()
        .then(deletedBook => res.json(deletedBook))
        .error(e => next(e));
}
// helper
function saveBook(book, res, next) {
    book.saveAsync()
        .then(savedBook => buildResponseData(responseCodes.success, savedBook, res))
        .error(e => next(e));
}

function buildResponseData(responseCode, data, res) {
    const apiResponse = new ApiResponse(responseCode, 'api response message', data);
    res.json(apiResponse);
}

export default {
    load,
    list,
    get,
    create,
    update,
    remove,
};
