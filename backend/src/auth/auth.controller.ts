import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";

class Auth implements Controller {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
    
  }
  private login(req: Request, res: Response) {
    res.send("Login route called");
    
  }
}

export default Auth;