'use client'
import { ButtonLang } from './components/buttonLang/ButtonLang'
import { InputField } from './components/InputFIled/InputField'
import { Logo } from './components/Logo/Logo'
import { Slider } from './components/slider/Slider'
import { FlexBox } from './components/ui/flexBox/FlexBox'
import styles from './Home.module.scss'
import { useResize } from './hooks/useResize'

export default function HomePage() {
	const { isScreenXl, isScreenLg } = useResize()

	return (
		<>
			<Slider screenSize={isScreenXl} />
			<main className={styles['home']}>
				<section className={styles['home__section']}>
					<FlexBox column={true}>
						<Logo />
						<form>
							<InputField screenSize={isScreenLg} icon='/images/search.svg' />
						</form>
					</FlexBox>
					<ButtonLang />
				</section>
			</main>
		</>
	)
}
