<template>
  <page-view>
    <a-layout>
      <a-layout-content>
        <a-table
          bordered
          ref="table"
          size="default"
          :columns="columns"
          :rowKey="(record) => record.id"
          :dataSource="tableData"
        >

          <div slot="action" slot-scope="text, record">
            <a-button icon="edit" type="primary" @click="$refs.deptEdit.edit(record)">编辑</a-button>
            &nbsp;
            <a-button type="primary" @click="$refs.deptEdit.add({})">添加</a-button>
            &nbsp;
            <a-button v-if="! (false || record.children && record.children.length>0)" type="danger" @click="delAll">删除
            </a-button>
          </div>

          <span slot="enable" slot-scope="enable">
            <a-tag  :color="enable?'blue':'pink'">{{enable?"正常":"锁定"}}</a-tag>
          </span>
        </a-table>
      </a-layout-content>
      <a-layout-footer>
        <dept-edit ref="deptEdit"></dept-edit>
      </a-layout-footer>
    </a-layout>
  </page-view>

</template>

<script>
import { STable } from '@/components'
import PageView from '../../../layouts/PageView'
import DeptEdit from './DeptEdit'




const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%'
  }, {
    title: '描述',
    dataIndex: 'description',
    width: '10%',
    align: 'center'
  }, {
    title: '名称',
    dataIndex: 'name',
    align: 'center'
  }, {
    title: '状态',
    dataIndex: 'enable',
    scopedSlots: { customRender: 'enable' }
  }, {
    dataIndex: 'action',
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    DeptEdit,
    PageView,
    STable
  },
  name: 'MenuList',
  data () {
    return {
      columns,
      tableData: []
    }
  },
  beforeMount () {
    this.$service.deptService.tree().then(res =>
      this.tableData = res
    )
  },
  methods: {

    delAll () {
    }
  }
}
</script>
<style>
  .ant-layout-header {
    background-color: #d3f1ff;
  }
</style>
