import { Category } from "../../domain/entities/category";
import InMemoryRepository from "../../../shared/domain/repository/in-memory.repository";
import { CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository extends InMemoryRepository<Category> implements CategoryRepository {}