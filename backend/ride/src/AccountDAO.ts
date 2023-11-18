import { GetAccountDAO } from "./GetAccountDAO"
import { SignupAccountDAO } from "./SignupAccountDAO"

export interface AccountDAO extends GetAccountDAO, SignupAccountDAO {
}
