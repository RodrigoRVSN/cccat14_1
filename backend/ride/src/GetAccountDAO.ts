export interface GetAccountDAO {
  getById: (accountId: string) => Promise<any>
}
