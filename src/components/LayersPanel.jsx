import Icon from './Icon.jsx'
const Layer = ({ layerName }) => {
  return (
    <div style={{
      display: 'flex'
    }}>
      <div></div>
      <div>{layerName}</div>
      <div><Icon name='eye' /></div>
    </div>)
}

const LayersList = () => (
  <div>
    <h1>Layers</h1>
    <ul>
      <li>
        <Layer layerName="Layer1" />
      </li>
    </ul>
  </div>
)

const Holder = () => (
  <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H28" stroke="#6E6E6E" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

const CollapseIcon = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1L5.5 5L9.5 1" stroke="#B9B9B9" strokeWidth="2" strokeLinecap="round" />
  </svg>)

const PropertiesTitle = ({ title }) => (
  <div>
    <CollapseIcon />
    <div>{title}</div>
  </div>
)

// const Slider

const BlendingOptions = () => {
  <div>
    <PropertiesTitle title='Blending Options' />
  </div>
}

const LayerProperties = ({ layerName }) => (
  <div>
    <Holder />
    <h1>Layer Properties</h1>
    <div style={{ display: 'flex' }}>
      <div></div>
      <div>{layerName}</div>
    </div>
  </div>
)

const LayersPanel = () => {
  return (
    <div>
      <LayersList />
      <LayerProperties layerName='Layer1' />
    </div>
  )
}

export default LayersPanel