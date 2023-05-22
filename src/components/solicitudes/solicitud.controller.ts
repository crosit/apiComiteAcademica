import { NextFunction, Request, Response } from "express";

import { SolicitudService } from "./solicitud.service";

export class CompanyController {
  constructor() { }
  //   private solicitudService: SolicitudService = new SolicitudService();
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const newCompany = await solicitudService.store(req.body);
      return res.send({ data: newCompany, success: true }).status(201);
    } catch (error: any) {
      next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const companies = await solicitudService.getAll(req.user.id);
      return res.send({ data: companies, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const companyExists = await solicitudService.getById(+req.params.id);
      return res.send({ data: companyExists, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async misc(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const data = await solicitudService.misc();
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async setDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const data = await solicitudService.setDocument(req.file, +req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const data = await solicitudService.update(req.body, +req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();
      const data = await solicitudService.delete(+req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
}
