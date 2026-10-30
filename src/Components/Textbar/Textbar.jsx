import React, { useContext, useEffect, useState } from 'react'
import style from '../Textbar/Textbar.module.css'
import notepad from '../../assets/icons/notepad.svg'
import calender from '../../assets/icons/calenderIcon.svg'
import chrome from '../../assets/icons/chromeIcon.svg'
import spotify from '../../assets/icons/spotifyIcon.svg'
import windowsicon from '../../assets/icons/windows icon.svg'
import battery from '../../assets/icons/batteryIcon.svg'
import volume from '../../assets/icons/volumeIcon.svg'
import wifi from '../../assets/icons/wifiIcon.svg'
import weather from '../../assets/icons/weatherIcon.svg'
import search from '../../assets/icons/search.svg'
import { WindowContext } from '../Windowscontext/WindowsContext'




const Textbar = () => {
  const [datetime, setdatetime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setdatetime(new Date())
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { minimized, setminimized ,activeWindow} = useContext(WindowContext)
  const windowminimize = (appname) => {
    setminimized((previous) => ({
      ...previous,
      [appname]: false
    }))
  }


  return (
    <>
      <footer className={style.textbar}>
        <div className={style.leftside}>
          <div className={style.weather}>
            <img src={weather} alt="" />
            <span>24°C</span>
          </div>
        </div>
        <div className={style.icons}>
          <div className={style.icon}>
            <div><img src={windowsicon} alt="" /></div>
          </div>
          <div className={style.search}>
            <img src={search} alt="search" />
            <input type="text" placeholder='Search' />
          </div>
          <button className={style.icon} onClick={() =>
            { windowminimize("notepad"), activeWindow("notepad")}}>
            <div><img src={notepad} alt="" /></div>
          </button>
          <button className={style.icon} onClick={() =>
            { windowminimize("calender"), activeWindow("calender")}}>
            <div><img src={calender} alt="" /></div>
          </button>
          <button className={style.icon} onClick={() => 
            {windowminimize("chrome"),activeWindow("chrome")}}>
            <div><img src={chrome} alt="" /></div>
          </button>
          <button className={style.icon} onClick={() =>
            { windowminimize("spotify"), activeWindow("spotify")}}>
            <div><img src={spotify} alt="" /></div>
          </button>
        </div>
        <div className={style.rightside}>
          <div className={style.systemicon}>
            <div><img src={wifi} alt="" /></div>
            <div><img src={volume} alt="" /></div>
            <div><img src={battery} alt="" /></div>
          </div>
          <div className={style.datetime}>
            <span>{datetime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            })}</span>
            <span>{datetime.toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Textbar
