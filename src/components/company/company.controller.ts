import { NextFunction, Request, Response } from "express";

import { CompanyService } from "./company.service";

export class CompanyController {
  constructor() { }
  //   private companyService: CompanyService = new CompanyService();
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const newCompany = await companyService.store(req.body);
      return res.send({ data: newCompany, success: true }).status(201);
    } catch (error: any) {
      next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const companies = await companyService.getAll(+req.user.clientId);
      return res.send({ data: companies, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const companyExists = await companyService.getById(+req.params.id);
      return res.send({ data: companyExists, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async misc(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const data = await companyService.misc();
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const data = await companyService.update(req.body, +req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const companyService: CompanyService = new CompanyService();
      const data = await companyService.delete(+req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
}
