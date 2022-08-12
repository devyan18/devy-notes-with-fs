import styles from './styles.module.css'
import { FileData } from '../../../hooks/useNotes'
import Note from '../Note'
import { useState } from 'react'
import { useContextMenu, useSetContextMenu } from '../../../contexts/MenuContextProvider'
import NoteCreator from '../NoteCreator'

interface Props {
  _id: string
  title: string
  files: Array<FileData> | null
  onClickNote: (note: FileData) => void
}

interface Coords {
  x: number
  y: number
}

export default function Folder (props: Props) {
  const [isOpenFolderCreator, setInOpenFolderCreator] = useState<boolean>(false)
  const [coords, setCoords] = useState<Coords>()
  const [noteCreator, setNoteCreator] = useState<boolean>(false)

  const contextMenu = useContextMenu()
  const setContextMenu = useSetContextMenu()

  const toggleOpenFolder = (setter: string | undefined = '') => {
    if (setter === 'true') {
      setInOpenFolderCreator(true)
    } else if (setter === 'false') {
      setInOpenFolderCreator(false)
    } else {
      setInOpenFolderCreator(!isOpenFolderCreator)
    }
  }

  const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggleOpenFolder('true')
    setContextMenu({
      view: false,
      name: ''
    })
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      view: true,
      name: `createChildren ${props.title}`
    })
    setCoords({
      x: e.pageX - 300,
      y: e.pageY
    })
  }

  const hanldeCloseNoteCreator = () => {
    setNoteCreator(false)
  }

  return (
    <div className={styles.container} onContextMenu={handleOpenContextMenu}>
      {
        contextMenu.view === true && contextMenu.name === `createChildren ${props.title}` && coords?.x && coords?.y &&
        <div className={styles.contextMenu} style={{ top: coords?.y, left: coords?.x }}>
          <button className={styles.contextMenuOption} onClick={() => setNoteCreator(true)}>
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"><path d="m7 1.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682"/><path d="m14.5.46667982c.5549155.5734054.5474396 1.48588056-.0167966 2.05011677l-6.9832034 6.98320341-3 1 1-3 6.9874295-7.04563515c.5136195-.5178979 1.3296676-.55351813 1.8848509-.1045243z"/><path d="m12.5 2.5.953 1"/></g></svg>
            <span>create note</span>
          </button>
        </div>
      }

      <div className={contextMenu.view === true && contextMenu.name === `createChildren ${props.title}` ? styles.folderHover : styles.folder} onClick={() => toggleOpenFolder()}>
        <p className={styles.titleFolder}>
          {
            isOpenFolderCreator
              ? (
              <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8.5.5-4 4-4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 8)"/></svg>
                )
              : (
              <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 8.5 4-4-4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(9 6)"/></svg>
                )
          }
          <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 4)"><path d="m.5 1.5v9c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-6.00280762c.0007656-1.05436179-.8150774-1.91816512-1.8499357-1.99451426l-.1500643-.00468356-5 .00200544-2-2h-4c-.55228475 0-1 .44771525-1 1z"/><path d="m.5 2.5h7"/></g></svg>
          <span className={styles.titleFolderText}>{props.title}</span>
        </p>
      </div>
        {
          noteCreator &&
          <NoteCreator
            folder={props.title}
            onClose={hanldeCloseNoteCreator}
          />
        }
        {
          isOpenFolderCreator && (
            <div className={styles.inFolderContainer}>
              <div className={styles.containerFiles}>
              {
                props.files && props.files.map((e) => {
                  return (
                    <Note
                      inFolder={true}
                      key={e._id}
                      title={e.file.title}
                      content={e.file.content}
                      note={e}
                      onClick={props.onClickNote}
                    />
                  )
                })
              }
              </div>

            </div>
          )
        }
    </div>
  )
}
/*

*/
