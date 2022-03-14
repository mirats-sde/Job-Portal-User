import React,{createContext} from 'react'

const Sidebar_Context=createContext()

function SidebarContextProvider({children}) {

  return (
    <Sidebar_Context.Provider>
        {children}
    </Sidebar_Context.Provider>
  )
}

export default SidebarContextProvider
export {Sidebar_Context}