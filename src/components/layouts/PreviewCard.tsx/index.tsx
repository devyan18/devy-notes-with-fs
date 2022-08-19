import MarkdownPreview from '@uiw/react-markdown-preview'
import { useNote } from '../../../contexts/CurrentNoteProvider'

import './styles.css'
import 'github-markdown-css/github-markdown.css'
import CloseIcon from '../../icons/CloseIcon'

interface Props {
   onClose: () => void
 }

export default function PreviewCard (props: Props) {
  const note = useNote()

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return (
    <div className='preview markdown-body' onMouseDown={handleClick}>
      <p className='closer-preview-button' onClick={props.onClose}>
        <CloseIcon />
      </p>
      <MarkdownPreview
        linkTarget={'_blank'}
        source={note.file.content}
      />
    </div>
  )
}
