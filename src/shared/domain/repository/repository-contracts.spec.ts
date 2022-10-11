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
        expect(new SearchParams({ page: i.page as any }).page).toEqual(i.expected);
      });
    });
    test("page props: per_page", () => {
      const arrange = [
        { per_page: null, expected: 15},
        { per_page: undefined, expected: 15},
        { per_page: 0, expected: 15},
        { per_page: -1, expected: 15},
        { per_page: 5.5, expected: 5 },
        { per_page: 1, expected: 1},
        { per_page: 2, expected: 2 },
        { per_page: "", expected: 15},
        { per_page: "4", expected: 4 },
        { per_page: {}, expected: 15},
        { per_page: "aaa", expected: 15},
      ];
      arrange.forEach((i) => {
        expect(
          new SearchParams({ per_page: i.per_page as any }).per_page
        ).toEqual(i.expected);
      });
    });
  });
});
