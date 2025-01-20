import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合併 Tailwind CSS 的 class
 */
export const cn = (...args: ClassValue[]) => twMerge(clsx(args))

/**
 * 判斷是否為 iPhone
 */
export const isIphone = /iPhone/.test(navigator.userAgent)

/**
 * 渲染 HTML 字串
 */
export const renderHTML = (HTMLstring: string) =>
	React.createElement('div', {
		dangerouslySetInnerHTML: { __html: HTMLstring },
	})

/**
 * 取得可複製的 JSON 字串
 */
export const getCopyableJson = (variable: object) => {
	const jsonStringStrippedEscapeC = JSON.stringify(
		JSON.stringify(variable || '{}'),
	).replace(/\\/g, '')
	const jsonString = jsonStringStrippedEscapeC.slice(
		1,
		jsonStringStrippedEscapeC.length - 1,
	)

	if (typeof variable === 'object') {
		const countKeys = Object.keys(variable).length

		return countKeys === 0 ? '' : jsonString
	}
	return variable ? jsonString : ''
}

/**
 * 取得 URL 查詢字串
 */
export const getQueryString = (name: string) => {
	const urlParams = new URLSearchParams(window.location.search)
	const paramValue = urlParams.get(name)
	return paramValue
}

/**
 * 取得貨幣字串
 */
export const getCurrencyString = ({
	price,
	symbol = 'NT$',
}: {
	price: number | string | undefined
	symbol?: string
}) => {
	if (typeof price === 'undefined') return ''
	if (typeof price === 'string') return `${symbol} ${price}`
	return `${symbol} ${price.toString()}`
}

/**
 * 過濾物件的鍵值
 * 例如: 把一個深層物件 value 為 undefined 的 key 過濾掉
 */
export const filterObjKeys = (
	obj: object,
	filterValues: (string | number | boolean | undefined | null)[] = [undefined],
) => {
	for (const key in obj) {
		if (filterValues.includes(obj[key as keyof typeof obj])) {
			delete obj[key as keyof typeof obj]
		} else if (typeof obj[key as keyof typeof obj] === 'object') {
			filterObjKeys(obj[key as keyof typeof obj]) // 递归处理嵌套对象
			if (Object.keys(obj[key as keyof typeof obj]).length === 0) {
				delete obj[key as keyof typeof obj]
			}
		}
	}

	return obj
}

/**
 * 將駝峰或蛇形字串轉換為單字
 * Camel or snake case to word
 */
export const keyToWord = (str: string) => {
	// 判斷是否為 snake_case 或 Camel Case

	if (str.includes('_')) {
		// 將 snake_case 轉換為 Camel Case

		return str
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	} else {
		// 將 Camel Case 轉換為 Camel Case（確保第一個單詞首字母大寫）

		return (
			str.charAt(0).toUpperCase() +
			str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')
		)
	}
}

/**
 * 判斷是否使用區塊編輯器
 */
export const isUsingBlockEditor =
	typeof window?.wp !== 'undefined' && typeof window?.wp?.blocks !== 'undefined'

/**
 * 移除字串尾部的斜杠
 */
export function removeTrailingSlash(str: string) {
	if (str.endsWith('/')) {
		// 如果字符串以斜杠结尾，使用 slice 方法去除最后一个字符

		return str.slice(0, -1)
	}

	// 否则，返回原字符串

	return str
}

/**
 * 取得物件陣列 item[][] 的最大公約數
 */
export function getGCDItems<T>(items: T[][], key = 'id'): T[] {
	if (items.length === 0) return []

	// sort by items length asc
	const sortedItems = items.sort((a, b) => a.length - b.length)
	if (sortedItems[0].length === 0) return []
	const firstItemIds = sortedItems?.[0]?.map((item) => item?.[key as keyof T])

	const gcdIds: string[] = []
	firstItemIds.forEach((id) => {
		if (
			sortedItems.every((item) =>
				item.some((course) => course?.[key as keyof T] === id),
			)
		) {
			gcdIds.push(id as string)
		}
	})
	const gcdItems = gcdIds
		.map((id) => {
			return sortedItems[0].find((item) => item?.[key as keyof T] === id)
		})
		.filter((item) => item !== undefined)

	return gcdItems
}
