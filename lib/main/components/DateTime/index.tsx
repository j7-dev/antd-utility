import React from 'react'
import dayjs from 'dayjs'
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { cn } from '@/main/utils'
import { Tooltip } from 'antd'

type TDateProps = {
	icon?: React.ReactNode
	format?: string
}

export const DateTime: React.FC<{
	date: number
	className?: string
	dateProps?: TDateProps
	timeProps?: TDateProps
	hideTime?: boolean
}> = ({ date, className, dateProps, timeProps, hideTime }) => {
	if (date.toString().length !== 13) {
		return (
			<div className="at-text-center">
				<p>OOPS! 出錯拉</p>
				<p>date 請輸入 毫秒(13位) 數字</p>
			</div>
		)
	}

	const dateIcon = dateProps?.icon || <CalendarOutlined className="at-mr-2" />
	const dateFormat = dateProps?.format || 'YYYY-MM-DD'
	const timeIcon = timeProps?.icon || (
		<ClockCircleOutlined className="at-mr-2" />
	)
	const timeFormat = timeProps?.format || 'HH:mm:ss'

	if (hideTime) {
		return (
			<Tooltip
				title={
					<>
						{timeIcon} {dayjs(date).format(timeFormat)}
					</>
				}
			>
				<div className={cn('at-text-gray-600 at-text-xs', className)}>
					<p className="at-m-0 at-whitespace-nowrap">
						{dateIcon}
						{dayjs(date).format(dateFormat)}
					</p>
				</div>
			</Tooltip>
		)
	}

	return (
		<div className={cn('at-text-gray-600 at-text-xs', className)}>
			<p className="at-m-0 at-whitespace-nowrap">
				{dateIcon}
				{dayjs(date).format(dateFormat)}
			</p>
			<p className="at-m-0 at-whitespace-nowrap">
				{timeIcon}
				{dayjs(date).format(timeFormat)}
			</p>
		</div>
	)
}
