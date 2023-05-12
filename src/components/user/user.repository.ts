import {
  DataSource,
  Repository,
  InsertResult,
  UpdateResult,
  FindOptionsSelect,
  FindOptionsRelations,
} from "typeorm";
import AppDataSource from "../../configs/database/datasource.config";

import { UserEntity } from "./user.entity";
import { UserI } from "./user.types";
import { HTTP404Error } from "../../shared/error-handler/custom-errors/http-404-error.error";
import { ALS } from "../../shared/local-storage/internationalization.storage";
import { configPagination } from "../../shared/pagination";
import {
  PaginationRequestI,
  PaginationResult,
} from "src/shared/pagination/pagination.interface";

import { CompanyEntity } from "../company/company.entity";
import { DepartmentE } from '../departments/entities/departments.entity';
import { PositionE } from '../positions/entities/position.entity';
export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, AppDataSource.createEntityManager());
  }
  
  private readonly companyRepository: Repository<CompanyEntity> = AppDataSource.getRepository(CompanyEntity);
  private readonly departmentRepository: Repository<DepartmentE> = AppDataSource.getRepository(DepartmentE);
  private readonly positionRepository: Repository<PositionE> = AppDataSource.getRepository(PositionE);

  private readonly relations = (
    pag: boolean,
    one?: boolean
  ): FindOptionsRelations<UserEntity> => {
    return {
      // position: {
      //   department: pag
      // },
      // company: pag,
    };
  };

  private readonly select = (
    pag: boolean,
    one?: boolean
  ): FindOptionsSelect<UserEntity> => {
    return {
      id: true,
      nombre: pag,
      apellido_p: pag,
      correo: true,
      // isAdmin: true,
      // company: {
      //   id: true,
      //   name: true,
      //   alias: true,
      //   imagePath: true,
      // },
      // position: {
      //   id: true,
      //   name: true,
      //   department: {
      //     id: true,
      //     name: true,
      //   },
      // },
    };
  };
  async getUsers(
    pagination: PaginationRequestI
  ): Promise<PaginationResult<UserEntity>> {
    const { offset, desc, perPage, sortBy, filters } =
      configPagination(pagination);

    const [rows, total]: [UserEntity[], number] = await this.findAndCount({
      order: {
        [sortBy]: desc,
      },
      take: perPage,
      relations: this.relations(true),
      select: this.select(true),
      skip: offset,
      where: { ...filters },
    });
    return { result: rows, total };
  }

  async storeUser(user: UserI): Promise<UserEntity> {
    return await this.save(user);
  }
  async updateUser(user: UserI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, user);
  }
  async getUserById(id: number): Promise<UserEntity | null> {
    return await this.findOne({
      where: {
        id,
      },
      relations: {
        // company: {
        //   client: true,
        // },
      },
      select: {
        // company: {
        //   name: true,
        //   id: true,
        //   clientId: true,
        //   client: {
        //     name: true,
        //     isActive: true,
        //   },
        // },
      },
    });
  }
  async deleteUserById(id: number): Promise<UpdateResult> {
    return await this.softDelete({
      id,
    });
  }

  async recoverPassword(id: number, password: string): Promise<UpdateResult> {
    const data = this.findOne({ where: { id } });
    if (!data) {
      throw new HTTP404Error({
        name: ALS.getI18n().__("components.user.userNotFound"),
        description: ALS.getI18n().__("components.user.userNotFound"),
      });
    }

    return await this.update(id, { password });
  }

  async misc(clientId: number){
    const companies = await this.companyRepository.find({where: { clientId } });
    const departments = await this.departmentRepository.find({where: { company: { clientId } } });
    const positions = await this.positionRepository.find({where: { department: { company: { clientId } } } });

    const data: {} = {
      companies,
      departments,
      positions
    }
    return data
  }
  
  async getProfile(id: number): Promise<UserEntity | null> {
    return await this.findOne({
      where: {
        id
      }, 
      relations: {
        // company: true,
        // position: {
        //   department: true
        // }
      },
      select: {
        id: true,
        nombre: true,
        apellido_p: true,
        correo: true,
        // company: {
        //   name:true
        // },
        // position: {
        //   name: true,
        //   department: {
        //     name: true
        //   }
        // }
      }
    })
  }
}
