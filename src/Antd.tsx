import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect
} from 'antd'
import { Verifications, useAttr, useFormData } from 'hook-form-react'
import { Antd_5 } from 'hook-form-react/Antd_5'
import { animals, treeData } from './data'

export default function Antd() {
  const form = useFormData(
    {
      value: '',
      value10: 1,
      value11: 1,
      value6: true,
      value2: false,
      value7: [] as string[],
      value3: [],
      value4: {},
      value5: '',
      value8: ''
    },
    {
      value: [Verifications.required()],
      value5: [Verifications.required()],
      value7: [Verifications.minLenth(2, '请选择时间范围')],
      value8: [Verifications.required('请选择时间')],
      value10: [Verifications.min(10)]
    }
  )

  const attr = useAttr(form)

  const submit = async () => {
    form.doAllValidate()
  }

  const reset = async () => {
    form.reset()
  }
  return (
    <div className="flex ">
      <div className="w-[50vw] flex flex-col">
        <div className="max-w-[25rem]">
          <Antd_5.FormItem className="mt-2" {...attr('value')}>
            <Input {...attr('value', Antd_5.A_Input)} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value10')}>
            <InputNumber className="pb-2" {...attr('value10', Antd_5.A_InputNumber)} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value5')}>
            <Select {...attr('value5', Antd_5.A_Select)}></Select>
          </Antd_5.FormItem>
          <div className="p-2 rounded mt-2 bg-gray-50 flex items-center">
            <Switch className="mr-2" {...attr('value6', Antd_5.A_Switch)}></Switch>
            <Checkbox {...attr('value6', Antd_5.A_Checkbox)}></Checkbox>
          </div>
          <Radio.Group className="mt-2" {...attr('value', Antd_5.A_RadioGroup)}>
            {animals.map((it) => (
              <Radio value={it.value}>{it.label}</Radio>
            ))}
          </Radio.Group>
          <Antd_5.FormItem className="mt-2" {...attr('value8')}>
            <TimePicker className="pb-2" {...attr('value8', Antd_5.F_A_TimePicker())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value8')}>
            <DatePicker className="pb-2" {...attr('value8', Antd_5.F_A_DatePicker())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value7')}>
            <DatePicker className="pb-2" {...attr('value7', Antd_5.F_A_DatePickerMult())} />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value7')}>
            <DatePicker.RangePicker
              className="pb-2"
              {...attr('value7', Antd_5.F_A_DateRangePicker())}
            />
          </Antd_5.FormItem>
          <Antd_5.FormItem className="mt-2" {...attr('value8')}>
            <TreeSelect treeData={treeData} {...attr('value8', Antd_5.A_TreeSelect)}></TreeSelect>
          </Antd_5.FormItem>
          <div className="mt-2">
            <Button onClick={reset} shape="round" size="large" className="mr-2">
              重置
            </Button>
            <Button onClick={submit} shape="round" size="large">
              提交
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="mr-2 mb-2">
          <h1 className="text-2xl mb-2">FormValue</h1>
          <pre className="p-2 bg-gray-800 text-gray-100 text-sm rounded-lg">
            {JSON.stringify(form.value, null, 1)}
          </pre>
        </div>
        <div className="mr-2 mb-2">
          <h1 className="text-2xl mb-2">FormErrors</h1>
          <pre className="p-2 bg-gray-800 text-gray-100 text-sm rounded-lg">
            {JSON.stringify(form.errors, null, 1)}
          </pre>
        </div>
      </div>
    </div>
  )
}
