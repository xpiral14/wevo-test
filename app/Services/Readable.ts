export default interface Readable<T> {
  getAll(): Promise<T[]>
  getOne(id: number): Promise<T>
}
