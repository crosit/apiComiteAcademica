import { FindOptionsRelations, FindOptionsSelect, Repository, DataSource } from 'typeorm';
import { CountryE } from '../enitites/country.entity';
import { StateE } from '../enitites/state.entity';
import dataSource from '../../../configs/database/datasource.config';
import { HTTP400Error } from '../../../shared/error-handler/custom-errors/http-400-error.error';
import { ALS } from '../../../shared/local-storage/internationalization.storage';
import { TaxSystemE } from '../enitites/taxsystem.entity';

// export class CountryRepository extends Repository<CountryE> {
export class MiscRepository {

    constructor() { }

    private readonly countryRepository = dataSource.getRepository(CountryE);
    private readonly stateRepository = dataSource.getRepository(StateE);
    private readonly taxSystemRepository = dataSource.getRepository(TaxSystemE);

    private readonly relations: FindOptionsRelations<CountryE> = {
        states: true
    }

    private readonly selectCountry = (pag: boolean, one?: boolean): FindOptionsSelect<CountryE> => {
        return {
            id: true,
            description: pag,
            iso: pag,
            createdAt: !!one,
            updatedAt: !!one,
            deletedAt: !!one,
            states: {
                id: true,
                description: pag,
                countryId: pag,
                createdAt: !!one,
                updatedAt: !!one,
                deletedAt: !!one,
            }
        }
    }

    async getCountries(): Promise<CountryE[]> {
        const options: any = {
            select: { ...this.selectCountry(true) },
            relations: { ...this.relations }
        }
        const data = await this.countryRepository.find(options);
        return data;
    }

    async getCountryById(id: number): Promise<CountryE> {
        const options: any = {
            select: { ...this.selectCountry(true) },
            relations: { ...this.relations }
        }
        const data = await this.countryRepository.findOne({ where: { id }, ...options });
        if (!data) {
            throw new HTTP400Error({
                name: `${ALS.getI18n().__('components.misc.country.notFound')}`,
                description: `${ALS.getI18n().__('components.misc.country.notFound')}`
            });
        }
        return data;
    }

    async getStateByCountryId(id: number): Promise<StateE[]> {

        const data = await this.stateRepository.find({ where: { countryId: id }, select: { id: true, description: true, countryId: true } })
        if (data.length === 0) {
            throw new HTTP400Error({
                name: `${ALS.getI18n().__('components.misc.state.statesNotFound')}`,
                description: `${ALS.getI18n().__('components.misc.state.statesNotFound')}`
            });
        }
        return data;
    }

    async getTaxSystem(): Promise<TaxSystemE[]> {
        return await this.taxSystemRepository.find({ select: { id: true, taxSystem: true, description: true } });
    }


}