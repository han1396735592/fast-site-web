<template>
  <a-modal :width="640" :visible="visible" :title="title" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="ID"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input disabled v-decorator="['id']"></a-input>
      </a-form-item>

      <a-form-item
        label="父节点"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['pid']"></a-input>

        <a-tree
          :treeData="options"
          showIcon
          showLine
          defaultExpandAll
        >
          <a-icon slot="smile" type="tool"/>

          <template slot="custom" slot-scope="{selected}">
            <a-icon :type="selected ? 'frown':'frown-o'"/>
          </template>
        </a-tree>

      </a-form-item>

      <a-form-item
        label="名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', {rules:[{required: true, message: '请输入标题'}]}]"/>
      </a-form-item>
      <a-form-item
        label="说明"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['description', {rules:[{required: true, message: '请输入密码'}]}]">
        </a-input>
      </a-form-item>
      <a-form-item
        label="状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-switch
          v-decorator="['enable', { valuePropName: 'checked' }]"
          checkedChildren="启用"
          unCheckedChildren="锁定"/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'DeptEdit',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      title: '部门-添加',
      visible: false,
      form: this.$form.createForm(this),
      selectList: [],
      record: {}
    }
  },
  props: {
    update: {
      type: Function,
      required: false,
      default: () => {
      }
    }
  },
  beforeMount () {
    this.$service.deptService.tree({
      'select': 'id,pid,name'
    }).then(res => {
      this.selectList = res
    })
  },
  computed: {
    select () {
      const temp = []
      return temp
    },
    options () {
      const editId = this.record.id

      function tree (list, flag) {
        return list.map(item => {
          item.value = item.id
          item.label = item.name
          item.slots = {
            icon: 'smile'
          }
          item.disabled = flag || editId === item.id
          if (item.children && item.children.length > 0) {
            tree(item.children, item.disabled)
          }
          return item
        })
      }

      return tree(this.selectList, false)
    }
  },

  methods: {
    add () {
      this.visible = true
      this.form.resetFields()
    },
    edit (record) {
      this.add()
      this.record = record
      const { form: { setFieldsValue } } = this
      if (record) {
        console.log(record)
        this.$nextTick(() => {
          setFieldsValue(record)
        })
        if (record.id) {
          this.title = '系统菜单-修改'
        }
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          this.visible = false
          if (values.id) {
            this.$service.deptService.update(values).then(res => {
              this.update()
            })
          } else {
            this.$service.deptService.add(values).then(res => {
              this.update()
            })
          }
        }
      })
    }
  }
}
</script>
