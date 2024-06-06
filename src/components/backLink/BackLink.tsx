import { useRouter } from 'next/navigation'
import styles from './BackLink.module.scss'

export function BackLink({ onClick }: { onClick?: () => void }) {
	const router = useRouter()
	const comeBack = () => {
		router.back()
	}
	return (
		<button
			className={styles['backLink']}
			onClick={onClick ? onClick : comeBack}
		>
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.4136e-09 31C1.60899e-06 31.5523 0.447717 32 1 32L10 32C10.5523 32 11 31.5523 11 31C11 30.4477 10.5523 30 10 30L2 30L2 22C2 21.4477 1.55229 21 1 21C0.447715 21 4.71029e-07 21.4477 -5.40495e-07 22L7.4136e-09 31ZM30.2929 0.292893L0.292894 30.2929L1.70711 31.7071L31.7071 1.70711L30.2929 0.292893Z"
					fill="white"
				/>
			</svg>
		</button>
	)
}
