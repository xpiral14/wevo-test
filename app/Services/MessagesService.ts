type Gender = 'F' | 'M'
export default class MessagesService {
  public invalidField(fieldName: string, gender?: Gender) {
    let genderVowel = this.getGenderVowel(gender)
    return `${genderVowel.toUpperCase()} ${fieldName} é inválid${genderVowel}`
  }

  public invalidLenth(fieldName: string, maxLength: number, gender?: Gender) {
    let genderVowel = this.getGenderVowel(gender)
    return `${genderVowel.toUpperCase()} ${fieldName} deve ter no máximo ${maxLength} caracteres`
  }

  public unique(fieldName: string, gender?: Gender) {
    let genderVowel = this.getGenderVowel(gender)
    return `${genderVowel.toUpperCase()} ${fieldName} já está cadastrado`
  }

  public invalidFormat(fieldName: string, format: string, gender?: Gender) {
    let genderVowel = this.getGenderVowel(gender)
    return `${genderVowel.toUpperCase()} ${fieldName} precisa estar no formato ${format}`
  }

  private getGenderVowel(gender?: Gender) {
    return gender === 'F' ? 'a' : 'o'
  }
}
