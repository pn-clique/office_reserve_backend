import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import { ILoginRequest } from "../../../@shareds/interfaces/login-interface";
import Prisma from "../../../infra/database/prisma-db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class LoginUseCase  implements UseCase {
  async execute(request: ILoginRequest): Promise<HttpResponse<any>> {
    try {
      const user = await Prisma.user.findUnique({ where: { email: request.email } });
      if(!user) {
        return badRequestResponse({ message: 'User not found' });
      }

      const isValidPassword = bcrypt.compareSync(request.password, String(user.password));

      if(!isValidPassword) {
        return badRequestResponse({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? 'pn-clique-reserve-system', { expiresIn: '1d' });

      const data = { user, token };

      return successResponse(data);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}