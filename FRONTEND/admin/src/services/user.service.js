import { createApiClient } from "./api.service";
class User {
  constructor(baseUrl = "/api/shop/user") {
    this.api = createApiClient(baseUrl, true);
  }
  async getUser(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}
export default new User();
