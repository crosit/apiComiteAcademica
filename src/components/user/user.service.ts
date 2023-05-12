import { UpdateResult } from "typeorm";

import i18n from "i18n";
import { UserEntity } from "./user.entity";
import { UserI } from "./user.types";
import { UserRepository } from "./user.repository";
import { HTTP404Error } from "../../shared/error-handler/custom-errors/http-404-error.error";
import { ALS } from "../../shared/local-storage/internationalization.storage";
import { TemporalService } from "../temporal_tokens/temporal.service";
import {
  PaginationRequestI,
  PaginationResult,
} from "../../shared/pagination/pagination.interface";

export class UserService {
  constructor() {}
  private readonly userRepository: UserRepository = new UserRepository();
  private readonly temporalService: TemporalService = new TemporalService();

  async store(paylod: UserI): Promise<UserEntity> {
    const newUser = await this.userRepository.storeUser(paylod);
    return newUser;
  }
  async getById(id: number): Promise<UserEntity> {
    const userExists = await this.userRepository.getUserById(id);
    if (!userExists) {
      throw new HTTP404Error({
        name: `${ALS.getI18n().__("components.user.userNotFound")} ${id}`,
        description: `${ALS.getI18n().__(
          "components.user.userNotFound"
        )} ${id}`,
      });
    }
    return userExists;
  }
  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { correo:email } });
  }
  async getAll(
    pagination: PaginationRequestI
  ): Promise<PaginationResult<UserEntity>> {
    const userExists = await this.userRepository.getUsers(pagination);

    return userExists;
  }
  async update(paylod: UserI, id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.userRepository.updateUser(paylod, id);
    return data;
  }
 
  async delete(id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.userRepository.deleteUserById(id);
    return data;
  }
  changeLanguage(language: string): any {
    ALS.setI18n(i18n, language);
  }
  async misc(clientId: number){
    return await this.userRepository.misc(clientId);
  }
}
