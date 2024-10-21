import './footer.css'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <section className="footer">
        <div className="box-container">
            <div className="box">
                <h3>quick links</h3>
                <Link className='link1'>Home</Link>
                <Link className='link1'>Course path</Link>
                <Link className='link1'>Test lvl</Link>
                <Link className='link1'>Articles</Link>
                <Link className='link1'>Online Sessions</Link>
                <Link className='link1'>Chat with Ai</Link>
            </div>
            <div className="box">
                <h3>extra links</h3>
                <Link className='link1'>my account</Link>
                <Link className='link1'>my orders</Link>
                <Link className='link1'>my favorite</Link>
            </div>
            <div className="box">
                <h3>locations</h3>
                <Link className='link1'>algeria</Link>
                <Link className='link1'>usa</Link>
                <Link className='link1'>uk</Link>
                <Link className='link1'>china</Link>
            </div>
            <div className="box">
                <h3>contact info</h3>
                <Link className='link1'>+123 13 63 11 34</Link>
                <Link className='link1'>SpeaKfy@gmail.com</Link>
                <Link className='link1'>uk-brave street - 2345</Link>
                <div className='payimg'></div>
            </div>
        </div>
        <div className="credit">@all rights reserved</div>
    </section>
    </div>
  )
}

export default Footer