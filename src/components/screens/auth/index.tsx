import useLogin from '../../../hooks/useLogin'
import styles from './styles.module.css'

export default function index () {
  const { handleChangeParams, params, handleLogin } = useLogin()

  return (
    <div className={styles.container}>
      <h1>Auth</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          className={styles.input}
          placeholder='Enter you email...'
          value={params.email}
          onChange={handleChangeParams}
          type="email"
          name="email" />
        <input
          className={styles.input}
          placeholder='Enter password...'
          value={params.password}
          onChange={handleChangeParams}
          type="password"
          name="password" />
        <button type="submit" className={styles.button}>Login</button>
        <a className={styles.dontAccount} href="https://devy-register-user.netlify.app" target={'_blank'} rel="noreferrer">I do not have an account</a>
      </form>

    </div>
  )
}
