<template>
  <s-table
    ref="table"
    size="default"
    :rowKey="(record) => record.id"
    :columns="columns"
    :data="loadData"
    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  >
  </s-table>
</template>

<script>
import { STable } from '@/components'
import service from '@/api/service'

const columns = [
  {
    title: '规则编号',
    dataIndex: 'id'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  {
    title: '状态',
    dataIndex: 'status',
    needTotal: true
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  }
]


export default {
  components: {
    STable
  },
  data () {
    return {
      columns,
      // 查询条件参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    loadData(parameter) {
      return service.deptService.pageQuery(Object.assign(parameter, this.queryParam))
        .then(res => {
          return res
        })
    }
  }
}
</script>
