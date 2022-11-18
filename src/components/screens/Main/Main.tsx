import { AddCompanyTable } from '../../AddCompanyTable'
import { CompanyTable } from '../../CompanyTable'
import { RightSection } from '../../RightSection'

import './Main.scss'

export const Main = () => {
	return (
		<main className="container main">
			<section>
				<AddCompanyTable />
				<CompanyTable />
			</section>
			<RightSection />
		</main>
	)
}
