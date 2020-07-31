require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchList(searchTerm) {
  knexInstance
    .select('name', 'price', 'date_added', 'category')
    .from('shopping_list')
    .where('name', 'ilike', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

// searchList('urger');

function paginateItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1);

  knexInstance
    .select('name', 'price', 'date_added', 'category')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

// paginateItems(3);

function itemsAddedAfterDate(daysAgo) {
  knexInstance
    .select('category', 'name', 'date_added')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::interval`, daysAgo)
    )
    .then(result => {
      console.log(result);
    });
}

// itemsAddedAfterDate(3);

function totalCostPerCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

totalCostPerCategory();