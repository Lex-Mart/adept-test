import { useAppDispatch, useAppSelector } from '../../../hooks'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Button } from '../../ui'
import { EmployeeTableBody } from '../EmployeeTableBody/EmployeeTableBody'

import './EmployeeTable.scss'

export const EmployeeTable = () => {
	const { companies, companyCheckedRows, employeeCheckedRows, employeeChangedRows } = useAppSelector(
		(state) => state.company,
	)
	const dispatch = useAppDispatch()

	const companyId = companyCheckedRows[0]
	const employees = companies.find((cp) => cp.id === companyId)?.employees

	const deleteHandle = () => {
		dispatch(companyActions.deleteEmployees(companyId))
	}

	const cancelHandle = () => {
		dispatch(companyActions.cancelAllEmployeeChanges())
	}

	const saveHandle = () => {
		dispatch(companyActions.updateEmployees())
	}

	const deleteBtnIsDisabled = !employeeCheckedRows.length
	const cancelSaveBtnsIsDisabled = !Object.keys(employeeChangedRows).length

	if (!employees?.length) {
		return null
	}

	return (
		<div className="employeeTable">
			<div className="tableHeader">
				<h2>Сотрудники</h2>
				<div>
					<Button disabled={cancelSaveBtnsIsDisabled} onClick={cancelHandle}>
						Отменить
					</Button>
					<Button disabled={cancelSaveBtnsIsDisabled} onClick={saveHandle} variant="green">
						Сохранить
					</Button>
					<Button disabled={deleteBtnIsDisabled} onClick={deleteHandle} variant="red">
						Удалить
					</Button>
				</div>
			</div>
			<EmployeeTableBody employees={employees} />
		</div>
	)
}
