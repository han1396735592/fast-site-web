import util from './requestUtil'

class service {
  constructor (path) {
    this.basePath = path
  }

  add (parameter) {
    return util.post(`${this.basePath}/add`, parameter)
  }

  get (id) {
    return util.get(`${this.basePath}/page`, { id: id })
  }

  page (parameter) {
    return util.get(`${this.basePath}/page`, parameter)
  }

  getAll () {
    return util.get(`${this.basePath}/getAll`)
  }

  del (id) {
    return util.get(`${this.basePath}/del`, { id: id })
  }
  query (parameter) {
    return util.post(`${this.basePath}/query`, parameter)
  }

  update (parameter) {
    return util.post(`${this.basePath}/update`, parameter)
  }

  batchDelIds (parameter) {
    return util.get(`${this.basePath}/batchDelIds`,  { ids: parameter })
  }

  pageQuery (parameter) {
    return util.post(`${this.basePath}/pageQuery`, parameter)
  }
}

export default service
