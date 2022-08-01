import React from 'react'
import ToolState from '../store/ToolState'
import '../styles/toolbar.css'

const SettingBar = () => {
  return (
    <div className='setting-bar'>
      <label
        style={{ margin: 10 }}
        htmlFor='line-width'
      >Line Width</label>

      <input
        onChange={e => ToolState.setLineWidth(e.target.value)}
        style={{ margin: '0 10px' }}
        id='line-width'
        type='number'
        defaultValue={1}
        min={1}
        max={50}
      ></input>

      <label
        style={{ margin: 10 }}
        htmlFor='stroke-color'
      >Stroke Color</label>
      <input
        defaultValue={"#000000"}
        onChange={e => ToolState.setStrokeColor(e.target.value)}
        id='stroke-color'
        type='color'
      ></input>
    </div>
  )
}

export default SettingBar