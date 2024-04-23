import styles from './Logo.module.scss'

const LOGOTEXT = 'ЛУЧ'
export function Logo() {
	return <h1 className={styles['logo']}>{LOGOTEXT}</h1>
}
