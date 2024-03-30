import { ObjectId } from 'mongodb'
import { type BookID } from '../../adapter/assignment-2'
import { type OrderId, type ShelfId } from '../../adapter/assignment-4'

export interface WarehouseData {
  placeBookOnShelf: (bookId: BookID, shelf: ShelfId, count: number) => Promise<void>
  getCopiesOnShelf: (bookId: BookID, shelf: ShelfId) => Promise<number>
  getOrder: (order: OrderId) => Promise<Record<BookID, number> | false>
  placeOrder: (books: Record<BookID, number>) => Promise<OrderId>
}

export class InMemoryWarehouse implements WarehouseData {
  books: Record<BookID, Record<ShelfId, number>>
  orders: Record<OrderId, Record<BookID, number>>

  constructor (params?: { books?: Record<BookID, Record<ShelfId, number>>, orders?: Record<OrderId, Record<ShelfId, number>> }) {
    const { books, orders } = params ?? {}
    this.books = books ?? {}
    this.orders = orders ?? {}
  }

  async placeBookOnShelf (bookId: string, shelf: string, count: number): Promise<void> {
    const book = this.books[bookId] ?? {}
    this.books[bookId] = { ...book, [shelf]: count }
  }

  async getCopiesOnShelf (bookId: string, shelf: string): Promise<number> {
    const book = this.books[bookId] ?? {}
    return book[shelf] ?? 0
  }

  async getOrder (order: OrderId): Promise<Record<BookID, number> | false> {
    return order in this.orders ? this.orders[order] : false
  }

  async placeOrder (books: Record<string, number>): Promise<OrderId> {
    const order = new ObjectId().toHexString()
    this.orders[order] = books
    return order
  }
}

export const DefaultWarehouseData = new InMemoryWarehouse()
