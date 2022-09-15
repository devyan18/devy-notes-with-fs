import { useEffect } from 'react'
import useLogin from '../../../hooks/useLogin'
import styles from './styles.module.css'

interface Props {
  offLineSetter: () => void
}

export default function Auth (props: Props) {
  const { handleChangeParams, params, handleSubmit, error, loading } = useLogin()

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  return (
    <div className={styles.container}>
      <h1>Auth</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder='Enter you email...'
          value={params.email}
          onChange={handleChangeParams}
          type="email"
          name="email"
        />
        <input
          className={styles.input}
          placeholder='Enter you password...'
          value={params.password}
          onChange={handleChangeParams}
          type="password"
          name="password" />
        <button type="submit" className={styles.button} disabled={loading}>Login</button>
        <p className={styles.dontAccount} onClick={props.offLineSetter}>Using without account</p>
        {/* <a className={styles.dontAccount} href="https://devy-register-user.netlify.app" target={'_blank'} rel="noreferrer">I do not have an account</a> */}
      </form>
    </div>
  )
}
