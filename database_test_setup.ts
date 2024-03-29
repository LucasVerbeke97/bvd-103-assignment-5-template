import { MongoMemoryServer } from 'mongodb-memory-server'

export async function setup (): Promise<void> {
  const instance = await MongoMemoryServer.create({ binary: { version: '7.0.7' } })
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'))
}

export async function teardown (): Promise<void> {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE
  await instance.stop()
}
