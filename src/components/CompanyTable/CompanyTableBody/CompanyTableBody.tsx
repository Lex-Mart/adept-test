import { useState, useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../../hooks'
import { useIntObserver } from '../../../hooks/useIntersectionObserver'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Row, Cell, VirtualTable } from '../../Table'
import { CheckBox } from '../../ui'
import { CompanyTableRow } from '../CompanyTableRow/CompanyTableRow'

export const CompanyTableBody = () => {
	const { companies, hasNextPage, companyCheckedRows } = useAppSelector((state) => state.company)
	const dispatch = useAppDispatch()

	const [page, setPage] = useState(1)

	useEffect(() => {
		dispatch(companyActions.fetchCompanies(page))
	}, [page])

	const lastRowRef = useIntObserver(
		(disconnect) => {
			if (hasNextPage) {
				setPage((prev) => prev + 1)
			} else {
				disconnect()
			}
		},
		[hasNextPage],
	)

	const allCheckedHandle = () => {
		dispatch(companyActions.toggleAllCompanyChecked())
	}

	const rowCheckedHandle = (companyId: string) => {
		dispatch(companyActions.setCompanyChecked(companyId))
	}

	const allCompanyChecked = companies.length === companyCheckedRows.length

	return (
		<VirtualTable
			head={
				<Row header>
					<Cell>
						<CheckBox checked={allCompanyChecked} onChange={allCheckedHandle} />
					</Cell>
					<Cell>Название</Cell>
					<Cell>Кол-во сотрудников</Cell>
					<Cell>Адрес</Cell>
				</Row>
			}
			rows={companies.map((company, idx) => {
				const ref = idx === companies.length - 1 ? lastRowRef : null
				const checked = companyCheckedRows.includes(company.id)
				const className = checked ? 'bgGray' : ''

				return (
					<CompanyTableRow
						key={company.id}
						company={company}
						checked={checked}
						ref={ref}
						className={className}
						checkedOnChange={() => rowCheckedHandle(company.id)}
					/>
				)
			})}
		/>
	)
}
