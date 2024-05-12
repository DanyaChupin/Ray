import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { InputField } from '../InputFIled/InputField'
import { Select } from '../select/Select'
import { SelectItem } from '../selectItem/SelectItem'
import { IOption } from '@/shared/types/options.type'
import useOutsideClick from '@/hooks/useOutsideClick'
import cn from 'classnames'
import styles from './SearchForm.module.scss'

interface IForm {
	inputValue: string
	changeInput: (e: ChangeEvent<HTMLInputElement>) => void
	setCheckDescription?: Dispatch<SetStateAction<boolean>>
	catalogStyle?: boolean
	selectOptions: IOption[]
}

export function SearchForm({
	inputValue,
	changeInput,
	setCheckDescription,
	catalogStyle = false,
	selectOptions,
}: IForm) {
	const { ref, isActive, setIsActive } = useOutsideClick(false)

	const toggleSelect = () => {
		if (isActive) return
		setIsActive(!isActive)
	}
	return (
		<form
			className={cn(styles['form'], {
				[styles['formHomeSize']]: !catalogStyle,
			})}
			ref={ref}
		>
			<InputField
				value={inputValue}
				onChange={changeInput}
				onFocus={toggleSelect}
				onClick={toggleSelect}
				pathIcon="./images/search.svg"
				type="text"
				catalogStyle={catalogStyle}
				aria-label="поиск"
			/>
			<Select isOpen={isActive} catalogStyle={catalogStyle}>
				{selectOptions.map((option) => (
					<SelectItem
						catalogStyle={catalogStyle}
						onClick={() => {
							option.text === 'Что такое ЛУЧ?' &&
								setCheckDescription &&
								setCheckDescription((prev) => !prev)
						}}
						pathIcon="./images/search.svg"
						option={option}
						key={option.text}
					/>
				))}
			</Select>
		</form>
	)
}
