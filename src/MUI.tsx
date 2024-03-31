import { Verifications, useAttr, useFormData } from 'hook-form-react'
import {
  Button,
  MenuItem,
  Select,
  Slider,
  TextField,
  Autocomplete,
  Switch,
  Checkbox,
  Rating,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { MUI_5 } from 'hook-form-react/MUI_5'
import { animals } from './data'
/**
 * MUI 示例
 * @returns
 */
export default function MUI() {
  const form = useFormData(
    {
      value: '',
      valu10: 1,
      valu11: 1,
      valu6: false,
      valu2: false,
      valu7: [],
      valu3: [],
      valu4: {},
      value5: '',
      value8: ''
    },
    {
      value: [Verifications.required()],
      value5: [Verifications.required()],
      value8: [Verifications.required()],
      valu10: [Verifications.min(10)]
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
          <div className="mb-2">
            <TextField fullWidth label="value" {...attr('value', MUI_5.M_TextField)}></TextField>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('value5', MUI_5.M_Error)} label="value5" fullWidth>
              <Select label="value5" {...attr('value5', MUI_5.M_Select)}>
                {animals.map((it) => (
                  <MenuItem value={it.value}>{it.label}</MenuItem>
                ))}
              </Select>
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('value5', MUI_5.M_Error)} label="value5" fullWidth>
              <Select label="value5" {...attr('value5', MUI_5.M_Select)}>
                {animals.map((it) => (
                  <MenuItem value={it.value}>{it.label}</MenuItem>
                ))}
              </Select>
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('valu10', MUI_5.M_Error)} fullWidth>
              <Slider {...attr('valu10', MUI_5.M_Slider)} />
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <Autocomplete
              {...attr('value8', MUI_5.M_AutoComplete)}
              options={animals.map((option) => option.label)}
              renderInput={(params) => (
                <TextField {...params} {...attr('value8', MUI_5.M_Error)} label="value8" />
              )}
            />
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('valu6', MUI_5.M_Error)} label="valu6" isFormLabel fullWidth>
              <Switch {...attr('valu6', MUI_5.M_Switch)} />
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('valu6', MUI_5.M_Error)} label="valu6" isFormLabel>
              <Checkbox {...attr('valu6', MUI_5.M_Checkbox)} />
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('valu11', MUI_5.M_Error)} label="valu11" isFormLabel fullWidth>
              <Rating {...attr('valu11', MUI_5.M_Rating)} />
            </MUI_5.FormItem>
          </div>
          <div className="mb-2">
            <MUI_5.FormItem {...attr('value', MUI_5.M_Error)} label="value" isFormLabel fullWidth>
              <RadioGroup {...attr('value', MUI_5.M_RadioGroup)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </MUI_5.FormItem>
          </div>
          <div>
            <Button variant="outlined" onClick={reset} style={{ marginRight: '12px' }}>
              重置
            </Button>
            <Button color="primary" variant="contained" onClick={submit}>
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
