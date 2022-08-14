import React from 'react'
import { useNote } from '../../../contexts/CurrentNoteProvider'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import rehypeHighlight from 'rehype-highlight'
import RemarkEslintGuide from 'remark-preset-lint-markdown-style-guide'

import './styles.css'
import 'github-markdown-css/github-markdown.css'

export default function PreviewCard () {
  const note = useNote()

  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(RemarkEslintGuide)
    .use(remarkReact, React)
    .use(rehypeHighlight)
    .processSync(note.file.content).result
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return (
    <div className='preview markdown-body' onClick={handleClick}>
      {md}
    </div>
  )
}
