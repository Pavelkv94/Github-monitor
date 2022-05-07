import React, { useEffect, useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import s from './Header.module.css';

type HeaderPropsType = {
	value: string
	setSearchTerm: (value: string) => void
}

export const HeaderUp: React.FC<HeaderPropsType> = ({ value, setSearchTerm }) => {
	const [tempSearch, setTempSearch] = useState<string>(value)


	useEffect(() => {
		setTempSearch(value)
	}, [value])

	return (<div className={s.header}>
		<a href="https://github.com/" target='blank' ><div className={s.logo}></div></a>
		<Input
			icon={<Icon name='search'
				inverted
				circular
				link
				onClick={() => {
					setSearchTerm(tempSearch); 
				}} />}
			placeholder='Search...'
			value={tempSearch}
			size='large'
			onChange={(e) => { setTempSearch(e.currentTarget.value) }}
			style={{ width: '400px' }}
		/>
	</div>);
}


