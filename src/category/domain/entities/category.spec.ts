import { v4 } from "uuid";
import { Category } from "./category"

describe('Category test', () => {
  test('create category without description', () => {
    const c = new Category("Movie");
    expect(c.name).toBe("Movie");
    expect(c.getDescription()).toBeNull();
    expect(c.getId()).toBeDefined();
  })

  test('constructor category', () => {
    const c = new Category('Movie', 'random desc');
    expect(c.name).toBe('Movie');
    expect(c.getDescription()).toBe("random desc");
    expect(c.getActive()).toBe(true);
    expect(c.getCreatedAt().getTime()).toBeLessThanOrEqual(Date.now())
    expect(c.getId()).toBeDefined();
  })

  test('create from props', () => {
    const id = v4();
    let c = Category.createFromProps({ id, name: 'test', description: 'random desc',  is_active: false, created_at: new Date(1985, 1, 1) });
    expect(c.name).toBe('test')
    expect(c.getDescription()).toBe("random desc");
    expect(c.getActive()).toBe(false);
    expect(c.getCreatedAt().getTime()).toBe(new Date(1985, 1, 1).getTime());
    expect(c.getId()).toBe(id);

    c = Category.createFromProps({ name: 'test' });
    expect(c.name).toBe('test');
    expect(c.getActive()).toBe(true);
    expect(c.getDescription()).toBe(null);
    expect(c.getCreatedAt().getTime()).toBeLessThanOrEqual(Date.now());
    expect(c.getId()).toBeDefined();

    expect(() => {
      Category.createFromProps({ name: "test", id: "invalid-uuid" });
    }).toThrow();
    

  });

  test('Two categories should have different Ids', () => {
    const c1 = new Category('test1')
    const c2 = new Category('test1');
    expect(c1.getId()).not.toEqual(c2.getId());
  })

})