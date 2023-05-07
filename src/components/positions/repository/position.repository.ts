import { Repository, UpdateResult, FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { PositionE } from '../entities/position.entity';
import AppDataSource from '../../../configs/database/datasource.config';
import { PositionCreateI } from '../types/position.types';
import { HTTP404Error } from '../../../shared/error-handler/custom-errors/http-404-error.error';
import { PaginationRequestI } from '../../../shared/pagination/pagination.interface';
import { PaginationResult } from '../../../shared/pagination/pagination.interface';
import { configPagination } from '../../../shared/pagination/index';
import { ALS } from '../../../shared/local-storage/internationalization.storage';

export class PositionRepository extends Repository<PositionE> {
    constructor() {
        super(PositionE, AppDataSource.createEntityManager());
    }

    private readonly relations: FindOptionsRelations<PositionE> = {
        department: {
            company: true,
        }
    }

    private readonly selectOptions = (pag: boolean, one?: boolean): FindOptionsSelect<PositionE> => {
        return {
            id: true,
            name: pag,
            description: pag,
            createdAt: !!one,
            updatedAt: !!one,
            deletedAt: !!one,
            department: {
                id: true,
                name: pag,
                description: pag,
                createdAt: !!one,
                updatedAt: !!one,
                deletedAt: !!one,
                company: {
                    id: true,
                    name: pag,
                    clientId: pag,
                }
            }
        }
    }

    async getAllPositionsPaginated(
        pagination: PaginationRequestI,
        clientId: number
    ): Promise<PaginationResult<PositionE>> {
        const { offset, desc, perPage, sortBy, filters } = configPagination(pagination)
        const options = {
            select: { ...this.selectOptions(true) },
            relations: { ...this.relations },
            where: { ...filters, department: { company: { clientId } } },
            order: { [sortBy]: desc },
            take: perPage,
            skip: offset,
        }
        const [rows, total] = await this.findAndCount(options);
        return { result: rows, total }
    }

    async getAllPositions(
        clientId: number
    ): Promise<PositionE[]> {
        const options = {
            relations: { ...this.relations },
            select: { ...this.selectOptions(true) },
            where: { department: { company: { clientId } } },
        }
        return await this.find(options);
    }

    async postPosition(payload: PositionCreateI): Promise<PositionE> {
        const position = this.create(payload);
        return await this.save(position);
    }

    async getPositionById(id: number): Promise<PositionE | null> {
        const data = await this.findOne({ where: { id } })
        if (!data) {
            throw new HTTP404Error({
                description: ALS.getI18n().__("components.position.positionNotFound"),
                name: ALS.getI18n().__("components.position.positionNotFound"),
            })
        }
        return data;
    }

    async updatePosition(id: number, payload: PositionCreateI): Promise<UpdateResult> {
        const exist = await this.findOne({ where: { id } })
        if (!exist) {
            throw new HTTP404Error({
                description: ALS.getI18n().__("components.position.positionNotFound"),
                name: ALS.getI18n().__("components.position.positionNotFound"),
            })
        }
        return await this.update(id, { ...payload });
    }

    async deletePositionById(id: number): Promise<UpdateResult> {
        const exist = await this.findOne({ where: { id } })
        if (!exist) {
            throw new HTTP404Error({
                description: ALS.getI18n().__("components.position.positionNotFound"),
                name: ALS.getI18n().__("components.position.positionNotFound"),
            })
        }
        return await this.softDelete(id);
    }




}