const userRoutes = (app, fs) => {

  const dataPath = './data/books.json';

  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
      fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
              throw err;
          }

          callback(returnJson ? JSON.parse(data) : data);
      });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

      fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err) {
              throw err;
          }

          callback();
      });
  };

  // READ
  app.get('/books', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }

          res.send(JSON.parse(data));
      });
  });

  // CREATE
  app.post('/books', (req, res) => {

      readFile(data => {
          // Note: this isn't ideal for production use. 
          // ideally, use something like a UUID or other GUID for a unique ID value
          const newBookId = Date.now().toString();

          // add the new user
          data[newBookId.toString()] = req.body;
          data[newBookId.toString()]["id"] = newBookId;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('new user added');
          });
      },
          true);
  });


  // UPDATE
  app.put('/books/:id', (req, res) => {

      readFile(data => {

          // add the new user
          const bookId = req.params["id"];
          data[bookId] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`book id:${bookId} updated`);
          });
      },
          true);
  });


  // DELETE
  app.delete('/books/:id', (req, res) => {

      readFile(data => {

          // add the new user
          const bookId = req.params["id"];
          delete data[bookId];

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`users id:${bookId} removed`);
          });
      },
          true);
  });
};

module.exports = userRoutes;