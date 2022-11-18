import { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Cell, Row, Table } from '../../Table'
import { Button, TableInput } from '../../ui'

import './AddEmployeeTable.scss'

export const AddEmployeeTable = () => {
	const { companyCheckedRows } = useAppSelector((state) => state.company)
	const dispatch = useAppDispatch()

	const [values, setValues] = useState({
		firstName: '',
		secondName: '',
		position: '',
	})

	const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const addHandler = () => {
		dispatch(companyActions.addEmployee({ ...values, companyId: companyCheckedRows[0] }))
		setValues({ firstName: '', secondName: '', position: '' })
	}

	const btnIsDisabled = Object.entries(values).some(([, val]) => val === '')

	return (
		<div className="addEmployeeTable">
			<div className="tableHeader">
				<h2>Добавить сотрудника</h2>
				<Button disabled={btnIsDisabled} variant="green" onClick={addHandler}>
					Добавить
				</Button>
			</div>

			<Table>
				<Row column={3} header>
					<Cell>Фамилия</Cell>
					<Cell>Имя</Cell>
					<Cell>Должность</Cell>
				</Row>
				<Row key={1} column={3}>
					<Cell>
						<TableInput name="secondName" value={values.secondName} onChange={changeHandler} />
					</Cell>
					<Cell>
						<TableInput name="firstName" value={values.firstName} onChange={changeHandler} />
					</Cell>
					<Cell>
						<TableInput name="position" value={values.position} onChange={changeHandler} />
					</Cell>
				</Row>
			</Table>
		</div>
	)
}
