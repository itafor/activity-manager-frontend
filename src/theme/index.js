import { ConfigProvider } from 'antd'

const Theme = () =>
  ConfigProvider.config({
    theme: {
      primaryColor: '#FAA32C',
      // primaryColor: '#2E338A',
    },
  })

export default Theme
