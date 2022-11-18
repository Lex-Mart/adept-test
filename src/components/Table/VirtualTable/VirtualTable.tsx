import { ReactChild, ReactNode, useEffect, useRef, useState } from 'react'

import './VirtualTable.scss'

export interface VirtualTableProps {
	head: ReactChild
	rows: ReactNode[]
	rowHeight?: number
	visibleRows?: number
}

export const VirtualTable = ({ rowHeight = 60, visibleRows = 20, rows, head }: VirtualTableProps) => {
	const tableRef = useRef<null | HTMLDivElement>(null)
	const [start, setStart] = useState(0)

	const rowPaddings = 20

	const getTopHeight = () => {
		return Math.max(rowHeight * start, 0)
	}
	const getBottomHeight = () => {
		return Math.max(rowHeight * (rows.length - (start + visibleRows + 1)), 0)
	}

	useEffect(() => {
		const onScroll = () => {
			if (tableRef.current) {
				const headerHeight = rowHeight
				const tableOffset = tableRef.current.offsetTop
				const topScroll = window.scrollY - tableOffset - headerHeight

				if (topScroll > 0) {
					setStart(Math.min(Math.floor(topScroll / rowHeight)))
				} else {
					setStart(0)
				}
			}
		}

		document.addEventListener('scroll', onScroll)

		return () => {
			document.removeEventListener('scroll', onScroll)
		}
	}, [rows, rowHeight, visibleRows])

	return (
		<div ref={tableRef} className="table">
			{head}
			<div style={{ height: getTopHeight() }} />
			{rows.slice(start, start + visibleRows + rowPaddings).map((row, idx) => (
				<div key={idx + start}>{row}</div>
			))}
			<div style={{ height: getBottomHeight() }} />
		</div>
	)
}
