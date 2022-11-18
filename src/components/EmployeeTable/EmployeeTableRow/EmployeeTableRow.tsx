import { ChangeEvent, FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Employee } from '../../../interfaces'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Row, Cell } from '../../Table'
import { CheckBox, TableInput } from '../../ui'

export interface EmployeeTableRowProps {
	employee: Employee
	className?: string
	checked?: boolean
	checkedOnChange?: () => void
}

export const EmployeeTableRow: FC<EmployeeTableRowProps> = ({ checked, checkedOnChange, className, employee }) => {
	const isAlreadyChanged = useAppSelector((state) => state.company.employeeChangedRows[employee.id])
	const [values, setValues] = useState({
		firstName: employee.firstName,
		secondName: employee.secondName,
		position: employee.position,
	})
	const dispatch = useAppDispatch()

	const hasChange =
		employee.firstName !== values.firstName ||
		employee.secondName !== values.secondName ||
		employee.position !== values.position

	useEffect(() => {
		if (hasChange && !isAlreadyChanged) {
			setValues({
				firstName: employee.firstName,
				secondName: employee.secondName,
				position: employee.position,
			})
		}
	}, [isAlreadyChanged])

	const changeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const blurHandle = () => {
		if (hasChange) {
			dispatch(companyActions.addChangedEmployee({ ...employee, ...values }))
		} else {
			if (isAlreadyChanged) {
				dispatch(companyActions.removeUnchangedEmployee(employee))
			}
		}
	}

	return (
		<Row className={className}>
			<Cell className="textCenter">
				<CheckBox onChange={checkedOnChange} checked={checked} />
			</Cell>
			<Cell>
				<TableInput name="secondName" value={values.secondName} onChange={changeHandle} onBlur={blurHandle} />
			</Cell>
			<Cell>
				<TableInput name="firstName" value={values.firstName} onChange={changeHandle} onBlur={blurHandle} />
			</Cell>
			<Cell>
				<TableInput name="position" value={values.position} onChange={changeHandle} onBlur={blurHandle} />
			</Cell>
		</Row>
	)
}
