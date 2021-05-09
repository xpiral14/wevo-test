import { DateTime } from 'luxon'
import User from '../Models/User'

export default class UsersService {
  public async getUser(userId: number) {
    return User.findOrFail(userId)
  }

  public async createUser(userData: {
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
    const user = await this.getUser(userId)
    user.fill(userData)

    user.save()
    return user
  }

  public async deleteUser(userId) {
    const user = await User.findOrFail(userId)

    await user.delete()
  }
}
