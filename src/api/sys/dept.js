import BaseService from '../BaseService.js'
// import util from '../requestUtil'
class SysUserService extends BaseService {
  constructor () {
    super('/sysDept')
  }
}
export default new SysUserService()
