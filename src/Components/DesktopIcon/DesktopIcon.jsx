import React, { useContext, useEffect, useState } from 'react'
import style from '../DesktopIcon/DesktopIcon.module.css'
import notepad from '../../assets/icons/notepad.svg'
import calender from '../../assets/icons/calenderIcon.svg'
import chrome from '../../assets/icons/chromeIcon.svg'
import spotify from '../../assets/icons/spotifyIcon.svg'
import  { WindowContext } from '../Windowscontext/WindowsContext'

const DesktopIcon = () => {
     const {setopenwindows}=useContext(WindowContext)
     function openwindow(appname){
        setopenwindows((previous)=>({
            ...previous,
            [appname]: true
        }))
     }
    const [position, setposition] = useState({
        chrome: { x: 32, y: 32 },
        spotify: { x: 32, y: 130 },
        calender: { x: 32, y: 230 },
        notepad: { x: 32, y: 330 }
    })
    const [draggingicon, setdraggingicon] = useState(null)
    const [offset, setoffset] = useState({
        x: 0,
        y: 0
    })
    const handlemousedown = (iconname, e) => {
        setdraggingicon(iconname)

        setoffset({
            x: e.clientX - position[iconname].x,
            y: e.clientY - position[iconname].y
        })
    }

    useEffect(() => {
        const handlemousemove = (e) => {
            if (draggingicon) {
                const maxX = window.innerWidth - 65
                const maxY = window.innerHeight - 130

                const newX = Math.min(Math.max(e.clientX - offset.x, 0), maxX)
                const newY = Math.min(Math.max(e.clientY - offset.y, 0), maxY)

                setposition((previousPositions) => ({
                    ...previousPositions,

                    [draggingicon]: {
                        x: newX,
                        y: newY
                    }
                }))
            }
        }
        const handlemouseup = () => {
            setdraggingicon(null)
        }
        document.addEventListener("mousemove", handlemousemove)
        document.addEventListener("mouseup", handlemouseup)

        return () => {
            document.removeEventListener("mousemove", handlemousemove)
            document.removeEventListener("mouseup", handlemouseup)
        }
    }, [draggingicon])

    return (
        <>
            <div className={style.chromeicon}
                style={{
                    left: position.chrome.x,
                    top: position.chrome.y
                }}
                onMouseDown={(e) => handlemousedown("chrome", e)} onDoubleClick={()=> openwindow('chrome')}>
                <img src={chrome} alt="" draggable={false} />
            </div>
            <div className={style.spotifyicon}
                style={{
                    left: position.spotify.x,
                    top: position.spotify.y
                }} onMouseDown={(e) => handlemousedown("spotify", e)} onDoubleClick={()=> openwindow('spotify')}>
                <img src={spotify} alt="" draggable={false} />
            </div>
            <div className={style.calendericon}
                style={{
                    left: position.calender.x,
                    top: position.calender.y
                }} onMouseDown={(e) => handlemousedown("calender", e)} onDoubleClick={()=> openwindow("calender")}>
                <img src={calender} alt="" draggable={false} />
            </div>
            <div className={style.notepadicon}
                style={{
                    left: position.notepad.x,
                    top: position.notepad.y
                }} onMouseDown={(e) => handlemousedown("notepad", e)} onDoubleClick={()=> openwindow('notepad')}>
                <img src={notepad} alt="" draggable={false} />
            </div>
        </>
    )
}

export default DesktopIcon
