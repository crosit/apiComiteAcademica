import { NextFunction, Request, Response } from "express";

import { SolicitudService } from "./solicitud.service";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { SolicitudEntity } from "./solicitud.entity";

export class CompanyController {
  constructor() { }
  //   private solicitudService: SolicitudService = new SolicitudService();
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const solicitudService: SolicitudService = new SolicitudService();

      const usuarioService: UserRepository = new UserRepository();
      
      const saveSolicitud = await solicitudService.store( req.body);
      const user:any = await usuarioService.getUserByIdSolicitudes(req.user?.id);
      const comite:any = await usuarioService.getAllCometeUserById(req.user?.id);
      // console.log("comite", comite);
      
      for (let i = 0; i < comite.length; i++) {
        console.log("comite", comite[i]);
        if (comite[i] !== null) {
        

          if (comite[i].solicitudes) {
            comite[i].solicitudes.push(saveSolicitud);
          } else {
            comite[i].solicitudes = [saveSolicitud];
          }
          // console.log("solicituasdasdwqd", comite[i].solicitudes);
          
          
          // comite[i].solicitudes = [saveSolicitud];
          
        }
        
        await usuarioService.storeUser(comite[i]);
        
      }
      

      if (user[0] !== null) {
        

        if (user[0].solicitudes) {
          user[0].solicitudes.push(saveSolicitud);
        } else {
          user[0].solicitudes = [saveSolicitud];
        }
        // console.log("solicituasdasdwqd", user[0].solicitudes);
        
        
        // user[0].solicitudes = [saveSolicitud];
        
      }
      
      const saveUser = await usuarioService.storeUser(user[0]);

      // console.log("saveUser", saveUser);
      // console.log("saveSolicitud", saveSolicitud);
      


      return res.send({ data: saveUser, success: true }).status(201);
    
    
    } catch (error: any) {
      next(error);
    }
  }


  async index(req: Request, res: Response, next: NextFunction) {
    try {
      
      const usuarioService: UserRepository = new UserRepository();
      
      const user = await usuarioService.getUserByIdSolicitudes(req.user?.id);
      
      // const service = await solicitudService.getById(2);
      // console.log("service", service);
      
      // const prueba = user?.solicitudes?.push(service);
      // const solicitudes = await userRepository.save(user);

      
      
      return res.send({ data: user, success: true }).status(200);
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
