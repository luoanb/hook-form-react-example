import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import NextUI from './NextUI'
import MUI from './MUI'
import Antd from './Antd'

export default function App() {
  return (
    <div className="p-2">
      <Tabs color="primary">
        <Tab key="NextUI" title="Next UI" className="h-full">
          <Card className="h-full">
            <CardBody className="h-full">
              <NextUI />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Antd" title="Antd">
          <Card>
            <CardBody>
              <Antd />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="MUI" title="MUI">
          <Card>
            <CardBody>
              <MUI />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
