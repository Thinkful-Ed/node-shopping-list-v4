const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {storage} = require('./storage');

// we're going to add some items to storage
// so there's some data to look at
storage.add('beans', 2.5);
storage.add('tomatoes', 5);
storage.add('peppers', 3);

app.get('/items', (req, res) => {
  res.json(storage.getItems());
});

app.post('/items', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body` 
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = storage.add({name: req.body.name, budget: req.body.budget});
  res.status(201).json(item);
});


app.delete('/items/:id', (req, res) => {
  storage.deleteItem(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});