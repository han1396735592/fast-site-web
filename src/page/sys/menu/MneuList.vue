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
            <a-button icon="edit" type="primary" @click="$refs.menuEdit.edit(record)">编辑</a-button>
            &nbsp;
            <a-button type="primary" @click="$refs.menuEdit.add({})">添加</a-button>
            &nbsp;
            <a-button v-if="! (false || record.children && record.children.length>0)" type="danger" @click="delAll">删除
            </a-button>
          </div>

          <div slot-scope="text" slot="icon">
            <a-icon style="fontSize:20px" :type="text"/>
          </div>
          <a-tag color="red">red</a-tag>

        </a-table>
      </a-layout-content>
      <a-layout-footer>
        <menu-edit ref="menuEdit" ></menu-edit>
      </a-layout-footer>
    </a-layout>
  </page-view>

</template>

<script>
import { STable } from '@/components'
import PageView from '../../../layouts/PageView'
import MenuEdit from './MenuEdit'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%'
  }, {
    title: '标题',
    dataIndex: 'title',
    width: '10%',
    align: 'center'
  }, {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    width: '5%',
    scopedSlots: { customRender: 'icon' }
  }, {
    title: '组件',
    dataIndex: 'component',
    width: '10%'
  }, {
    title: '路径',
    dataIndex: 'path',
    width: '10%'
  }, {
    title: '重定向',
    dataIndex: 'redirect',
    width: '10%'
  }, {
    title: '权限标志',
    dataIndex: 'flag',
    width: '10%'
  }, {
    dataIndex: 'action',
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    MenuEdit,
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
    this.$service.menuService.tree().then(res =>
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
