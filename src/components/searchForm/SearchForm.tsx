import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { InputField } from '../InputFIled/InputField'
import { Select } from '../select/Select'
import { SelectItem } from '../selectItem/SelectItem'
import { IOption } from '@/shared/types/options.type'
import useOutsideClick from '@/hooks/useOutsideClick'
import cn from 'classnames'
import styles from './SearchForm.module.scss'
import { useTranslations } from 'next-intl'

interface IForm {
	inputValue: string
	changeInput: (e: ChangeEvent<HTMLInputElement>) => void
	setCheckDescription?: Dispatch<SetStateAction<boolean>>
	catalogStyle?: boolean
	selectOptions: IOption[]
	isLoading: boolean
	onSubmit: (e: FormEvent) => void
	localOption?: IOption[]
}

export function SearchForm({
	inputValue,
	changeInput,
	setCheckDescription,
	catalogStyle = false,
	selectOptions,
	isLoading,
	onSubmit,
	localOption,
}: IForm) {
	const { ref, isActive, setIsActive } = useOutsideClick(false)
	const toggleSelect = () => {
		setIsActive(!isActive)
	}
	const formAction = (e: FormEvent) => {
		onSubmit(e)
		toggleSelect()
	}

	const t = useTranslations('home')
	return (
		<form
			className={cn(styles['form'], {
				[styles['formHomeSize']]: !catalogStyle,
			})}
			ref={ref}
			onSubmit={formAction}
		>
			<InputField
				value={inputValue}
				onChange={(e) => {
					changeInput(e), setIsActive(true)
				}}
				onFocus={() => setIsActive(true)}
				onClick={() => setIsActive(true)}
				type="text"
				catalogStyle={catalogStyle}
				aria-label="поиск"
				isLoading={isLoading}
			/>
			<Select isOpen={isActive} catalogStyle={catalogStyle}>
				{selectOptions.map((option) => (
					<SelectItem
						catalogStyle={catalogStyle}
						onClick={() => {
							option.text === t('howLuch') &&
								setCheckDescription &&
								setCheckDescription((prev) => !prev)
						}}
						isLocalSearch={false}
						option={option}
						key={option.text}
					/>
				))}
				{localOption &&
					localOption
						.filter((filterOption) =>
							filterOption.text.toLowerCase().includes(inputValue.toLowerCase())
						)
						.map((option) => (
							<SelectItem
								isLocalSearch={true}
								catalogStyle={catalogStyle}
								onClick={() => setIsActive(false)}
								deleteOpportunity={true}
								option={option}
								key={option.text}
							/>
						))}
			</Select>
		</form>
	)
}
