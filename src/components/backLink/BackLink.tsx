import Image from 'next/image'
import Link from 'next/link'
import styles from './BackLink.module.scss'

export function BackLink({
	returnBackUrl,
	onClick,
}: {
	returnBackUrl: string
	onClick?: () => void
}) {
	return (
		<Link
			className={styles['backLink']}
			onClick={onClick && onClick}
			href={returnBackUrl}
		>
			<Image src='/images/back.svg' width={30} height={30} alt='Назад' />
		</Link>
	)
}
