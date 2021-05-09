import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('CPF').unique()
      table.string('email').unique()
      table.string('telefone')
      table.string('sexo')
      table.string('dataNascimento')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
