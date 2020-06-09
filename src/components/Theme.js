const fontFamily = 'Roboto, sans-serif'

function getFont(size) {
  return {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: `${size}px`,
    lineHeight: "19px",
  }
}

export default {
  buttonColor: '#2f2f2f',
  panelColor: '#323232',
  bgColor: '#252525',
  textBright: '#e5e5e5',
  textBright0: '#e3e3e3',
  separatorColor: '#b9b9b9',
  separatorColor0: '#4A4A4A',
  sidebarWidth: 48,
  fontFamily,
  headerHeight: 48,
  getFont,
  font: getFont(16)
}