import BaseService from '../BaseService.js'
// import util from '../requestUtil'
class SysRoleService extends BaseService {
  constructor () {
    super('/sysRole')
  }
}
export default new SysRoleService()
