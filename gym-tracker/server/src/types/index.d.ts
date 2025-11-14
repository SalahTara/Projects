import "express";

export type userPayload = {
  id: number;
  email: string;
  iat?: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
