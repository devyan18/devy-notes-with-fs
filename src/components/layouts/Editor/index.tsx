import MarkdownEditor from '@uiw/react-markdown-editor'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'

interface Props {
  doc: string
  onChange: (doc: string) => void
}

export default function MyEditor (props: Props) {
  return (
      <MarkdownEditor
        value={props.doc}
        height={'100%'}
        maxHeight={'90vh'}
        minHeight={'90vh'}

        onChange={(value: string) => props.onChange(value)}
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        theme={oneDark}
        spellCheck={false}
        autoFocus={true}
        toolbars={['header', 'bold', 'italic', 'link', 'strike', 'image', 'quote', 'olist', 'ulist', 'todo']}
        toolbarsMode={['preview']}
        previewProps={{
          unwrapDisallowed: true
        }}
      />
  )
}
