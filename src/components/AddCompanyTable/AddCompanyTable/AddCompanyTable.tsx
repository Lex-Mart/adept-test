import { ChangeEvent, useState } from 'react'

import { useAppDispatch } from '../../../hooks'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Cell, Row, Table } from '../../Table'
import { Button, TableInput } from '../../ui'

import './AddCompanyTable.scss'

export const AddCompanyTable = () => {
	const dispatch = useAppDispatch()

	const [values, setValues] = useState({
		name: '',
		address: '',
	})

	const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const addHandler = () => {
		dispatch(companyActions.addCompany(values))
		setValues({ address: '', name: '' })
	}

	const btnIsDisabled = values.name === '' || values.address === ''

	return (
		<div className="addCompanyTable">
			<div className="tableHeader">
				<h2>Доавить компанию</h2>
				<Button onClick={addHandler} disabled={btnIsDisabled} variant="green">
					Добавить
				</Button>
			</div>

			<Table>
				<Row column={2} header>
					<Cell>Название</Cell>
					<Cell>Адрес</Cell>
				</Row>
				<Row column={2}>
					<Cell>
						<TableInput name="name" value={values.name} onChange={changeHandler} />
					</Cell>
					<Cell>
						<TableInput name="address" value={values.address} onChange={changeHandler} />
					</Cell>
				</Row>
			</Table>
		</div>
	)
}
