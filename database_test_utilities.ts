import { ObjectId } from 'mongodb'
import { type Book, type BookID } from './adapter/assignment-4'
import { type DatabaseAccessor } from './src/database_access'

export async function seedDatabase (accessor: DatabaseAccessor, { books }: { books: Record<BookID, Book> }): Promise<void> {
  await Promise.all(Object.keys(books).map(async (id) => {
    const objectId = ObjectId.createFromHexString(id)
    return await accessor.books.insertOne({ ...books[id], _id: objectId, id })
  }))
}

export function generateId<T> (): T {
  const id = new ObjectId()
  return (id.toHexString()) as T
}
