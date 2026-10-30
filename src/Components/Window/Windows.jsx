import React, { useContext, useEffect, useState } from 'react'
import style from '../Window/Windows.module.css'
import minimize from '../../assets/icons/minimizeicon.svg'
import maximize from '../../assets/icons/maximizeicon.svg'
import restore from '../../assets/icons/Restoreicon.svg'
import close from '../../assets/icons/closeicon.svg'
import { WindowContext } from '../Windowscontext/WindowsContext'


const Windows = ({ title, children, appname }) => {
    const [position, setposition] = useState({
        x: 320,
        y: 40
    })
    const [dragging, setdragging] = useState(false)
    const [offset, setoffset] = useState({
        x: 0,
        y: 0
    })
    const handledragging = (e) => {
        setdragging(true)

        setoffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }
    useEffect(() => {
        const handlemousemove = (e) => {
            if (dragging) {
                setposition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y
                })
            }
        }
        const handlemouseup = () => {
            setdragging(false)
        }
        document.addEventListener("mousemove", handlemousemove)
        document.addEventListener("mouseup", handlemouseup)

        return () => {
            document.removeEventListener("mousemove", handlemousemove)
            document.removeEventListener("mouseup", handlemouseup)
        }
    }, [dragging, offset])

    const [size, setsize] = useState({
        width: 700,
        height: 400
    })
    const [resize, setresize] = useState({
        active: false,
        direction: null,
        startX: 0,
        startY: 0,
        startwidth: 700,
        startheight: 400,
        startleft: 320,
        starttop: 40
    })

    const handlesize = (direction, e) => {
        setresize({
            active: true,
            direction: direction,
            startX: e.clientX,
            startY: e.clientY,
            startwidth: size.width,
            startheight: size.height,
            startleft: position.x,
            starttop: position.y


        })
    }
    useEffect(() => {
        const handlemousemove = (e) => {
            if (!resize.active) {
                return
            }
            const differenceX = e.clientX - resize.startX
            const differenceY = e.clientY - resize.startY

            if (resize.direction === 'right') {
                setsize((previous) => ({
                    ...previous,
                    width: Math.max(300, resize.startwidth + differenceX)
                }))
            }

            if (resize.direction === 'bottom') {
                setsize((previous) => ({
                    ...previous,
                    height: Math.max(200, resize.startheight + differenceY)
                }))
            }

            if (resize.direction === "left") {
                const newWidth = resize.startwidth - differenceX
                if (newWidth >= 300) {
                    setsize((previous) => ({
                        ...previous,
                        width: newWidth
                    }))

                    setposition((previous) => ({
                        ...previous,
                        x: resize.startleft + differenceX
                    }))
                }
            }

            if (resize.direction === "top") {
                const newHeight = resize.startheight - differenceY
                if (newHeight >= 200) {
                    setsize((previous) => ({
                        ...previous,
                        height: newHeight
                    }))

                    setposition((previous) => ({
                        ...previous,
                        y: resize.starttop + differenceY

                    }))
                }
            }
        }
        const handlemouseup = () => {
            setresize((previous) => ({
                ...previous,
                active: false,
                direction: null
            }))
        }
        document.addEventListener('mousemove', handlemousemove)
        document.addEventListener("mouseup", handlemouseup)
        return () => {
            document.removeEventListener("mousemove", handlemousemove)
            document.removeEventListener("mouseup", handlemouseup)
        }
    }, [resize])

    const { setopenwindows } = useContext(WindowContext)
    const closewindow = () => {
        setopenwindows((previous) => ({
            ...previous,
            [appname]: false
        }))
    }
    const { setminimized, minimized } = useContext(WindowContext)
    const minimizewindow = () => {
        setminimized((previous) => ({
            ...previous,
            [appname]: true
        }))
    }

    const [maximized, setmaximized] = useState(false)
    const [previousPositon, setpreviousPositon] = useState({
        x: 320,
        y: 40
    })
    const [previousSize, setpreviousSize] = useState({
        width: 700,
        height: 400
    })

    const handleMaximize = () => {
        if (!maximized) {
            setpreviousPositon(position)
            setpreviousSize(size)

            setposition({
                x: 0,
                y: 0
            })

            setsize({
                width: window.innerWidth,
                height: window.innerHeight - 55
            })
            setmaximized(true)
        }
        else {
            setposition(previousPositon)
            setsize(previousSize)
            setmaximized(false)
        }
    }

    const { Zindex, activeWindow } = useContext(WindowContext)
   
    return (
        <>
            <div className={style.main}
                style={{
                    left: position.x,
                    top: position.y,
                    width: size.width,
                    height: size.height,
                    display: minimized[appname] ? "none" : "block",
                    zIndex: Zindex[appname]

                }} onMouseDown={() => activeWindow(appname)}>
                <div className={style.nav} onMouseDown={handledragging}>
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        <button className={style.minimizebtn}
                            onMouseDown={(e) => { e.stopPropagation() }}
                            onClick={minimizewindow}>
                            <img src={minimize} alt="minimize" />
                        </button>
                        <button className={style.maximizebtn}
                            onMouseDown={(e) => { e.stopPropagation() }}
                            onClick={handleMaximize}>
                            <img src={maximized ? restore : maximize} alt="maximize" />
                        </button>
                        <button className={style.closebtn}
                            onMouseDown={(e) => { e.stopPropagation() }}
                            onClick={closewindow}>
                            <img src={close} alt="close" />
                        </button>
                    </div>
                </div>
                <div className={style.maincontent}>
                    {children}
                </div>
                <div className={style.topresize} onMouseDown={(e) => handlesize("top", e)}></div>
                <div className={style.rightresize} onMouseDown={(e) => handlesize("right", e)}></div>
                <div className={style.bottomresize} onMouseDown={(e) => handlesize("bottom", e)}></div>
                <div className={style.leftresize} onMouseDown={(e) => handlesize("left", e)}></div>
            </div>
        </>
    )
}

export default Windows
