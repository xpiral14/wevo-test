export default interface Creatable<T> {
  create(data: T): void
}
