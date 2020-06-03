class PlatformInfo {
  osName = 'Unknown'
  constructor() {
    // determine os name
    if (navigator.appVersion.indexOf("Win") != -1) this.osName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) this.osName = "macOS";
    if (navigator.appVersion.indexOf("X11") != -1) this.osName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) this.osName = "Linux";
  }

  validateKeyCode(code) {
    if (this.osName == 'macOS') {
      return code.replace('Meta', 'Control')
    } else { return code; }
  }

}

let info = new PlatformInfo()
export default info
