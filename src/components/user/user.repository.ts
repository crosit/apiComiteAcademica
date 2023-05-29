import {
  DataSource,
  Repository,
  InsertResult,
  UpdateResult,
  FindOptionsSelect,
  FindOptionsRelations,
  In,
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

import { EstatusEntity } from "../company/company.entity";


export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, AppDataSource.createEntityManager());
  }
  
  private readonly companyRepository: Repository<EstatusEntity> = AppDataSource.getRepository(EstatusEntity);
  

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

  async storeUser(user: any): Promise<UserEntity> {


    return await this.save(user);
  }
  
  async updateUser(user: UserI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, user);
  }
  async getUserById(id: number): Promise<UserEntity | null> {
    
    return await this.findOne({
      where: {
        id:id,
      },
     
    });
  }

 
  async getUserByIdSolicitudes(id: number): Promise<UserEntity[] | null> {
    // console.log("id", id);
    
    return await this.find({
      relations: {
        solicitudes: true,
        
      },
      where: {
        id: id,
        // solicitudes: {id: id}
      },
    });
    
  }
  async getAllCometeUserById(id: number): Promise<UserEntity[] | null> {
    // console.log("id", id);
    
    return await this.find({
      relations: {
        solicitudes: true,
        
      },
      where: {
        tipoId: In([1, 2]),
        // solicitudes: {id: id}
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

  // async misc(clientId: number){
  //   const companies = await this.companyRepository.find({where: { clientId } });
  //   const departments = await this.departmentRepository.find({where: { company: { clientId } } });
  //   const positions = await this.positionRepository.find({where: { department: { company: { clientId } } } });

  //   const data: {} = {
  //     companies,
  //     departments,
  //     positions
  //   }
  //   return data
  // }
  
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
