import useLogin from '../../../hooks/useLogin'
import styles from './styles.module.css'

interface Props {
  offLineSetter: () => void
}

export default function Auth (props: Props) {
  const { handleChangeParams, params, handleLogin } = useLogin()

  return (
    <div className={styles.container}>
      <h1>Auth</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          disabled={true}
          className={styles.input}
          placeholder='Disabled for now...'
          value={params.email}
          onChange={handleChangeParams}
          type="email"
          name="email" />
        <input
          disabled={true}
          className={styles.input}
          placeholder='Disabled for now...'
          value={params.password}
          onChange={handleChangeParams}
          type="password"
          name="password" />
        <button type="submit" disabled={true} className={styles.button}>Disabled for now...</button>
        <p className={styles.dontAccount} onClick={props.offLineSetter}>Using without account</p>
        <a className={styles.dontAccount} href="https://devy-register-user.netlify.app" target={'_blank'} rel="noreferrer">I do not have an account</a>
      </form>
    </div>
  )
}
