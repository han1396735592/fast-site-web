<template>
  <a-modal :width="640" :visible="visible" :title="title" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="用户ID"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input disabled v-decorator="['id']"></a-input>
      </a-form-item>
      <a-form-item
        label="用户名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['username', {rules:[{required: true, message: '请输入用户名'}]}]"/>
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['password', {rules:[{required: true, message: '请输入密码'}]}]">
        </a-input>
      </a-form-item>
      <a-form-item
        label="姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', {rules:[{required: true, message: '请输入姓名'}]}]">
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
          unCheckedChildren="锁定" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
import AInputSearch from 'ant-design-vue/es/input/Search'
import md5 from 'md5'
export default {
  name: 'SysUserEdit',
  components: { AInputSearch },
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
      title: '系统用户-添加',
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    update: Function
  },

  methods: {
    add () {
      this.visible = true
      this.form.resetFields()
    },
    edit (record) {
      const { form: { setFieldsValue } } = this
      this.visible = true
      if (record) {
        console.log(record)
        this.$nextTick(() => {
          setFieldsValue({
            id: record.id,
            name: record.name,
            username: record.username,
            password: record.password,
            enable: record.enable
          })
        })
        if (record.id) {
          this.title = '系统用户-修改'
        }
      }
    },
    handleSubmit (e) {
      const { form: { validateFields } } = this
      e.preventDefault()
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          this.visible = false
          values.password = md5(values.password)
          if (values.id) {
            this.$service.sysUserService.update(values).then(res => {
              this.update()
            })
          } else {
            this.$service.sysUserService.add(values).then(res => {
              this.update()
            })
          }
        }
      })
    }
  }
}
</script>
