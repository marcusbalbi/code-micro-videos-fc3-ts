import { Category } from "./category";

describe("Category integration tests", () => {
  describe("create method", () => {
    test("invalid category when create with name", () => {
      expect(() => {
        new Category({ name: "" });
      }).toThrow("The name is required");

      expect(() => {
        new Category({ name: 5 as any });
      }).toThrow("The name must be a string");

      expect(() => {
        new Category({ name: "a".repeat(256) });
      }).toThrow("The name must be less or equal than  255 chars");
    });

    test("invalid category when create with description", () => {
      expect(() => {
        new Category({ name: "test", description: 5 as any });
      }).toThrow("The description must be a string");
    });

    test("invalid category when create with is_active", () => {
      expect(() => {
        new Category({ name: "test", is_active: 5 as any });
      }).toThrow("The is_active must be a boolean");
    });

    test("valid category", () => {
      expect(() => {
        const category = new Category({
          name: "Movie",
          description: "Movie 4",
          is_active: true,
        });
      }).not.toThrow();
    });
  });

  describe("update method", () => {
    test("invalid name", () => {
      const category = new Category({ name: "Movie" });

      expect(() => {
        category.update("", "");
      }).toThrow("The name is required");

      expect(() => {
        category.update(4 as any, "");
      }).toThrow("The name must be a string");

      expect(() => {
        category.update(null as any, "");
      }).toThrow("The name is required");

      expect(() => {
        category.update("a".repeat(256) as any, "");
      }).toThrow("The name must be less or equal than  255 chars");
    });

    test("invalid description", () => {
      const category = new Category({ name: "Movie" });
      expect(() => {
        category.update("test", 5 as any);
      }).toThrow("The description must be a string");
    });

      test("valid category", () => {
        const category = new Category({
          name: "Movie",
          description: "Movie 4",
          is_active: true,
        });
        expect(() => {
          category.update("Movie2")
        }).not.toThrow();
      });
  });
});
