import { DateTime } from 'luxon'
import User from '../Models/User'
import Creatable from './Creatable'
import Deletable from './Deletable'
import Readable from './Readable'

export default class UsersService implements Readable<User>, Creatable<User>, Deletable {
  public async getAll() {
    return User.all()
  }

  public async getOne(id: number) {
    return User.findOrFail(id)
  }

  public async create(userData: {
    name: string
    cpf: string
    email: string
    phone: string
    gender: string
    birthday: DateTime
  }) {
    return User.create(userData)
  }
  public async updateUser(
    userId: number,
    userData: {
      name?: string
      cpf?: string
      email?: string
      phone?: string
      gender?: string
      birthday?: DateTime
    }
  ) {
    const user = await this.getOne(userId)
    user.fill(userData)

    user.save()
    return user
  }

  public async delete(userId) {
    try {
      const user = await User.find(userId)

      await user?.delete()
    } catch (error) {
      console.log(error)
    }
  }
}
