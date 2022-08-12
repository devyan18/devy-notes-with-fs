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
  changeContextMenu: (contextMenu: contextMenu) => void
}

const Context = createContext<ContextMenuContext>({
  contextMenu: {
    view: false,
    name: ''
  },
  changeContextMenu: () => {}
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

  const changeContextMenu = ({
    view,
    name
  }: contextMenu) => {
    setContextMenu(initialMenuContext)
    if (view) {
      setContextMenu({
        view,
        name
      })
    }
  }

  return (
    <Context.Provider value={{ contextMenu, changeContextMenu }}>
      {props.children}
    </Context.Provider>
  )
}

const useContextMenu = () => useContext(Context).contextMenu
const useSetContextMenu = () => useContext(Context).changeContextMenu

export { useContextMenu, useSetContextMenu }
export default MenuContextProvider
