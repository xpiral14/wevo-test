import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nome' })
  public name: string

  @column({ columnName: 'CPF' })
  public cpf: string

  @column()
  public email: string

  @column({ columnName: 'telefone' })
  public phone: string

  @column({ columnName: 'sexo' })
  public gender: string

  @column.date({ columnName: 'dataNascimento' })
  public birthday: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
