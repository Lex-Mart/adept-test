import { useAppSelector } from '../../../hooks'
import { AddEmployeeTable } from '../../AddEmployeeTable'
import { EmployeeTable } from '../../EmployeeTable'

export const RightSection = () => {
	const { companyCheckedRows } = useAppSelector((state) => state.company)
	const isOneChecked = companyCheckedRows.length === 1

	if (!isOneChecked) {
		return null
	}

	return (
		<section>
			<AddEmployeeTable />
			<EmployeeTable />
		</section>
	)
}
