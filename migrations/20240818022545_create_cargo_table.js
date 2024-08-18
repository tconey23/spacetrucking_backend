/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cargo', function(table) {
      table.increments('id').primary();
      table.string('station');
      table.string('scu');
      table.text('comm');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cargo');
  };
  
