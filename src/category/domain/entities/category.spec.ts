import { Category } from "./category"

describe('Category test', () => {
  test('constructor category', () => {
    const c = new Category('Movie');
    expect(c.name).toBe('Movie')
  })
})