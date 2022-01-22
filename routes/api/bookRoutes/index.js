const router = require('express').Router();

const Book = require('../../../models/Book');

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