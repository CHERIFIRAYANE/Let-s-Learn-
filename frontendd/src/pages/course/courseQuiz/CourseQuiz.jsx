import { useState } from 'react'
import { Link } from 'react-router-dom'
import './courseQuiz.css'
import AnswerTimer from './answerTimer/AnswerTimer'

const CourseQuiz = ({questions}) => {
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [answerIdx,setAnswerIdx] = useState(null)
    const [answer,setAnswer] = useState(null)
    const {question , choices ,correctAnswer,type} = questions[currentQuestion]
    const [result,setResult]=useState({
        score :0,
        numCorrectAnswer :0,
        numWrongAnswer:0
    })
    const [showResult,setShowResult] = useState(false)
    const [showAnswerTimer,setShowAnswerTimer] = useState(true)
    const [inputAnswer,setInputAnswer] = useState("")

    const onAnswerClick = (answer,index) =>{
        setAnswerIdx(index)
        if(answer===correctAnswer){
            setAnswer(true)
        }else{
            setAnswer(false)
        }
    }
    const onClickNext = (finalAnswer) =>{
        setAnswerIdx(null)
        setShowAnswerTimer(false)
        setResult((prev)=>finalAnswer ?
          {...prev,score:prev.score+1,numCorrectAnswer:prev.numCorrectAnswer+1}
         : {...prev,numWrongAnswer:prev.numWrongAnswer+1} )

        if (currentQuestion !== questions.length - 1){
            setCurrentQuestion((prev) => prev + 1)
        }else{
            setCurrentQuestion(0)
            setShowResult(true)
        }
        setTimeout(() => {
            setShowAnswerTimer(true)
        });
        setInputAnswer("")
    }

    const onTryAgain = () =>{
        setResult({
            score :0,
            numCorrectAnswer :0,
            numWrongAnswer:0
        })
        setShowResult(false)
    }
    const handleTimeUp = () =>{
        setAnswer(false)
        onClickNext(false)
        
    }

    const handleInputChange = (event)=>{
        setInputAnswer(event.target.value)
        if(event.target.value===correctAnswer){
            setAnswer(true)
            
        }else{
            setAnswer(false)
        }
    }


    const getAnswerUI = () =>{
        if(type === 'FillB'){
            return (<input value={inputAnswer} onChange={handleInputChange}/>)
        } else{
            return ( 
                <ul>
            {
                choices.map((choice, index)=>{
                    return(
                        <li 
                        className={answerIdx===index? 'selected-answer'  : null}
                        onClick={()=> onAnswerClick(choice,index)}
                        key={choice}>
                            {choice}
                        </li>
                    )
                })
            }
        </ul>
        );
    }
    }

    return (
    <div className='course-quiz'>
      <div className='course-quiz-container'>
        {!showResult ? (<>
          {showAnswerTimer && <AnswerTimer onTimeUp={handleTimeUp} />}
          <span className='active-questions-no'>{currentQuestion + 1}</span>
          <span className='total-questions-course'>/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className='footer-quiz'>
            <button onClick={()=>onClickNext(answer)} disabled={answerIdx===null && !inputAnswer} >
                {currentQuestion===questions.length - 1 ? "finished" : "next"}
            </button>
          </div>

        </>) : <div className='result-course'>
            <h3>Result</h3>
            <p>
                Toaltal Questions  : <span>{questions.length}</span>
            </p>
            <p>
                Correst Answers  : <span>{result.numCorrectAnswer}</span>
            </p>
            <p>
                Wrong Answers  : <span>{result.numWrongAnswer}</span>
            </p>
            {result.numWrongAnswer !== 0 ?
             <>
             <p className='result-textt'>You Didn't Pass The Quiz</p>
             <button onClick={onTryAgain}>Try Again</button>
             </>
             :
             <>
             <p className='result-textt'>Congratulations You Passed the Quiz</p>
             <Link className='lnk' to='/course/coursedetail' >Go To Next Course</Link>
             </>
            }
            </div>}
        
      </div>
    </div>
  )
}

export default CourseQuiz