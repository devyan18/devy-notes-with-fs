import {
  useState,
  createContext,
  useContext
} from 'react'

interface contextMenu {
  view: boolean
  name: string
}

interface ContextMenuContext {
  contextMenu: contextMenu
  setContextMenu: (contextMenu: contextMenu) => void
}

const Context = createContext<ContextMenuContext>({
  contextMenu: {
    view: false,
    name: ''
  },
  setContextMenu: () => {}
} as ContextMenuContext)

interface Props {
  children: JSX.Element | Array<JSX.Element>
}

const MenuContextProvider = (props: Props) => {
  const initialMenuContext = {
    view: false,
    name: ''
  }
  const [contextMenu, setContextMenu] = useState<contextMenu>(initialMenuContext)

  return (
    <Context.Provider value={{ contextMenu, setContextMenu }}>
      {props.children}
    </Context.Provider>
  )
}

const useContextMenu = () => useContext(Context).contextMenu
const useSetContextMenu = () => useContext(Context).setContextMenu

export { useContextMenu, useSetContextMenu }
export default MenuContextProvider
