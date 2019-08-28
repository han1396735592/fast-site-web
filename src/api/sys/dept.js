import BaseService from '../BaseService.js'
import util from '../requestUtil'
// import util from '../requestUtil'
class SysUserService extends BaseService {
  constructor () {
    super('/sysDept')
  }
  tree (parameter) {
    return util.get(`${this.basePath}/tree`, parameter)
  }
}
export default new SysUserService()
