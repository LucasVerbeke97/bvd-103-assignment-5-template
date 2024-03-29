import { type BookID } from '../../adapter/assignment-2'
import { type ShelfId } from '../../adapter/assignment-4'

export interface WarehouseData {
  placeBookOnShelf: (bookId: BookID, shelf: ShelfId, count: number) => Promise<void>
}

export const inMemoryWarehouse: WarehouseData = {
  placeBookOnShelf: async (bookId, shelf, count) => {}
}
