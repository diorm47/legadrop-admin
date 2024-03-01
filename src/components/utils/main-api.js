const mainApiOptions = {
  baseUrl: "https://legadrop.org",

  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};
const path = "/6383d341-4d14-4868-81ba-3c6382f2128e";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponseStatus(response) {
    return response.ok
      ? response.json()
      : response.json().then((err) => Promise.reject(err.message));
  }
  async _sendRequest({ endpoint, method = "GET", body, requiresToken = true }) {
    const headers = { ...this._headers };

    if (requiresToken) {
      headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    return this._checkResponseStatus(res);
  }

  // Login
  async loginAction(userData) {
    return this._sendRequest({
      endpoint: `/sign_in`,
      method: "POST",
      body: userData,
      requiresToken: false,
    });
  }
  // Get employees list
  async getEmployeesAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/employees`,
      method: "GET",
      body: userData,
    });
  }
  // Create employee
  async createEmployeeAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/employee`,
      method: "POST",
      body: userData,
    });
  }
  // Get employee
  async getEmployee(userData) {
    return this._sendRequest({
      endpoint: `/admin/employee/${userData}`,
      method: "GET",
      // body: userData,
    });
  }
  // delete employee
  async deleteEmployeeAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/employee`,
      method: "DELETE",
      body: userData,
    });
  }
  // set role
  async setRoleAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/assign/role`,
      method: "POST",
      body: userData,
    });
  }
  // get roles
  async getRolesAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/roles`,
      method: "GET",
      body: userData,
    });
  }
  // set permissions
  async setPermissionAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/assign/permission`,
      method: "POST",
      body: userData,
    });
  }
  // get permissions
  async getPermissionAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/permissions`,
      method: "GET",
      body: userData,
    });
  }
  // get role permissions
  async getRolePermissionAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/role/permissions/?role=${userData}`,
      method: "GET",
    });
  }
  // set case category
  async setCaseCategoryAction(userData) {
    return this._sendRequest({
      endpoint: `${path}/category/`,
      method: "POST",
      body: userData,
    });
  }
  // get case category
  async getCaseCategoryAction(userData) {
    return this._sendRequest({
      endpoint: `${path}/category/`,
      method: "GET",
      body: userData,
    });
  }
  // delete case category
  async deleteCaseCategoryAction(id) {
    return this._sendRequest({
      endpoint: `${path}/category/${id}/`,
      method: "DELETE",
    });
  }
  // update case category
  async updateCaseCategoryAction(userData, id) {
    return this._sendRequest({
      endpoint: `${path}/category/${id}/`,
      method: "PUT",
      body: userData,
    });
  }
  // create case
  async createCaseAction(userData) {
    return this._sendRequest({
      endpoint: `${path}/cases/`,
      method: "POST",
      body: userData,
    });
  }
  // get case
  async getCase() {
    return this._sendRequest({
      endpoint: `${path}/cases/`,
      method: "GET",
      requiresToken: true,
    });
  }
  async deleteCase(userData) {
    return this._sendRequest({
      endpoint: `${path}/cases/${userData}/`,
      method: "DELETE",
    });
  }
  async updateCase(userData, id) {
    return this._sendRequest({
      endpoint: `${path}/cases/${id}/`,

      method: "PUT",
      body: userData,
    });
  }
  async getCaseByTranslit(data) {
    return this._sendRequest({
      endpoint: `${path}/cases/${data}/`,
      method: "GET",
      requiresToken: true,
    });
  }
  // get items
  async getItemsAction(userData) {
    return this._sendRequest({
      endpoint: `${path}/items/`,
      method: "GET",
      body: userData,
    });
  }
  async createItem(userData) {
    return this._sendRequest({
      endpoint: `${path}/items/`,
      method: "POST",
      body: userData,
    });
  }
  // get case items
  async getCaseItems(userData) {
    return this._sendRequest({
      endpoint: `/admin/case/${userData}/items`,
      method: "GET",
    });
  }
  // delete case items
  async deleteCaseItem(userData) {
    return this._sendRequest({
      endpoint: `/admin/case/item`,
      method: "DELETE",
      body: userData,
    });
  }
  // add items to case
  async addItemsCase(userData) {
    return this._sendRequest({
      endpoint: `/admin/case/add/items/list`,

      method: "POST",
      body: userData,
    });
  }
  // Passoword generator
  async createPasswordAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/spec/generator/password`,
      method: "POST",
      body: userData,
    });
  }
  // create positions
  async createPositionAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/role`,
      method: "POST",
      body: userData,
    });
  }

  // Get Case
  async getCaseAction(userData) {
    return this._sendRequest({
      endpoint: `/admin/case`,
      method: "POST",
      body: userData,
    });
  }

  async deleteItemAction(id) {
    return this._sendRequest({
      endpoint: `${path}/items/${id}/`,
      method: "DELETE",
    });
  }
  async getCaseId(userData) {
    return this._sendRequest({
      endpoint: `/admin/case`,
      method: "GET",
      body: userData,
    });
  }
  async getRarity() {
    return this._sendRequest({
      endpoint: `${path}/rarity_category/`,
      method: "GET",
    });
  }
  async deleteRarity(id) {
    return this._sendRequest({
      endpoint: `${path}/rarity_category/${id}/`,
      method: "DELETE",
    });
  }
  async updateRarity(data) {
    return this._sendRequest({
      endpoint: `/admin/group_category/update`,
      method: "POST",
      body: data,
    });
  }
  async getItem(id) {
    return this._sendRequest({
      endpoint: `${path}/items/${id}/`,
      method: "GET",
    });
  }
  async updateItem(data, id) {
    return this._sendRequest({
      endpoint: `${path}/items/${id}/`,
      method: "PUT",
      body: data,
    });
  }
  async setPagePerm(data) {
    return this._sendRequest({
      endpoint: `/admin/assign/page`,
      method: "POST",
      body: data,
    });
  }
  async getRolePages(data) {
    return this._sendRequest({
      endpoint: `/admin/role/pages/?role=${data}`,
      method: "GET",
      // body: data,
    });
  }

  // get conclusions
  async getConclusions(data) {
    return this._sendRequest({
      endpoint: `/api/v1/output`,
      method: "GET",
      // body: data,
    });
  }
  async getConclusion(data) {
    return this._sendRequest({
      endpoint: `/api/v1/output/${data}`,
      method: "GET",
    });
  }

  // Moogold
  async purcgaseItem(data) {
    return this._sendRequest({
      endpoint: `/api/v1/moogold/purchase/outputs/item`,
      method: "POST",
      body: data,
    });
  }
  async getMoogoldBalance() {
    return this._sendRequest({
      endpoint: `/api/v1/moogold/balance`,
      method: "GET",
    });
  }
  async cancelConclusion(data) {
    return this._sendRequest({
      endpoint: `/api/v1/output/${data}/cancelled`,
      method: "PUT",
    });
  }

  async getOrderID(data) {
    return this._sendRequest({
      endpoint: `/api/v1/moogold/${data}/order/list`,
      method: "GET",
    });
  }

  // User me
  async reEnter() {
    return this._sendRequest({
      endpoint: "/admin/me",
      requiresToken: true,
    });
  }

  // Users

  // Get users
  async getUsersActions() {
    return this._sendRequest({
      endpoint: `${path}/users/`,
      method: "GET",
    });
  }
  async getUserAction(id) {
    return this._sendRequest({
      endpoint: `${path}/user/${id}/`,
      method: "GET",
    });
  }

  // Rarity

  // Get rarity list
  async getRarytyListActions() {
    return this._sendRequest({
      endpoint: `${path}/rarity_category/`,
      method: "GET",
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
