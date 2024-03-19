import { Request, Response } from "express";
import { UserLoginDto, UserRegisterDto } from "./dtos";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";
import { compare, hash } from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UsersCollection {
  async Add(req: Request, res: Response) {
    try {
      const dto = new UserRegisterDto(req.body);

      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const email = await prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "user by that email already exists",
        });
      }

      const password = await hash(dto.password, 10);

      const user = await prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: password,
          phoneNumber: dto.phonenumber,
        },
      });

      return res.status(StatusCodes.CREATED).json({
        user: user,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error.message || error,
      });
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const dto = new UserLoginDto(req.body);

      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "user with that email not found",
        });
      }

      const password = await compare(dto.password, user.password);

      if (!password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "incorrect password",
        });
      }

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };

      const token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`);
      return res.status(StatusCodes.OK).json({
        username: user.username,
        token: token,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error.message || error,
      });
    }
  }
}
