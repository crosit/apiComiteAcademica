import { ProfileService } from "./profile.service";
import { NextFunction, Request, Response } from 'express';

export class ProfileController {
    constructor() { }

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const profileService: ProfileService = new ProfileService();
            const data = await profileService.getProfile(req.user.id);
            return res.status(200).send(data)
        } catch (error) {
            next(error)
        }
    }
}