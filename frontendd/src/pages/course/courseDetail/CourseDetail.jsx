import './courseDetail.css'
import vediocourse from "../../../assets/videolesson.mp4"
import CourseText from './courseText/CourseText'
import {Link} from 'react-router-dom'

const CourseDetail = () => {
  return (
    <div className='course-detail'>
        <div className='course-detail-container'>
        <h1>course one : Alphabet and Basic Pronunciation</h1>
        <section className='vedio-course'>
            <video width="100%" height="auto" controls>
                <source src={vediocourse} type="video/mp4"/>
            </video>
        </section>
        <CourseText/>
        <section className='test-course-level'>
          <h1>Take A Quiz Now So YOU Can Go To The Next Level : </h1>
          <Link to='/course/coursequiz' className='btn-quiz'>Take Your Quiz</Link>
        </section>
        </div>
    </div>
  )
}

export default CourseDetail