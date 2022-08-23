import { Category } from "./category"

describe('Category test', () => {
  test('create category without description', () => {
    const c = new Category("Movie");
    expect(c.name).toBe("Movie");
    expect(c.getDescription()).toBeNull();
  })

  test('constructor category', () => {
    const c = new Category('Movie', 'random desc');
    expect(c.name).toBe('Movie');
    expect(c.getDescription()).toBe("random desc");
    expect(c.getActive()).toBe(true);
    expect(c.getCreatedAt().getTime()).toBeLessThanOrEqual(Date.now())
  })

  test('create from props', () => {
    let c = Category.createFromProps({ name: 'test', description: 'random desc',  is_active: false, created_at: new Date(1985, 1, 1) });
    expect(c.name).toBe('test')
    expect(c.getDescription()).toBe("random desc");
    expect(c.getActive()).toBe(false);
    expect(c.getCreatedAt().getTime()).toBe(new Date(1985, 1, 1).getTime());

    c = Category.createFromProps({ name: 'test' });
    expect(c.name).toBe('test');
    expect(c.getActive()).toBe(true);
    expect(c.getDescription()).toBe(null);
    expect(c.getCreatedAt().getTime()).toBeLessThanOrEqual(Date.now());
  });
})