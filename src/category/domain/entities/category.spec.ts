import { Category } from "./category"

describe('Category test', () => {
  test('constructor category', () => {
    const c = new Category('Movie', 'random desc');
    expect(c.name).toBe('Movie');
    expect(c.description).toBe("random desc");
    expect(c.active()).toBe(false);
  })

  test('create from props', () => {
    const c = Category.createFromProps({ name: 'test', description: 'random desc',  is_active: true, created_at: new Date(1985, 1, 1) });
    expect(c.name).toBe('test')
    expect(c.description).toBe("random desc");
    expect(c.active()).toBe(true);
  })
})