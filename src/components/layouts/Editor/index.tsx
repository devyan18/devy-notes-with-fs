import Editor, { useMonaco, loader } from '@monaco-editor/react'
import { useEffect } from 'react'
import { colors, rules } from '../../../utils/themeRules'

import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'json') {
      return new JsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new CssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new HtmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new TsWorker()
    }
    return new EditorWorker()
  }
}
loader.config({ monaco })

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
      onChange={(value: string) => props.onChange(value || '')}
      language="markdown"
      defaultLanguage='markdown'
      defaultValue='# Hello World!!'
      theme="Dracula"
      options={{
        detectIndentation: true,
        minimap: {
          enabled: false
        },
        lineNumbers: 'off',
        scrollbar: {
          vertical: 'auto'
        },
        wordWrap: 'on',
        fontSize: 16,
        fontFamily: 'Cascadia Code, Roboto, Menlo, Monaco, Consolas, "Courier New", monospace',
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
