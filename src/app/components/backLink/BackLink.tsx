import Image from 'next/image'
import Link from 'next/link'
import styles from './BackLink.module.scss'

export function BackLink({
	returnBackUrl,
	checkDescription,
}: {
	returnBackUrl: string
	checkDescription?: () => void
}) {
	return (
		<Link
			className={styles['backLink']}
			onClick={checkDescription && checkDescription}
			href={returnBackUrl}
		>
			<Image src='/images/back.svg' width={30} height={30} alt='Назад' />
		</Link>
	)
}
