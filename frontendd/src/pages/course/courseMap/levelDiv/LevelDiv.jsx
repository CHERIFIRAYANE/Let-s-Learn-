import { Link } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import './levelDiv.css'

const LevelDiv = (props) => {
  return (
    <div>
    <Link className={`course-level-div ${props.numberLvl+1>props.currentLevel ? "no-click" : ""}`} to={props.text !== "GET YOUR CERTIFICATE FROM SPEAKIFY" ? "/course/coursedetail" : "/course/coursecertf"}>
        <div className='course-level-container'>
          { props.numberLvl+1>props.currentLevel && <div className='lock-level'>
          <FaLock className='lock-icon' />
          </div>}
          <img className={props.numberLvl+1>props.currentLevel ? "locked" : ""} src={props.imgsrc} alt='level_photo' />
          <div className={`level-text ${props.numberLvl+1>props.currentLevel ? "locked" : ""}`}>{props.text}</div>
        </div>
    </Link>
    </div>
  )
}

export default LevelDiv