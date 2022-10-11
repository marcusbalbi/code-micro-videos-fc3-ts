import { SearchParams } from "./repository-contracts";

describe("RepositoryContracts", () => {
  describe("SearchParams", () => {
    test("page props: page", () => {
      const arrange = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 5 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
        { page: "", expected: 1 },
        { page: "4", expected: 4 },
        { page: {}, expected: 1 },
        { page: "aaa", expected: 1 },
      ];
      arrange.forEach((i) => {
        expect(new SearchParams({ page: i.page as any }).page).toEqual(
          i.expected
        );
      });
    });
    test("page props: per_page", () => {
      const arrange = [
        { per_page: null, expected: 15 },
        { per_page: undefined, expected: 15 },
        { per_page: 0, expected: 15 },
        { per_page: -1, expected: 15 },
        { per_page: 5.5, expected: 5 },
        { per_page: 1, expected: 1 },
        { per_page: 2, expected: 2 },
        { per_page: "", expected: 15 },
        { per_page: "4", expected: 4 },
        { per_page: {}, expected: 15 },
        { per_page: "aaa", expected: 15 },
      ];
      arrange.forEach((i) => {
        expect(
          new SearchParams({ per_page: i.per_page as any }).per_page
        ).toEqual(i.expected);
      });
    });
    test("page props: sort", () => {
      const params = new SearchParams();
      expect(params.sort).toBeNull();
      const arrange = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: "", expected: null },
        { sort: "aaa", expected: "aaa" },
        { sort: 0, expected: "0" },
        { sort: -1, expected: "-1" },
        { sort: true, expected: "true" },
        { sort: false, expected: "false" },
        { sort: {}, expected: "[object Object]" },
      ];
      arrange.forEach((i) => {
        expect(new SearchParams({ sort: i.sort as any }).sort).toEqual(
          i.expected
        );
      });
    });
    test("page props: sort_dir", () => {
      let params = new SearchParams();
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: null });
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: undefined });
      expect(params.sort_dir).toBeNull();
      params = new SearchParams({ sort: "" });
      expect(params.sort_dir).toBeNull();

      const arrange = [
        { sort_dir: null, expected: "asc" },
        { sort_dir: undefined, expected: "asc" },
        { sort_dir: "", expected: "asc" },
        { sort_dir: "aaa", expected: "asc" },
        { sort_dir: 0, expected: "asc" },
        { sort_dir: -1, expected: "asc" },
        { sort_dir: true, expected: "asc" },
        { sort_dir: false, expected: "asc" },
        { sort_dir: {}, expected: "asc" },
        { sort_dir: "asc", expected: "asc" },
        { sort_dir: "ASC", expected: "asc" },
        { sort_dir: "DESC", expected: "desc" },
        { sort_dir: "desc", expected: "desc" },
      ];
      arrange.forEach((i) => {
        expect(
          new SearchParams({ sort: "field", sort_dir: i.sort_dir as any })
            .sort_dir
        ).toEqual(i.expected);
      });
    });
    test("page props: filter", () => {
      const params = new SearchParams();
      expect(params.filter).toBeNull();
      const arrange = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: "", expected: null },
        { filter: 0, expected: "0" },
        { filter: -1, expected: "-1" },
        { filter: 5.5, expected: "5.5" },
        { filter: 1, expected: "1" },
        { filter: 2, expected: "2" },
        { filter: "4", expected: "4" },
        { filter: {}, expected: "[object Object]" },
        { filter: "aaa", expected: "aaa" },
      ];
      arrange.forEach((i) => {
        expect(
          new SearchParams({ filter: i.filter as any }).filter
        ).toEqual(i.expected);
      });
    });
  });
});
