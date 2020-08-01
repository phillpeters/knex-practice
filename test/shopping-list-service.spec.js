const expect = require('chai').expect;
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { getListItemById } = require('../src/shopping-list-service');

describe(`Shopping list service object`, () => {
  let db;
  let testShoppingListItems = [
    {
      id: 1,
      name: 'Test Item 1',
      price: '15.40',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 2,
      name: 'Test Item 2',
      price: '5.75',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 3,
      name: 'Test Item 3',
      price: '13.21',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: true,
      category: 'Snack'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testShoppingListItems);
    });

    it(`getAllListItems() resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getAllListItems(db)
        .then(actual => {
          expect(actual).to.eql(testShoppingListItems);
        });
    });

    it(`getListItemById() resolves a list item by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestShoppingListItem = testShoppingListItems[thirdId - 1];
      return ShoppingListService.getListItemById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestShoppingListItem.name,
            price: thirdTestShoppingListItem.price,
            date_added: thirdTestShoppingListItem.date_added,
            checked: thirdTestShoppingListItem.checked,
            category: thirdTestShoppingListItem.category
          });
        });
    });

    it(`updateListItem() updates a list item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'New name',
        price: '6.74',
        date_added: new Date(),
        checked: false,
        category: 'Snack'
      };

      return ShoppingListService.updateListItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getListItemById(db, idOfItemToUpdate))
        .then(listItem => {
          expect(listItem).to.eql({
            id: idOfItemToUpdate,
            ...newItemData
          });
        });
    });

    it(`deleteListItem() deletes an item by id from the 'shopping_list' table`, () => {
      const itemId = 3;
      return ShoppingListService.deleteListItem(db, itemId)
        .then(() => ShoppingListService.getAllListItems(db))
        .then(allItems => {
          const expected = testShoppingListItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    })
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllListItems() resolves an empty array`, () => {
      return ShoppingListService.getAllListItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it(`insertListItem() inserts a new list item and resolves the new list item with an 'id'`, () => {
      const newListItem = {
        name: 'New Item',
        price: '2.36',
        date_added: new Date(`2020-01-01T00:00:00.000Z`),
        checked: false,
        category: 'Main'
      };

      return ShoppingListService.insertListItem(db, newListItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newListItem.name,
            price: newListItem.price,
            date_added: newListItem.date_added,
            checked: newListItem.checked,
            category: newListItem.category
          });
        });
    });
  });
});