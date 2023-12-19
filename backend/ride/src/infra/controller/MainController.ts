import { GetAccount } from "../../application/usecase/GetAccount";
import { Signup } from "../../application/usecase/Signup";
import { Registry } from "../di/Registry";
import { HttpServer } from "../http/HttpServer";

export class MainController {
  constructor(
    registry: Registry
  ) {
    const httpServer = registry.inject('httpServer');
    const signup = registry.inject('signup');
    const getAccount = registry.inject('getAccount');

    httpServer.register("post", "/signup", async (params: any, body: any) => {
      console.log({ body })
      const output = await signup.execute(body);
      return output;
    });

    httpServer.register("get", "/accounts/:accountId", async (params: any, body: any) => {
      console.log({ params })
      const output = await getAccount.execute(params.accountId);
      return output;
    });
  }
}
