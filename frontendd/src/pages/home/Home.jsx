import './home.css'
import {AiFillHome} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {TbFreeRights} from 'react-icons/tb'
import {BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import serv1 from '../../assets/service1.jpg'
import serv2 from '../../assets/service2.jpg'
import serv3 from '../../assets/service3.jpg'
import serv4 from '../../assets/service4.jpg'

const Home = () => {
  return (
    <div className='home'>
      {/* banner section start */}
      <section className='banner'>
        <div className='banner-text'>
          <h1><span>SpeaKify</span> is Your Home to Learn and Grow</h1>
          <p>Learn new languages and open up to the world</p>
        </div>
      </section>
      {/* banner section end */}

      {/* feature section start */}
      <section id="feature">
        <div className="title-text">
            <p>Feature</p>
            <h1>Why choose us</h1>
        </div>
        <div className="feature-box">
          <div className="features">
            <h1>E-Learning Study</h1>
            <div className="features-desc">
              <div className="features-icon">
              <AiFillHome className="fa"/>
              </div>
              <div className="features-text">
                <p>We offer the flexibility to learn at your own pace, 
                  accommodating busy schedules and diverse learning styles. </p>
              </div>
            </div>
            <h1>The Best Teachers</h1>
              <div className="features-desc">
                <div className="features-icon">
                <GiTeacher className="fa"/>
                </div>
                <div className="features-text">
                  <p>Our teachers are dedicated and passionate about nurturing students'
                     intellectual growth, creating a vibrant learning environment.  </p>
                </div>
              </div>
                <h1>Free Cost</h1>
                <div className="features-desc">
                  <div className="features-icon">
                  <TbFreeRights className="fa"/>
                  </div>
                  <div className="features-text">
                    <p>Our educational resources are offered entirely free of
                       charge, removing financial barriers to learning for all.  </p>
                  </div>
                </div>
            </div>
            <div className="features-img">
            {/* <img src={tryimg} alt="" /> */}
            </div>
        </div>
    </section>
      {/* feature section end */}

      {/* services section start */}
      <section id="service">
        <div className="title-text">
            <p>Services</p>
            <h1>We Provide Better</h1>
        </div>
        <div className="service-box">
            <div className="single-service p1">
                <img src={serv1}/>
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Fun Learning</h3>
                    <hr/>
                    <p>Our course path has a game style that let our users
                      have fun playing and learning in the same time util they can get thier certificate
                    </p>
                </div>
            </div>
            <div className="single-service p2">
            <img src={serv2}/>
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Chat With Ai</h3>
                    <hr/>
                    <p>We provide an advanced Chat Ai that let our users practise thier
                      skills and what they learned by talking about anything </p>
                </div>
            </div>
            <div className="single-service p3">
            <img src={serv3}/>
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Test Level</h3>
                    <hr/>
                    <p>We provide a test level that users can start to evalute
                      thier level in a certain language to see if they are improving
                    </p>
                </div>
            </div>
            <div className="single-service p4">
            <img src={serv4}/>
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Expert Teachers</h3>
                    <hr/>
                    <p>We provide online sessions with our expert teachers that we have chosen 
                      very carefully so our users can get the best formation </p>
                </div>
            </div>
        </div>
    </section>
      {/* services section end */}


      {/* testimonials section end */}
      <section id="testimonial">
        <div class="title-text">
            <p>testimonial</p>
            <h1>what client says</h1>
        </div>
        <div class="testimonial-row">
            <div class="testimonial-col">
                <div class="user">
                  <div className='userimg1'></div>
                    <div class="user-info">
                        <h4>Wail Boug <BsTwitter className='bi'/> </h4>
                        <small>@wailboug99</small>
                    </div>
                </div>
                <p>
                Your e-learning platform for language learning is a linguistic gem. It offers a wealth of well-structured and comprehensive language courses that empower learners to master new languages with confidence. The immersive experience it provides is simply invaluable. 
            </p></div>
            <div class="testimonial-col">
                <div class="user">
                <div className='userimg2'></div>
                    <div class="user-info">
                        <h4>Jenifer bled<BsTwitter className='bi'/> </h4>
                        <small>@jenife9</small>
                    </div>
                </div>
                <p>
                Navigating your language learning website is a breeze, and the interactive features, like live practice sessions and cultural insights, add a unique layer of authenticity to the learning process. It's evident that your platform is deeply committed to fostering multilingualism and cultural appreciation.  
            </p></div>
            <div class="testimonial-col">
                <div class="user">
                <div className='userimg3'></div>
                    <div class="user-info">
                        <h4>Joan Do<BsTwitter className='bi'/> </h4>
                        <small>@JoanDoo5</small>
                    </div>
                </div>
                <p>
                What distinguishes your language learning website is the caliber of its language instructors. Their proficiency in teaching and their passion for language education shine through in every lesson. I've not only acquired new language skills but also gained rich cultures associated with
            </p></div>

        </div>
    </section>
      {/* testimonials section end */}
    </div>
  )
}

export default Home