import React from 'react'
import { Row, Input, Form, Modal, Button, DatePicker } from 'antd'
import moment from 'moment'
import { ValidateFieldsOptions } from 'antd/lib/form/Form'
import { FormComponentProps } from 'antd/lib/form'
import { User } from '../../modal/user'

/** 用户模态窗表单组件接口类型 */
interface UserModalFormProps extends FormComponentProps {
  visible: boolean
  title: string
  property: User
  cancel: () => void
  submit: (params: User) => void
}

/** 用户模态窗表单组件 */
const UserModalForm = (props: UserModalFormProps) => {
  const { getFieldDecorator, getFieldsValue, resetFields, validateFields } = props.form

  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 }
    }
  }

  /** 渲染模态窗底部按钮 */
  const renderFooter = () => {
    return (
      <Row>
        <Button htmlType="reset" onClick={handleCancel}>
          取消
        </Button>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          保存
        </Button>
      </Row>
    )
  }

  /** 点击模态窗底部取消按钮 */
  const handleCancel = () => {
    resetFields()
    props.cancel()
  }

  /** 点击模态窗底部确定按钮 */
  const handleSubmit = () => {
    validateFields((options: ValidateFieldsOptions) => {
      if (!options) {
        const fieldValue = getFieldsValue(['name', 'birthDay', 'city'])
        const { name, city, birthDay } = fieldValue
        const params: User = {
          id: props.property.id,
          name,
          city,
          birthDay: moment(birthDay).format('YYYY-MM-DD HH:mm:ss')
        }
        props.submit(params)
      }
    })
  }

  return (
    <>
      <Modal title={props.title} visible={props.visible} width={800} closable={false} footer={renderFooter()}>
        <Form {...formItemLayout}>
          <Form.Item label="姓名" required>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名' }],
              initialValue: props.property.name
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
          <Form.Item label="生日" required>
            {getFieldDecorator('birthDay', {
              rules: [{ required: true, message: '请选择生日' }],
              initialValue: moment(props.property.birthDay, 'YYYY-MM-DD HH:mm:ss')
            })(<DatePicker style={{ width: '100%' }} placeholder="请选择生日" />)}
          </Form.Item>
          <Form.Item label="住址" required>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: '请输入住址' }],
              initialValue: props.property.city
            })(<Input placeholder="请输入住址" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

/** 用户模态窗 */
const UserModal = Form.create<UserModalFormProps>({ name: 'UserModalForm' })(UserModalForm)

export default UserModal
