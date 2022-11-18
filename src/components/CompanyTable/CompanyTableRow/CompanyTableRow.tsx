import { ChangeEvent, forwardRef, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Company } from '../../../interfaces'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Row, Cell } from '../../Table'
import { CheckBox, TableInput } from '../../ui'

export interface CompanyTableRow {
	className?: string
	checked?: boolean
	checkedOnChange?: () => void
	company: Company
}

export const CompanyTableRow = forwardRef<HTMLDivElement, CompanyTableRow>(function CompanyTableRow(props, ref) {
	const isAlreadyChanged = useAppSelector((state) => state.company.companyChangedRows[props.company.id])
	const [values, setValues] = useState({
		name: props.company.name,
		address: props.company.address,
	})
	const dispatch = useAppDispatch()

	const hasChange = props.company.name !== values.name || props.company.address !== values.address

	useEffect(() => {
		if (hasChange && !isAlreadyChanged) {
			setValues({
				name: props.company.name,
				address: props.company.address,
			})
		}
	}, [isAlreadyChanged])

	const changeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const blurHandle = () => {
		if (hasChange) {
			dispatch(companyActions.addChangedCompany({ ...props.company, ...values }))
		} else {
			if (isAlreadyChanged) {
				dispatch(companyActions.removeUnchangedCompany(props.company))
			}
		}
	}

	return (
		<Row ref={ref} className={props.className}>
			<Cell className="textCenter">
				<CheckBox checked={props.checked} onChange={props.checkedOnChange} />
			</Cell>
			<Cell>
				<TableInput name="name" value={values.name} onChange={changeHandle} onBlur={blurHandle} />
			</Cell>
			<Cell>{props.company.employees.length}</Cell>
			<Cell>
				<TableInput name="address" value={values.address} onChange={changeHandle} onBlur={blurHandle} />
			</Cell>
		</Row>
	)
})
