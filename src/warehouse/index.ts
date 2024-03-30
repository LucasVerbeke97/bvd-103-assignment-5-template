import { type ZodRouter } from 'koa-zod-router'
import { placeBooksOnShelfRouter } from './place_on_shelf'

export function setupWarehouseRoutes (router: ZodRouter): void {
  // Placing Books on Shelves
  placeBooksOnShelfRouter(router)
}
