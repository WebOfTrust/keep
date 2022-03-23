import m from 'mithril';

class Endpoint {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getHeaders() {
    let headers = {};
    // If logged in, add the authorization header
    if (!!localStorage.getItem('uid') && !!localStorage.getItem('token')) {
      headers.Authorization = `Token ${localStorage.getItem('token')}`;
    }
    return headers;
  }

  create(body = {}) {
    return m.request({
      method: 'POST',
      url: this.createUrl(),
      headers: this.getHeaders(),
      body,
    });
  }

  read(id, params = {}) {
    return m.request({
      method: 'GET',
      headers: this.getHeaders(),
      url: this.createUrl(id),
      params,
    });
  }

  list(params = {}) {
    return m.request({
      method: 'GET',
      url: this.createUrl(),
      headers: this.getHeaders(),
      params,
    });
  }

  update(body = {}, put = true) {
    let method = null;
    if (put) {
      method = 'PUT';
    } else {
      method = 'PATCH';
    }
    return m.request({
      method,
      url: this.createUrl(),
      headers: this.getHeaders(),
      body,
    });
  }

  updateId(id, body = {}, put = true) {
    let method = null;
    if (put) {
      method = 'PUT';
    } else {
      method = 'PATCH';
    }
    return m.request({
      method,
      url: this.createUrl(id),
      headers: this.getHeaders(),
      body,
    });
  }

  delete(id) {
    return m.request({
      method: 'DELETE',
      url: this.createUrl(id),
      headers: this.getHeaders(),
    });
  }

  listRoute(method, route, body = {}, params = {}) {
    return m.request({
      method,
      url: `${this.createUrl()}${route}`,
      headers: this.getHeaders(),
      body,
      params,
    });
  }

  detailRoute(method, route, id, body = {}, params = {}) {
    return m.request({
      method,
      url: `${this.createUrl()}${id}/${route}`,
      headers: this.getHeaders(),
      body,
      params,
    });
  }

  createUrl(id = null) {
    if (id) {
      return `${process.env.API_HOST}:${API.port}/${this.endpoint}/${id}/`;
    } else {
      return `${process.env.API_HOST}:${API.port}/${this.endpoint}`;
    }
  }
}

class API {
  static port = process.env.API_PORT;
  static Boot = new Endpoint('boot');
  static Code = new Endpoint('codes');
  static Identifier = new Endpoint('ids');
}

module.exports = API;
