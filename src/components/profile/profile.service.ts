import { UserRepository } from '../user/user.repository';
import { ResponseServiceI } from "src/helpers/responses/interface/response.interface";
import { ResponseService } from "../../helpers/responses/response.service"
export class ProfileService { 
    constructor() {}
    private readonly userRepository: UserRepository = new UserRepository();
    async getProfile(id: number): Promise<ResponseServiceI> {
            const data = await this.userRepository.getProfile(id);
            return ResponseService(true, 'perfil', data, 200)
    }
}

