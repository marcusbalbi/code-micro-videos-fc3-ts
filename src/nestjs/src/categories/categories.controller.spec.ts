import { CategoryOutputDto } from '@balbi/core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';

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
  it('should update a category', () => {
    expect(controller).toBeDefined();
  });
  it('should delete a category', () => {
    expect(controller).toBeDefined();
  });
  it('should find a category', () => {
    expect(controller).toBeDefined();
  });
  it('should search categories', () => {
    expect(controller).toBeDefined();
  });
});
