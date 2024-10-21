import './courseLang.css'
import {Link} from 'react-router-dom'

const CourseLang = () => {
  return (
    <div className='container'>
      
      <div className='sous-container'>
      <h1>Chose a Language to Learn : </h1>
      <div className='row'>
        <Link to='/course/coursemap' className='box-lang spanish'><div >Spanish</div></Link>
        <Link to='/course/coursemap' className='box-lang german'><div >German</div></Link>
      </div>
      <div className='row'>
        <Link to='/course/coursemap' className='box-lang french'><div >French</div></Link>
        <Link to='/course/coursemap' className='box-lang italian'><div >Italian</div></Link>
      </div>
      </div>
    </div>
  )
}

export default CourseLang