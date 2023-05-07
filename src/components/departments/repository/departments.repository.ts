import { DepartmentE } from "../entities/departments.entity";
import {
  Repository,
  FindOptionsRelations,
  FindOptionsSelect,
  UpdateResult,
  DeleteResult,
} from "typeorm";
import AppDataSource from "../../../configs/database/datasource.config";
import { DepartmentI } from "../types/departments.types";
import { HTTP404Error } from "../../../shared/error-handler/custom-errors/http-404-error.error";
import {
  PaginationRequestI,
  PaginationResult,
} from "../../../shared/pagination/pagination.interface";
import { configPagination } from "../../../shared/pagination";
export class DepartmentRepository extends Repository<DepartmentE> {
  constructor() {
    super(DepartmentE, AppDataSource.createEntityManager());
  }

  private readonly relations = (
    pag: boolean,
    one?: boolean
  ): FindOptionsRelations<DepartmentE> => {
    return {
      positions: pag,
      company: pag
    };
  };

  private readonly select = (
    pag: boolean,
    one?: boolean
  ): FindOptionsSelect<DepartmentE> => {
    return {
      id: true,
      name: pag,
      description: pag,
      companyId: pag,
      createdAt: !!one,
      updatedAt: !!one,
      deletedAt: !!one,
      positions: {
        id: true,
        name: pag,
        description: pag,
        createdAt: !!one,
        updatedAt: !!one,
        deletedAt: !!one,
      },
      company: {
        id: true,
        name: pag,
        rfc: pag,
        clientId: pag,
      }
    };
  };

  async postDepartment(department: DepartmentI): Promise<DepartmentE> {
    const newDepartment = this.create(department);
    return await this.save(newDepartment);
  }

  async getDepartments(
    pagination: PaginationRequestI,
    clientId: number
  ): Promise<PaginationResult<DepartmentE>> {
    const { offset, desc, perPage, sortBy, filters } =
      configPagination(pagination);

    const [rows, total]: [DepartmentE[], number] = await this.findAndCount({
      order: {
        [sortBy]: desc,
      },
      take: perPage,
      relations: {...this.relations(true)},
      select: this.select(true),
      skip: offset,
      where: { ...filters, company: { clientId } },
    });

    return { result: rows, total };
  }

  async findById(id: number): Promise<DepartmentE> {
    const options: any = {
      relations: this.relations(true),
      select: this.select(true),
      where: { id },
    };
    const data = await this.findOne(options);
    if (!data) {
      throw new HTTP404Error({
        description: "Department not found",
        name: "Error getting department",
      });
    }
    return data;
  }

  async updateById(id: number, payload: DepartmentI): Promise<UpdateResult> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      throw new HTTP404Error({
        description: "Department not found",
        name: "Error updating department",
      });
    }
    return await this.update(id, payload);
  }

  async deleteById(id: number): Promise<DepartmentE> {
    return this.findById(id).then((data) => {
      return this.softRemove(data);
    });
  }
}
