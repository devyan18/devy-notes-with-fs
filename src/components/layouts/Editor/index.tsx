import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import { colors, rules } from '../../../utils/themeRules'

interface Props {
  doc: string
  onChange: (doc: string) => void
}

export default function MyEditor (props: Props) {
  const monaco = useMonaco()

  useEffect(() => {
    monaco?.editor.defineTheme('Dracula', {
      base: 'vs-dark',
      inherit: true,
      rules,
      colors

    })
    monaco?.editor.setTheme('Dracula')
  }, [monaco])

  return (
    <Editor
      width="100%"
      height="100%"
      value={props.doc}
      onChange={(value) => props.onChange(value || '')}
      language="markdown"
      defaultValue='# Hello World!!'
      theme="Dracula"
      options={{
        minimap: {
          enabled: false
        },
        lineNumbers: 'off',
        scrollbar: {
          vertical: 'hidden'
        },
        wordWrap: 'on',
        fontSize: 16,
        fontFamily: 'Cascadia Code, Menlo, Monaco, Consolas, "Courier New", monospace',
        fontLigatures: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        overviewRulerBorder: false,
        guides: {
          indentation: false
        }
      }}
    />
  )
}
