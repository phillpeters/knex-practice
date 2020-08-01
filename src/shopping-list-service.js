const ShoppingListService = {
  getAllListItems(knex) {
    return knex.select('*').from('shopping_list');
  },

  getListItemById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first();    
  },

  insertListItem(knex, newListItem) {
    return knex
      .insert(newListItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  updateListItem(knex, id, newItemFields) {
    return knex('shopping_list')
      .where({ id })
      .update(newItemFields);
  },

  deleteListItem(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete();
  }
};

module.exports = ShoppingListService;