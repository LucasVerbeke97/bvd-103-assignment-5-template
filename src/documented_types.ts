export type BookID = string

export type OrderId = string

export type ShelfId = string

export type FulfilledBooks = Array<{ book: BookID, shelf: ShelfId, numberOfBooks: number }>

export type OrderPlacement = BookID[]

export interface Order {

  orderId: OrderId
  books: Record<BookID, number>
}

export interface Book {
  id?: BookID
  name: string
  author: string
  description: string
  price: number
  image: string
}
export interface Filter {
  from?: number
  to?: number
  name?: string
  author?: string
};
