const uuid = require('uuid');

// this module provides volatile storage.
// we haven't learned about databases yet, so for now
// we're using in-memory storage for shopping list.
// this means each time the app stops, our storage
// gets erased.

// don't worry to much about how Storage is implemented.
// Our concern in this example is with how the API layer
// is implemented.

const Storage = {
  add: function(name, budget) {
    const item = {
      name: name,
      id: uuid.v4(),
      budget: budget
    };
    this.items[item.id] = item;
    return item;
  },
  getItems: function() {
    return Object.keys(this.items).map(key => this.items[key]);
  },
  deleteItem: function(itemId) {
    delete this.items[itemId];
  },
  updateItem: function(updatedItem) {
    this.items[updatedItem.id] = updatedItem;
  }
};

function createStorage() {
  const storage = Object.create(Storage);
  storage.items = {};
  storage.idCounter = 1;
  return storage;
}

const storage = createStorage();

module.exports = {storage};
