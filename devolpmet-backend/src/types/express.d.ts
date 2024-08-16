import * as express from "express";

declare global {
  namespace Express {
    interface Response {
      cookie(name: string, value: string, options?: express.CookieOptions): this;
    }
  }
}