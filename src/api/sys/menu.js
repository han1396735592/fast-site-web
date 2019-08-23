import BaseService from '../BaseService.js'
import util from '../requestUtil'
class SysUserService extends BaseService {
  constructor () {
    super('/sysMenu')
  }
  tree (parameter) {
    return util.get(`${this.basePath}/tree`, parameter)
  }
}
export default new SysUserService()
