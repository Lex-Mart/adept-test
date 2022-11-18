import { FC } from 'react'

import { useAppSelector, useAppDispatch } from '../../../hooks'
import { Employee } from '../../../interfaces'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Table, Row, Cell } from '../../Table'
import { CheckBox } from '../../ui'
import { EmployeeTableRow } from '../EmployeeTableRow/EmployeeTableRow'

export interface EmployeeTableBodyProps {
	employees: Employee[]
}

export const EmployeeTableBody: FC<EmployeeTableBodyProps> = ({ employees }) => {
	const { employeeCheckedRows } = useAppSelector((state) => state.company)
	const dispatch = useAppDispatch()

	const allEmployeesChecked = employees?.length === employeeCheckedRows.length

	if (!employees?.length) {
		return null
	}

	const allCheckedHandle = () => {
		dispatch(companyActions.toggleAllEmployeeChecked())
	}

	const rowCheckedHandle = (employeeId: string) => {
		dispatch(companyActions.setEmployeeChecked(employeeId))
	}

	return (
		<Table>
			<Row header>
				<Cell>
					<CheckBox checked={allEmployeesChecked} onChange={allCheckedHandle} />
				</Cell>
				<Cell>Фамилия</Cell>
				<Cell>Имя</Cell>
				<Cell>Должность</Cell>
			</Row>
			{employees.map((employee) => {
				const checked = employeeCheckedRows.includes(employee.id)
				const className = checked ? 'bgGray' : ''

				return (
					<EmployeeTableRow
						checked={checked}
						className={className}
						employee={employee}
						key={employee.id}
						checkedOnChange={() => rowCheckedHandle(employee.id)}
					/>
				)
			})}
		</Table>
	)
}
