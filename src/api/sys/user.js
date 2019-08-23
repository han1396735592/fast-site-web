import BaseService from '../BaseService.js'
import util from '../requestUtil'
class SysUserService extends BaseService {
  constructor () {
    super('/sysUser')
  }
  login (parameter) {
    return util.post(`${this.basePath}/login`, parameter)
  }
}
export default new SysUserService()
