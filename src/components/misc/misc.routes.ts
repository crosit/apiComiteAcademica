import { Application } from 'express';
import { MiscController } from './misc.controller';
import passport from 'passport';


const MODULE = 'misc';
const BASE_URL = '/api/misc'

const miscController: MiscController = new MiscController()

export = (app: Application) => {
    app.get(`${BASE_URL}/countries`,
        passport.authenticate("jwt", { session: false }),
        miscController.getCountries
    );
    
    app.get(
        `${BASE_URL}/tax-system`,
        passport.authenticate("jwt", { session: false }),
        miscController.getTaxSystem
    );

    app.get(
        `${BASE_URL}/state/:id`,
        passport.authenticate("jwt", { session: false }),
        miscController.getStateByCountryId
    );

    app.get(
        `${BASE_URL}/country/:id`,
        passport.authenticate("jwt", { session: false }),
        miscController.getCountryById
    )

}