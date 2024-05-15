import {useMemo, useState, useRef, useEffect} from 'react'
import { createYooptaEditor } from '@yoopta/editor';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
// import { DividerPlugin } from './customPlugins/Divider';
import { TBlock, EditorProps, YooptaEditorProps } from './types';
import { plugins } from './utils';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import {debounce} from 'lodash-es'

const tools = {
	// [ActionMenu] - + 跟 / 的主選單
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
	// [Toolbar] - 選取文字後的工具列
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
	// [LinkTool] - 選取文字後的工具列，上面的 Link 點了會有 popup 填寫 url 跟 title
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];


export const useEditor = () => {
	const selectionRef = useRef(null);
	const editor = useMemo(() => createYooptaEditor(), []);

	const [formattedBlocks, setFormattedBlocks] = useState<TBlock[]>([])

	// add debounce
	useEffect(() => {
if(editor){
	editor.on('change', debounce(() => {
		const raw:{
			[key: string]: TBlock
		} = editor.getEditorValue();
		const blocks:TBlock[] = Object.values(raw)

		// 按照畫面上的順序排序
		blocks.sort((a, b) => a?.meta?.order - b?.meta?.order)
		setFormattedBlocks(blocks)
	}, 1500))
}
	}, [editor]);


	const yooptaEditorProps:YooptaEditorProps = {
		editor,
		plugins,
		tools,
		marks,
		selectionBoxRoot: selectionRef,
		autoFocus: true,
	}

	const editorProps:EditorProps = {
		yooptaEditorProps,
		formattedBlocks
	}

	return editorProps
}