<template>
  <page-view>
    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="title" slot-scope="currentPageData">
        Header
      </template>
      <!--<template slot="footer" slot-scope="currentPageData">-->
        <!--Footer-->
      <!--</template>-->
    </a-table>
  </page-view>
</template>
<script>
import PageView from '../../../layouts/PageView'

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  scopedSlots: { customRender: 'name' }
}, {
  title: '用户名',
  dataIndex: 'username'
}, {
  title: '密码',
  dataIndex: 'password'
}]
export default {
  components: { PageView },
  data () {
    return {
      data: [],
      columns
    }
  },
  beforeMount () {
    this.$service.sysUserService.getAll().then(res => {
      this.data = res
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>

</style>
