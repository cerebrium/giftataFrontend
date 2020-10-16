import styles from '../styles/Home.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

interface stateType {
  lastUpdate: number 
  light: boolean
  count: number
}

const Home: React.FunctionComponent = () => {
  // acces the redux store
  const localState: stateType = useSelector((state: stateType) => state)
  
  // view state
  useEffect( () => {
    console.log(localState)
  }, [localState])

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
    </div>
  )
}

export default Home
