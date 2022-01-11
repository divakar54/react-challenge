import React, {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(1);
    const [countTwo, setCountTwo] = useState(1);
    
    const increment = () => {
        setCount(count+1)
    }
    
    const incrementTwo = () => {    
        setCountTwo(countTwo+1)
    } 

    const isEven = () =>{
        let i=0;
        console.log('run');
        while(i <2000000000) i++;
        return countTwo % 2 === 0;
    }

    return (
        <div>
            <button onClick={increment}>Counter : {count}</button>
            <span>{isEven() ? 'Even' : 'Odd'}</span>
            <button onClick={incrementTwo}>Counter : {countTwo}</button>
        </div>
    )
}

export default Counter
