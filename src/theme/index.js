import { ConfigProvider } from 'antd'

const Theme = () =>
  ConfigProvider.config({
    theme: {
      primaryColor: '#2A4637',
      // primaryColor: '#2E338A',
    },
  })

export default Theme
