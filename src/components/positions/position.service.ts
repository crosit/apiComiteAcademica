import { PositionE } from "./entities/position.entity";
import { PositionRepository } from './repository/position.repository';
import { ResponseServiceI } from "src/helpers/responses/interface/response.interface";
import { ResponseService } from "../../helpers/responses/response.service"
import { PositionCreateI } from './types/position.types';
import { PaginationRequestI } from '../../shared/pagination/pagination.interface';
export class PositionService {
    constructor() { }
    private readonly positionRepository: PositionRepository = new PositionRepository();

    async getAll(
        pagination: PaginationRequestI,
        clientId: number
    ): Promise<ResponseServiceI> {
        if (pagination.page && pagination.perPage) {
            const data = await this.positionRepository.getAllPositionsPaginated(pagination, clientId);
            return ResponseService(true, 'posiciones encontradas', data, 200)
        }
        const data = await this.positionRepository.getAllPositions(clientId);
        return ResponseService(true, 'posiciones encontradas', data, 200)
    }

    async store(payload: PositionCreateI): Promise<ResponseServiceI> {
        const data = await this.positionRepository.postPosition(payload);
        return ResponseService(true, 'posicion agregada', data, 200);
    }

    async getById(id: number): Promise<ResponseServiceI> {
        const data = await this.positionRepository.getPositionById(id);
        return ResponseService(true, 'posicion encontrada', data, 200);
    }

    async update(id: number, payload: PositionCreateI): Promise<ResponseServiceI> {
        const data = await this.positionRepository.updatePosition(id, payload);
        return ResponseService(true, 'posicion actualizada', data, 200);
    }

    async delete(id: number): Promise<ResponseServiceI> {
        const data = await this.positionRepository.deletePositionById(id);
        return ResponseService(true, 'posicion eliminada', data, 200);
    }
}

