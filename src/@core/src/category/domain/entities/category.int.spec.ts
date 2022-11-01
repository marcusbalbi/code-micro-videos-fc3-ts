import { Category } from "./category";

describe("Category integration tests", () => {
  describe("create method", () => {
    test("invalid category when create with name", () => {
      expect(() => {
        new Category({ name: "" });
      }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => {
        new Category({ name: 5 as any });
      }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new Category({ name: "a".repeat(256) });
      }).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("invalid category when create with description", () => {
      expect(() => {
        new Category({ name: "test", description: 5 as any });
      }).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    test("invalid category when create with is_active", () => {
      expect(() => {
        new Category({ name: "test", is_active: 5 as any });
      }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
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
      }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => {
        category.update(4 as any, "");
      }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        category.update(null as any, "");
      }).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        category.update("a".repeat(256) as any, "");
      }).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("invalid description", () => {
      const category = new Category({ name: "Movie" });
      expect(() => {
        category.update("test", 5 as any);
      }).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    test("valid category", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie 4",
        is_active: true,
      });
      expect(() => {
        category.update("Movie2");
      }).not.toThrow();
    });
  });
});
