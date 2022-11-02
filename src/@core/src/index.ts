import { CreateCategoryUseCase } from "./category/application";
import { CategoryInMemoryRepository } from "./category/infra";


const p = new CreateCategoryUseCase(new CategoryInMemoryRepository());

console.log(p);
