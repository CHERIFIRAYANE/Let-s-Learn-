import html2canvas from 'html2canvas'
import moment from 'moment'
import '../courseCertf.scss'
import SegCer from './seg2.png'
import { useRef } from 'react'
import jsPDF from 'jspdf'

const Certificate = ({ name, course, dateOfConductStart, dateOfConductEnd, signatureDetails }) => {

    const certificateRef = useRef(null)

    const handleDowloadCertificate = () => {
        html2canvas(certificateRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('l','mm', [1000,670])
            pdf.addImage(imgData, 'PNG',0,0,1000,667)
            pdf.save(`${name.split(' ').join('_')}_certificate`)
        })
        
    }
  return (
    <>
      <div  className='certificateWrapper'>
        <div ref={certificateRef} className='certificateContainer'>
          <div className='logocer'>SpeaKify</div>

          <h1>CERTIFICATE OF APPRECIATION</h1>

          <span className='smallText'>This certificate is proudly awarded to</span>

          <p className='primaryItalicText'>{name}</p>

          <span className='smallText'>for successfully completing the course</span>

          <h2>{course}</h2>

          <span className='smallText'>{`conducted from ${
            dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
          } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>

          <div className='signatureBlock'>
            <img className='signatureImage' src={SegCer} alt='' />

            <span className='horizontalBar' />

            <span className='smallText'>{signatureDetails}</span>
          </div>
        </div>

        <button className='btncrt' onClick={handleDowloadCertificate} style={{ marginTop: '3rem' }}>Download PDF</button>
      </div>
    </>
  )
}

export default Certificate