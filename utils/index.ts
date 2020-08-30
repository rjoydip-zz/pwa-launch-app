import {
  isAndroid,
  isMobile,
  isIOS,
  isWindows,
  isWinPhone,
  isTablet,
} from 'react-device-detect'
import pkg from '../package.json'
const log = console.log

const getDeviceName = () => {
  let deviceName = 'unknown'

  if (isMobile) {
    if (isAndroid) {
      deviceName = 'android'
    } else if (isIOS) {
      deviceName = 'ios'
    } else if (isWinPhone) {
      deviceName = 'windows phone'
    }
  } else if (isWindows) {
    deviceName = 'windows'
  } else if (isTablet) {
    deviceName = "tablet"
  }

  return deviceName
}

export { log, pkg, getDeviceName }
