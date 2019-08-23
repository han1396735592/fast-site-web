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
        label="标题"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['title', {rules:[{required: true, message: '请输入标题'}]}]"/>
      </a-form-item>
      <a-form-item
        label="路径"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['path', {rules:[{required: false, message: '请输入路径'}]}]">
        </a-input>
      </a-form-item>
      <a-form-item
        label="图标"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['icon', {rules:[{required: false, message: '请输入图标'}]}]">
        </a-input>
      </a-form-item>
      <a-form-item
        label="组件"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['component', {rules:[{required: false, message: '组件'}]}]">
        </a-input>
      </a-form-item>
      <a-form-item
        label="权限标志"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['flag', {rules:[{required: true, message: '权限标志'}]}]"/>
      </a-form-item>
      <a-form-item
        label="重定向"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['redirect', {rules:[{required: false, message: '重定向'}]}]">
        </a-input>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
  export default {
    name: 'MenuEdit',
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
        title: '系统菜单-添加',
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
      this.$service.menuService.tree({
        'select': 'id,pid,title,icon'
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
            item.label = item.title
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
              this.$service.menuService.update(values).then(res => {
                this.update()
              })
            } else {
              this.$service.menuService.add(values).then(res => {
                this.update()
              })
            }
          }
        })
      }
    }
  }
</script>
