import React, { useContext} from 'react'
import style from '../Desktop/Desktop.module.css'
import Textbar from '../Textbar/Textbar'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Windows from '../Window/Windows'
import Chrome from '../Chrome/Chrome'
import Spotify from '../Spotify/Spotify'
import { WindowContext } from '../Windowscontext/WindowsContext'
import Calender from '../Calender/Calender'
import Notepad from '../Notepad.jsx/Notepad'

const Desktop = () => {
  const {openwindows}=useContext(WindowContext)
 
  return (
    <div className={style.main}>
      <Textbar/>
      <DesktopIcon/>
     {openwindows.chrome&&(
      <Windows title={'Chrome'} appname={'chrome'}>
        <Chrome/>
      </Windows>
     )}
     {openwindows.spotify&&(
      <Windows title={'spotify'} appname={'spotify'} >
        <Spotify/>
      </Windows>
     )}
     {openwindows.calender&&(
      <Windows title={'Calender'} appname={'calender'} >
        <Calender/>
      </Windows>
     )}
     {openwindows.notepad&&(
      <Windows title={'Notepad'} appname={'notepad'} >
        <Notepad/>
      </Windows>
     )}
    </div>
  )
}

export default Desktop
