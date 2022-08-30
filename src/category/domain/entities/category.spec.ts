import { v4 } from "uuid";
import { Category } from "./category";

describe("Category test", () => {
  test("create category without description", () => {
    const c = new Category({ name: "Movie" });
    expect(c.props.name).toBe("Movie");
    expect(c.props.description).not.toBeDefined();
    expect(c.id).toBeDefined();
  });

  test("constructor category", () => {
    const c = new Category({ name: "Movie", description: "random desc" });
    expect(c.props.name).toBe("Movie");
    expect(c.props.description).toBe("random desc");
    expect(c.props.is_active).toBe(true);
    expect(c.props.created_at?.getTime()).toBeLessThanOrEqual(Date.now());
    expect(c.id).toBeDefined();
  });

  test("Two categories should have different Ids", () => {
    const c1 = new Category({ name: "test1" });
    const c2 = new Category({ name: "test1" });
    expect(c1.id).not.toEqual(c2.id);
  });
  test("it should update a category", () => {
    const cat = new Category({ name: "Test", description: "category test" });
    cat.update("Test 1", "Category test 1");
    expect(cat.props.name).toBe("Test 1");
    expect(cat.props.description).toBe("Category test 1");
  });
});
