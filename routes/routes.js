const booksRoutes = require('./books');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    booksRoutes(app, fs);

};

module.exports = appRouter;