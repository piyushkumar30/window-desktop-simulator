import { createContext, useState } from "react";

export const WindowContext = createContext()

const WindowProvider = ({ children }) => {
  const [openwindows, setopenwindows] = useState({
    chrome: false,
    spotify: false,
    notepad: false,
    calender: false
  })
  const [minimized, setminimized] = useState({
    chrome: false,
    spotify: false,
    notepad: false,
    calender: false
  })
  const [Zindex, setZindex] = useState({
    chrome: 1,
    spotify: 2,
    calender: 3,
    notepad: 4
  })
  const [highZindex, sethighZindex] = useState(4)

  const activeWindow=(appname)=>{
   sethighZindex((previousHigh) => {
    const newZindex = previousHigh + 1

    setZindex((previous) => ({
      ...previous,
      [appname]: newZindex
    }))

    return newZindex
  })
  }
  return (
    <WindowContext.Provider value=
    {{ openwindows, setopenwindows, minimized, setminimized, Zindex, setZindex, 
      highZindex, sethighZindex, activeWindow
    }}>
          {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider
