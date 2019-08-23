<template>
  <page-view>
    <a-layout>
      <a-layout-header>
        <a-row type="flex">
          <a-col :span="2" :offset="1">
                        <a-button type="primary" @click="$refs.sysUserEdit.add({})">添加</a-button>
          </a-col>
          <a-col :span="2">
            <a-button type="danger" @click="delAll">删除</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <s-table
          ref="table"
          size="default"
          :rowKey="(record) => record.id"
          :columns="columns"
          :data="loadData"
          :showPagination="true"
          :rowSelection="rowSelection"
        >
          <span slot="action" slot-scope="text, record">
<!--            <a @click="$refs.sysUserEdit.edit(record)">编辑</a>-->
          </span>
        </s-table>
      </a-layout-content>
      <a-layout-footer>
        <!--        <sys-user-edit ref="sysUserEdit" :update="()=>{this.$refs.table.refresh()}"></sys-user-edit>-->
      </a-layout-footer>
    </a-layout>

  </page-view>

</template>

<script>
import { STable } from '@/components'
import service from '@/api/service'
import PageView from '../../layouts/PageView'

export default {
  components: {
    PageView,
    STable
  },
  name: 'UserList',
  data () {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'username',
          dataIndex: 'username'
        }, {
          title: 'password',
          dataIndex: 'password'
        }, {
          title: '真实姓名',
          dataIndex: 'name'
        }, {
          table: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      rowSelection: {
        type: 'checkbox',
        onChange (selectedRowKeys, selectedRows) {
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        },
        selectedRowKeys: []
      },
      // 查询条件参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return service.userService.pageQuery(parameter).then(res => {
          return res
        }
        )
      }
    }
  },
  methods: {
    edit (row) {
      setTimeout(() => {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
      }, 1500)
    },
    delAll () {
      this.$service.userService.batchDelIds(this.$refs.table.rowSelection.selectedRowKeys.toString()).then(res => {
        this.$refs.table.refresh()
      })
    }
  }
}
</script>
<style>
  .ant-layout-header {
    background-color: #d3f1ff;
  }
</style>
