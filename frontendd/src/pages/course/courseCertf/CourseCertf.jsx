import { useReducer, useState } from 'react'

import './courseCertf.scss'
import Modal from './modal/Modal'
import Certificate from './Certificate/Certificate'

const initialState = {
  name: 'Wail Bouguerra',
  course: 'French Certificate',
  dateOfConductStart: '2023-11-20',
  dateOfConductEnd: new Date().toISOString().split('T')[0],
  signature: '',
  signatureDetails: 'CEO, SpeaKify',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, [action.field]: action.payload }

    default:
      break
  }
}

const CourseCertf = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [formState, dispatch] = useReducer(reducer, initialState)

  const handleSubmitForm = e => {
    e.preventDefault()
    const { name, course, dateOfConductStart, dateOfConductEnd, signatureDetails } = formState

    if (name && course && dateOfConductStart && dateOfConductEnd && signatureDetails) {
      setIsOpenModal(true)
    } else {
      alert('Please fill all details')
    }
  }

  const handleTextChange = e => {
    dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: e.target.value })
  }

  return (
    <>
      <div className='wrapper'>
        <div className='container'>
          <form onSubmit={handleSubmitForm}>
            <div className='inputGroup'>
              <label htmlFor='user-name'>Name</label>
              <input type='text' name='name' value={formState.name} onChange={handleTextChange} id='user-name' />
            </div>

            <div className='inputGroup'>
              <label htmlFor='course'>Course</label>
              <input readOnly type='text' name='course' value={formState.course} onChange={handleTextChange} id='course' />
            </div>

            <div className='inputGroup'>
              <label htmlFor='dateOfConductStart'>Date of Conduct - Start</label>
              <input
                type='date'
                value={formState.dateOfConductStart}
                onChange={handleTextChange}
                name='dateOfConductStart'
                id='dateOfConductStart'
              />
            </div>

            <div className='inputGroup'>
              <label htmlFor='dateOfConductEnd'>Date of Conduct - End</label>
              <input
                readOnly
                type='date'
                value={formState.dateOfConductEnd}
                onChange={handleTextChange}
                name='dateOfConductEnd'
                id='dateOfConductEnd'
              />
            </div>

            <div className='inputGroup'>
              <label htmlFor='signatureDetails'>Signature Details</label>
              <input
              readOnly
                type='text'
                name='signatureDetails'
                value={formState.signatureDetails}
                onChange={handleTextChange}
                id='signatureDetails'
              />
            </div>

            <button className='btncrt' type='submit'>Generate Certificate</button>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
        <Certificate {...formState} />
      </Modal>
    </>
  )
}


export default CourseCertf