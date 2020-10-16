import styles from '../styles/Home.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

// declare what the state can be
interface stateType {
  count: number
}

const Home: React.FunctionComponent = () => {
  // acces the redux store
  const localState: stateType = useSelector((state: stateType) => state)

  // map dispath to redux dispatch
  const dispatch = useDispatch()

  // function for incrementing the state
  const handleClick = () => {
    dispatch({
      type: 'INCREMENT'
    })
  }

  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <button onClick={handleClick}>
        Increment
      </button>
      <h2>{localState.count}</h2>
      <Link href='/about'>About</Link>
    </div>
  )
}

export default Home
