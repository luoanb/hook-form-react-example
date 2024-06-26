import { useAttr, useFormData, useSubFormData, Verifications } from 'hook-form-react'
import { Antd_5 } from 'hook-form-react/Antd_5'
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
  Switch,
  Textarea
} from '@nextui-org/react'
import { animals, treeData } from './data'
import {
  Input as A_Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select as A_Select,
  Switch as A_Switch,
  Checkbox as A_Checkbox,
  Radio as A_Radio,
  TreeSelect
} from 'antd'

export const NextUI = () => {
  const formData = useFormData(
    {
      password: '',
      username: '',
      age: '',
      value4: [],
      value5: '',
      value6: false,
      value7: '',
      value8: '',
      value9: '',
      value10: {
        name: '小红',
        heihei: '小红',
        haha: '小红'
      },
      antdValue: {
        str: '',
        num: 0,
        arr: [] as string[],
        arr2: [] as string[],
        arr3: [] as string[],
        arr4: [] as string[],
        bool: false
      }
    },
    {
      // 支持多个校验
      password: [
        // 自带验证器必填校验
        // 开发者也可以自行在项目中补充其它验证规则，具体请看开发者文档（待补充）
        Verifications.required(),
        // 自带验证器密码校验
        Verifications.password()
      ],
      username: [
        // 自带验证器的必填校验 + 自定义提示
        Verifications.required('用户账户不能为空'),
        // 自带验证器的用户名校验
        Verifications.username()
      ],
      age: [Verifications.min(0), Verifications.max(150)],
      value4: [Verifications.minLenth(2)],
      value5: [Verifications.required('请选择')]
    }
  )

  // 使用组件快速绑定hook
  const attr = useAttr(formData)

  const submit = async () => {
    const valid = await formData.doAllValidateImme()
    const validRes = await value10Form.doAllValidateImme()
    const validAntd = await antdValueForm.doAllValidate()
    console.log('formData', formData.value)
    console.log('latestFormData', valid.data)
    console.log('submit:isValid: ', valid.isValid, validRes.isValid)
    if (valid.isValid && validRes.isValid && validAntd) {
      console.log('formValue', formData.value)
    }
  }

  const value10 = formData.value.value10

  const value10Form = useSubFormData(formData.formData, 'value10', {
    haha: [Verifications.required(), Verifications.email()]
  })

  const antdValueForm = useSubFormData(formData.formData, 'antdValue', {
    num: [Verifications.min(1)],
    arr: [Verifications.minLenth(1)],
    str: [Verifications.required()]
  })
  const attrAntd = useAttr(antdValueForm)

  const attrValue10 = useAttr(value10Form)

  return (
    <div className="flex h-full">
      <div className="p-10 pt-18 pb-0 flex-col h-full overflow-y-auto" style={{ width: '50vw' }}>
        <Input
          placeholder="请输入账户"
          className="mb-2"
          {...attr('username', attr.NextUI.N_Input)}
        ></Input>
        <Input
          autoComplete="new-password"
          type="password"
          className="mb-2"
          placeholder="请输入登录密码"
          {...attr('password', attr.NextUI.N_Input)}
          onChange={(e) => {
            formData.pushValue('password', e.target.value)
            formData.doValidate('password')
          }}
        ></Input>
        <Input
          className="mb-2"
          placeholder="请输入年龄"
          {...attr('age', attr.NextUI.N_Input)}
        ></Input>
        <Select
          label="Favorite Animal"
          variant="bordered"
          placeholder="Select an animal"
          className="mb-2"
          {...attr('value4', attr.NextUI.N_Select_Mult)}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <p className="text-small text-default-500 mb-2">Selected: {formData.value.value4}</p>
        <Select
          label="Favorite Animal"
          variant="bordered"
          placeholder="Select an animal"
          className=""
          {...attr('value5', attr.NextUI.N_Select)}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <p className="text-small text-default-500 mb-2">Selected: {formData.value.value5}</p>
        <Checkbox className="" {...attr('value6', attr.NextUI.N_Checkbox)}>
          Subscribe (controlled)
        </Checkbox>
        <Switch className="" {...attr('value6', attr.NextUI.N_Checkbox)}>
          Subscribe (controlled)
        </Switch>
        <p className="text-default-500 mb-2">
          Selected: {formData.value.value6 ? 'true' : 'false'}
        </p>
        <div className="flex flex-col gap-3 mb-2">
          <RadioGroup
            label="Select your favorite city"
            {...attr('value7', attr.NextUI.N_RadioGroup)}
          >
            <Radio value="buenos-aires">Buenos Aires</Radio>
            <Radio value="sydney">Sydney</Radio>
            <Radio value="san-francisco">San Francisco</Radio>
            <Radio value="london">London</Radio>
            <Radio value="tokyo">Tokyo</Radio>
          </RadioGroup>
          <p className="text-default-500 text-small">Selected: {formData.value.value7}</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Textarea
            {...attr('value8', attr.NextUI.N_TextArea)}
            variant="faded"
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
          />
          <p className="text-default-500 text-small">Textarea value: {formData.value.value8}</p>
        </div>

        <div className="flex flex-col gap-2 w-full  max-w-md items-start justify-center">
          <Slider
            aria-label="Volume"
            size="lg"
            color="success"
            {...attr('value9', attr.NextUI.N_Slider)}
            className="max-w-md"
          />
          <p className="text-default-500 font-medium text-small">
            Current volume: {formData.value.value9}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h1 className="text-lg font-bold">SubForm: value10.haha(email):</h1>
          <Input
            variant="bordered"
            className="pb-2"
            {...attrValue10('haha', attrValue10.NextUI.N_Input)}
          />
          <Button
            onClick={() => {
              value10Form.pushValue('haha', '163@163.com')
            }}
          >
            setHaha
          </Button>
          <Button
            className="ml-2"
            onClick={() => {
              value10Form.doValidate('haha')
            }}
          >
            手动校验:haha
          </Button>
        </div>
        <div className="border border-gray-200 mt-4 p-4 rounded-md">
          <h1 className="text-lg font-bold">Antd:</h1>
          <Antd_5.FormItem className="mt-2" {...attrAntd('str')}>
            <A_Input className="pb-2" {...attrAntd('str', Antd_5.A_Input)} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('num')}>
            <InputNumber className="pb-2" {...attrAntd('num', Antd_5.A_InputNumber)} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('str')}>
            <TimePicker className="pb-2" {...attrAntd('str', Antd_5.F_A_TimePicker())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('str')}>
            <DatePicker className="pb-2" {...attrAntd('str', Antd_5.F_A_DatePicker())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('arr')}>
            <DatePicker className="pb-2" {...attrAntd('arr', Antd_5.F_A_DatePickerMult())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('arr2')}>
            <DatePicker.RangePicker
              className="pb-2"
              {...attrAntd('arr2', Antd_5.F_A_DateRangePicker())}
            />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('arr2')}>
            <A_Select
              className="pb-2"
              options={animals.map((it) => {
                return { ...it, title: it.label }
              })}
              mode="multiple"
              {...attrAntd('arr3', Antd_5.A_Select)}
            />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attrAntd('str')}>
            <A_Select
              options={animals.map((it) => {
                return { ...it, title: it.label }
              })}
              {...attrAntd('str', Antd_5.A_Select)}
            />
          </Antd_5.FormItem>
          <A_Checkbox {...attrAntd('bool', Antd_5.A_Checkbox)} />
          <A_Switch {...attrAntd('bool', Antd_5.A_Switch)} />
          <A_Radio.Group {...attrAntd('str', Antd_5.A_RadioGroup)}>
            {animals.map((it) => (
              <A_Radio value={it.value}>{it.label}</A_Radio>
            ))}
          </A_Radio.Group>
          <Antd_5.FormItem className="mt-2" {...attrAntd('str')}>
            <TreeSelect treeData={treeData} {...attrAntd('str', Antd_5.A_TreeSelect)}></TreeSelect>
          </Antd_5.FormItem>
        </div>

        <div className="mt-2">
          <Button color="primary" onClick={submit}>
            提交
          </Button>
          <Button
            color="default"
            variant="bordered"
            className="ml-2"
            onClick={() => {
              formData.reset()
              value10Form.formErrors.reset()
              antdValueForm.formErrors.reset()
            }}
          >
            重置
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full overflow-y-auto flex flex-wrap">
        <div className="mr-2">
          <h1 className="text-lg font-bold">Form Value:</h1>
          <pre className="bg-gray-800 text-gray-50 rounded-md text-sm p-4">
            {JSON.stringify(formData.value, null, 1)}
          </pre>
        </div>
        <div className="mr-2">
          <h1 className="text-lg font-bold">SubForm, Value10:</h1>
          <pre className="bg-gray-800 text-gray-50 rounded-md text-sm p-4">
            {JSON.stringify(value10, null, 1)}
          </pre>
        </div>
        <div className="mr-2">
          <h1 className="text-lg font-bold">Error:</h1>
          <pre className="bg-gray-800 text-gray-50 rounded-md text-sm p-4">
            {JSON.stringify(formData.errors, null, 1)}
          </pre>
        </div>
        <div className="mr-2">
          <h1 className="text-lg font-bold">Value10 Error:</h1>
          <pre className="bg-gray-800 text-gray-50 rounded-md text-sm p-4">
            {JSON.stringify(value10Form.errors, null, 1)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default NextUI
