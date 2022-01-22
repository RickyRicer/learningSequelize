const router = require('express').Router();

const Book = require('../../../models/Book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (e) {
        res.json(e);
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        res.json(book);
    } catch (e) {
        res.json(e);
    }
});

router.patch('/:bookId', async (req, res) => {
    const {
        title,
        author,
        isbn,
        pages,
        edition,
        isPaperback,
    } = req.body;
    try {
        await Book.update(
            {
                title,
                author,
                isbn,
                pages,
                edition,
                isPaperback,
            },
            {where: {
                id: req.params.bookId
            },
        });
        const updatedBook = await Book.findByPk(req.params.bookId);
        res.json(updatedBook);
    } catch (e) {
        res.json(e);
    }
})

router.post('/', async (req, res) => {
    const { title, author } = req.body;
    try {
        const newBook = await Book.create({
            title, 
            author,
            isPaperback: true,
        });
        res.json(newBook);
    } catch (e) {
        console.log('L:12', e); 
        res.json(e);
    }
});

router.post('/seed', async (req, res) => {
    const booksToSave = [
        {
            title: `Datastructures and Algorithms in JavaScript`,
            author: 'Lorraine Granger', 
            isbn: '1',
            pages: 1000,
            edition: '1',
            isPaperback: true,
        },
        {
            title: 'You Dont know JS',
            author: 'Kyle Simpson', 
            isbn: '2',
            pages: 100,
            edition: '2',
            isPaperback: true,
        },
        {
            title: 'NFTs are a HODL',
            author: 'RickyRicer', 
            isbn: '3',
            pages: 3000,
            edition: '3',
            isPaperback: false,
        },
        {
            title: 'NFTs are awesome',
            author: 'RickyRicer', 
            isbn: '4',
            pages: 5000,
            edition: '4',
            isPaperback: false,
        },
    ];

    try {
        const result = await Book.bulkCreate(booksToSave);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;