import { useAppDispatch, useAppSelector } from '../../../hooks'
import { companyActions } from '../../../store/companySlice/companySlice'
import { Button } from '../../ui'
import { CompanyTableBody } from '../CompanyTableBody/CompanyTableBody'

import './CompanyTable.scss'

export const CompanyTable = () => {
	const { companyCheckedRows, companyChangedRows } = useAppSelector((state) => state.company)
	const dispatch = useAppDispatch()

	const deleteHandle = () => {
		dispatch(companyActions.deleteCompanies())
	}

	const cancelHandle = () => {
		dispatch(companyActions.cancelAllCompanyChanges())
	}

	const saveHandle = () => {
		dispatch(companyActions.updateCompanies())
	}

	const deleteBtnIsDisabled = !companyCheckedRows.length
	const cancelSaveBtnsIsDisabled = !Object.keys(companyChangedRows).length

	return (
		<div className="companyTable">
			<div className="tableHeader">
				<h2>Компании</h2>
				<div>
					<Button disabled={cancelSaveBtnsIsDisabled} onClick={cancelHandle}>
						Отменить
					</Button>
					<Button disabled={cancelSaveBtnsIsDisabled} variant="green" onClick={saveHandle}>
						Сохранить
					</Button>
					<Button disabled={deleteBtnIsDisabled} variant="red" onClick={deleteHandle}>
						Удалить
					</Button>
				</div>
			</div>

			<CompanyTableBody />
		</div>
	)
}
