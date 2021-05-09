import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UsersService from '../../Services/UsersService'
import MessagesService from '../../Services/MessagesService'
export default class UsersController {
  private userService: UsersService
  private messageService: MessagesService

  constructor() {
    this.userService = new UsersService()
    this.messageService = new MessagesService()
  }
  public async index({ request }: HttpContextContract) {
    let { page, limit } = request.body()
    return User.query().paginate(page, limit)
  }

  public async getOneUser({ params }: HttpContextContract) {
    let user = this.userService.getOne(params.id)

    return user
  }

  public async createUser({ request }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
      cpf: schema.string({ trim: true }, [
        rules.unique({
          table: 'users',
          column: 'CPF',
        }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
        }),
      ]),
      phone: schema.string({ trim: true }, [rules.mobile({ locales: ['pt-BR'] })]),
      gender: schema.enum(['M', 'F']),
      birthday: schema.date({ format: 'yyyy-MM-dd' }),
    })
    const validatedPayLoad = await request.validate({
      schema: userSchema,
      messages: {
        'name': this.messageService.invalidField('nome'),
        'cpf': this.messageService.invalidField('CPF'),
        'cpf.unique': this.messageService.unique('CPF'),
        'email': this.messageService.invalidField('email'),
        'email.unique': this.messageService.unique('email'),
        'phone': this.messageService.invalidField('telefone'),
        'gender': this.messageService.invalidField('gênero'),
        'birthday': this.messageService.invalidField('data de nascimento', 'F'),
        'date.format': this.messageService.invalidFormat('data de nascimento', 'aaaa-mm-dd', 'F'),
      },
    })

    const user = this.userService.create(validatedPayLoad)

    return user
  }

  public async updateUser({ request, params }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
      cpf: schema.string.optional({ trim: true }, [
        rules.unique({
          table: 'users',
          column: 'CPF',
          whereNot: {
            id: params.id,
          },
        }),
      ]),
      email: schema.string.optional({ trim: true }, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          whereNot: {
            id: params.id,
          },
        }),
      ]),
      phone: schema.string.optional({ trim: true }, [rules.mobile({ locales: ['pt-BR'] })]),
      gender: schema.enum.optional(['M', 'F']),
      birthday: schema.date.optional({ format: 'yyyy-MM-dd' }),
    })
    const validatedPayLoad = await request.validate({
      schema: userSchema,
      messages: {
        'name': this.messageService.invalidField('nome'),
        'cpf': this.messageService.invalidField('CPF'),
        'cpf.unique': this.messageService.unique('CPF'),
        'email': this.messageService.invalidField('email'),
        'email.unique': this.messageService.unique('email'),
        'phone': this.messageService.invalidField('telefone'),
        'gender': this.messageService.invalidField('gênero'),
        'birthday': this.messageService.invalidField('data de nascimento', 'F'),
        'date.format': this.messageService.invalidFormat('data de nascimento', 'aaaa-mm-dd', 'F'),
      },
    })
    try {
      this.userService.updateUser(params.id, validatedPayLoad)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return
      }
    }
  }

  public async deleteUser({ params, response }: HttpContextContract) {
    await this.userService.delete(params.id)

    return response.noContent()
  }
}
