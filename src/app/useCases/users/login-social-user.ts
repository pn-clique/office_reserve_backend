import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities/user-entity";
import jwt from "jsonwebtoken";

export class LoginSocialUserUseCase implements UseCase {
  async execute(request: UserEntity): Promise<HttpResponse<any>> {
    try {
      const userExists = await Prisma.user.findUnique({
        where: { email: request.email },
      });
      if (userExists) {
        const token = jwt.sign(
          { userId: userExists.id },
          process.env.JWT_SECRET ?? "pn-clique-reserve-system",
          { expiresIn: "1d" }
        );
        const data = { user: userExists, token };

        return successResponse(data);
      }

      const user = await Prisma.user.create({
        data: {
          name: request.name,
          email: request.email,
          phone: request.phone,
          photo: request.photo,
          type_user: request.typeUser,
        },
      });

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET ?? "pn-clique-reserve-system",
        { expiresIn: "1d" }
      );

      const data = { user, token };

      return successResponse(data);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
