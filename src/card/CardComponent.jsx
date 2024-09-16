import React,{ useState } from 'react'
import styles from './CardComponent.module.css'


function CardComponent({icon,title,initialCount}) {
  const [count, setCount] = useState(initialCount)

  const updateCount = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.card} onClick={() => updateCount()}>  
        <img className={styles.icon} src={icon} alt={`${title} icon`}/>
        <h5>{title}</h5>
        <h2>{count}</h2>  
    </div>
  )
}

export default CardComponent