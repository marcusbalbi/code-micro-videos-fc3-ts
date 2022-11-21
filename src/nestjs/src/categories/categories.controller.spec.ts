import { CategoryOutputDto } from '@balbi/core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const output: CategoryOutputDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
      id: 'ramdom-uuid',
      created_at: new Date(),
    };
    const createUseCaseMock = {
      execute: jest.fn().mockReturnValue(output),
    };
    //@ts-expect-error testing
    controller['createCategory'] = createUseCaseMock;
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const result = await controller.create(input);
    expect(result).toStrictEqual(output);
    expect(createUseCaseMock.execute).toBeCalledWith(input);
  });
  it('should update a category', async () => {
    const output: CategoryOutputDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
      id: 'ramdom-uuid',
      created_at: new Date(),
    };
    const updateUseCaseMock = {
      execute: jest.fn().mockReturnValue(output),
    };
    //@ts-expect-error testing
    controller['updateCategory'] = updateUseCaseMock;
    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const result = await controller.update(output.id, input);
    expect(result).toStrictEqual(output);
    expect(updateUseCaseMock.execute).toBeCalledWith({
      ...input,
      id: output.id,
    });
  });
  it('should delete a category', async () => {
    const id = 'aa-bb-cc-dd';
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller['removeCategory'] = mockDeleteUseCase;
    const output = await controller.remove(id);
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });
  it('should search a category', async () => {
    const expectedOutput = {
      items: [
        {
          id: 'aa-bb-cc-dd',
          name: 'some name',
          description: 'some desc',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockSearchUser = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller['listCategories'] = mockSearchUser;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'test',
    };
    const output = await controller.search(searchParams);
    expect(mockSearchUser.execute).toHaveBeenCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
  it('should find acategory', async () => {
    const id = 'aa-bb-cc-dd';
    const expectedOutput = {
      id,
      name: 'some name',
      description: 'some desc',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUser = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller['getCategory'] = mockGetUser;
    const output = await controller.findOne(id);
    expect(mockGetUser.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });
});
