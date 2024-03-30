import previous_assignment from './assignment-3'

export type BookID = string

export interface Book {
  id?: BookID
  name: string
  author: string
  description: string
  price: number
  image: string
};

export interface Filter {
  from?: number
  to?: number
  name?: string
  author?: string
};

// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks (filters?: Filter[]): Promise<Book[]> {
  return await previous_assignment.listBooks(filters)
}

async function createOrUpdateBook (book: Book): Promise<BookID> {
  return await previous_assignment.createOrUpdateBook(book)
}

async function removeBook (book: BookID): Promise<void> {
  await previous_assignment.removeBook(book)
}

async function lookupBookById (book: BookID): Promise<Book> {
  const result = await fetch(`http://localhost:3000/books/${book}`)
  if (result.ok) {
    return await result.json() as Book
  } else {
    throw new Error('Couldnt Find Book')
  }
}

export type ShelfId = string
export type OrderId = string

async function placeBooksOnShelf (bookId: BookID, numberOfBooks: number, shelf: ShelfId): Promise<void> {
  const result = await fetch(`http://localhost:3000/warehouse/${bookId}/${shelf}/${numberOfBooks}`, { method: 'put' })
  if (!result.ok) {
    throw new Error('Couldnt Place on Shelf')
  }
}

async function orderBooks (order: BookID[]): Promise<{ orderId: OrderId }> {
  const result = await fetch('http://localhost:3000/order', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order })
  })
  if (!result.ok) {
    throw new Error('Couldnt Place on Shelf')
  }
  return { orderId: await result.text() }
}

async function findBookOnShelf (book: BookID): Promise<Array<{ shelf: ShelfId, count: number }>> {
  return [{ shelf: 'shelf-1', count: 2 }, { shelf: 'shelf-2', count: 5 }]
}

async function fulfilOrder (order: OrderId, booksFulfilled: Array<{ book: BookID, shelf: ShelfId, numberOfBooks: number }>): Promise<void> {
  throw new Error('not implemented')
}

async function listOrders (): Promise<Array<{ orderId: OrderId, books: BookID[] }>> {
  return [
  ]
}

const assignment = 'assignment-4'

export default {
  assignment,
  createOrUpdateBook,
  removeBook,
  listBooks,
  placeBooksOnShelf,
  orderBooks,
  findBookOnShelf,
  fulfilOrder,
  listOrders,
  lookupBookById
}
