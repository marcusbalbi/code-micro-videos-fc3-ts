import { Category } from "../../domain/entities/category";
import {InMemorySearchableRepository} from "../../../shared/domain/repository/in-memory.repository";
import { CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository {}