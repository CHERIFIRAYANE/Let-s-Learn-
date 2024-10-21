import './answerTimer.css'
import { useEffect,useState,useRef } from 'react'

const AnswerTimer = ({onTimeUp}) => {
    const duration = 10;
    const [counter,setCounter] = useState(0)
    const [progressLoaded,setProgressLoaded] = useState(0)
    const numberintr = useRef();
   useEffect(()=>{
        numberintr.current = setInterval(()=>{
        setCounter((cur)=>cur+0.1)
    },100)
    return ()=> clearInterval(numberintr.current)
   },[]) 
   
   useEffect(()=>{
    setProgressLoaded(100*(counter/duration))
    if(counter>=duration){
       clearInterval(numberintr.current);
        onTimeUp(); 
        
    }
   },[counter])




  return (
    <div className='quiz-course-timer'>
        <div 
        style={{
            width:`${progressLoaded}%`,
            background:`${
                progressLoaded < 40 ? "lightgreen"
                : progressLoaded < 70 ? "orange"
                : "red"
            }`
        }}
        className='course-progress'>

        </div>
    </div>
  )
}

export default AnswerTimer