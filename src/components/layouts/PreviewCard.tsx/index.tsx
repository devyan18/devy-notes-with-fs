import React from 'react'
import { useNote } from '../../../contexts/CurrentNoteProvider'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import 'github-markdown-css/github-markdown.css'
import './styles.css'
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
     <ReactMarkdown
        components={{
          code ({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match
              ? (
              <SyntaxHighlighter
              // @ts-ignore
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
                )
              : (
              <code className={className} {...props}>
                {children}
              </code>
                )
          }
        }}
      >
        {note.file.content}
      </ReactMarkdown>
    </div>
  )
}
