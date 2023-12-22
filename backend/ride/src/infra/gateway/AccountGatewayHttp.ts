import axios from "axios";
import { AccountGateway } from "../../application/gateway/AccountGateway";

export class AccountGatewayHttp implements AccountGateway {
  async signup(input: any): Promise<any> {
    const responseSignup = await axios.post(
      "http://localhost:3001/signup",
      input
    );
    return responseSignup.data;
  }
  async getById(accountId: string): Promise<any> {
    const responseGetAccount = await axios.get(
      `http://localhost:3001/accounts/${accountId}`
    );
    return responseGetAccount.data;
  }
}
