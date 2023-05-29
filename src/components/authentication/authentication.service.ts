import { ALS } from "../../shared/local-storage/internationalization.storage";
import { HTTP400Error } from "../../shared/error-handler/custom-errors/http-400-error.error";
import { UserService } from "../user/user.service";
import { decryptPass, encryptPass } from "../../helpers/bcrypt";
import { signToken } from "../../helpers/jwt";
import { HTTP404Error } from '../../shared/error-handler/custom-errors/http-404-error.error';
import { UserRepository } from '../user/user.repository';
import { TemporalService } from '../temporal_tokens/temporal.service';
import { emailService } from '../../helpers/email/email.service'
import { EmailI } from '../../helpers/email/interfaces/email.interface'
import config from '../../configs/envs';
import { UserI } from "../user/user.types";

// export const loginService = () => {
//   throw new HTTP400Error({ description: "The user could not loggin cause an bad request error", name: "Error Login User" });
//   try {
//     // i18n.setLocale("en");

//     return {
//       description: "Eso es una prueba",
//       name: "Probandooo",
//       intern: ALS.getI18n().__("hello"),
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

export class AuthenticateService {
  constructor() {}

  private readonly userRepository: UserRepository = new UserRepository();
  private readonly temporalService: TemporalService = new TemporalService();

  async signIn(credentials: { correo: string; password: string }) {
    const userService: UserService = new UserService();

    const userFound = await userService.getByEmail(credentials.correo);
    

    if (!userFound) {
      throw new HTTP400Error({
        name: "Wrong Credentials",
        description: "Wrong Credentials",
      });
    }

    if (!userFound.password) {
      throw new HTTP400Error({
        name: "Reset the password",
        description: "Reset the password",
      });
    }

    const isValidPass: boolean = decryptPass(
      credentials.password,
      userFound.password
    );
   
    if (!isValidPass) {
      throw new HTTP400Error({
        name: "Wrong Credentials",
        description: "Wrong Credentials",
      });
    }
    let TOKEN: string = "";
    TOKEN = signToken(
      {
        id: userFound.id,
        email: userFound.correo,
        name: userFound.nombre + " " + userFound.apellido_p + " " + userFound.apellido_m,
        tipoId: userFound.tipoId,
      },
      { expiresIn: "1d" }
    );
    let user = {
      id: userFound.id,
        email: userFound.correo,
        name: userFound.nombre + " " + userFound.apellido_p + " " + userFound.apellido_m,
        tipoId: userFound.tipoId,
    }
    return {
      token: TOKEN,
      user: user,
    };
  }
  async singUp (credentials: UserI) {
    const userService: UserService = new UserService();
    
    const userFound = await userService.getByEmail(credentials.correo);
    if (userFound) {
      throw new HTTP400Error({
        name: "User already exists",
        description: "User already exists",
      });
    }
    const encryptedPass: string = encryptPass(credentials.password);
    const userCreated = await userService.store({
      nombre: credentials.nombre,
      apellido_p: credentials.apellido_p,
      apellido_m: credentials.apellido_m,
      correo: credentials.correo,
      password: encryptedPass,
      numero_control: credentials.numero_control,
      telefono: credentials.telefono,
      tipoId: 3,
    });
    return userCreated;
  }
  async requestRecoverPassword(email: string) {
    const user = await this.userRepository.findOne({where: {correo: email}});
    if (!user) {
      throw new HTTP404Error({
        name: ALS.getI18n().__("components.user.userNotFound"),
        description: ALS.getI18n().__("components.user.userNotFound"),
      });
    }

    let token: string = new Date().getTime().toString()
    token = token.replace(/1/g, 'J').replace(/6/g, 'Ñ').replace(/3/g, 'Y')

    await this.temporalService.storeTemporalToken({
      description: 'Request recover password',
      recordId: user.id,
      token,
      service: 'recover-password'
    })
    const dataEmail: EmailI = {
      to: [user.correo],
      subject: `Sabeeo - ${ALS.getI18n().__("components.user.requestRecoverPassword")}`,
      template: 'recoverpass',
      context: {
        name: user.nombre,
        email: user.correo,
        url: config.FRONT_URL + '/recover-password/' + token,
      }
    }

    const emailSent = await emailService(dataEmail);
    return emailSent;
  }
  async recoverPassword(token: string, password: string){   
    const isValidToken = await this.temporalService.isValidToken(token, 'recover-password');
    if(isValidToken.active === false) {
      throw new HTTP404Error({
        name: isValidToken.message,
        description: isValidToken.message,
      });
    }
    await this.temporalService.deleteTemporalToken(token, 'recover-password');
    const newPass = encryptPass(password);
    return this.userRepository.recoverPassword(isValidToken.recordId, newPass)
  }
}
