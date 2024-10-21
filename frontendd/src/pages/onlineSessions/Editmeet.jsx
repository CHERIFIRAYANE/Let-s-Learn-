import {React, useState } from 'react'
import axios from 'axios';

export default function Editmeet() {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        date: '',
        time: '',
        link: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        postmeet();
        console.log(formData);
      };
      const formatDateTime = (date, time) => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        
        // Create a new Date object with the provided date and time
        const dateTime = new Date(year, month - 1, day, hour, minute);
        
        // Get ISO 8601 string format with UTC timezone
        const isoDateTime = dateTime.toISOString();
        
        return isoDateTime;
      };
      const postmeet = (id) => {
        const isoDateTime = formatDateTime(formData.date, formData.time);
        axios.patch(`http://127.0.0.1:8000/api/meet/${id}`, {
          title: formData.title,
          meeting_time: isoDateTime,
          link: formData.link,
          teacher:formData.email ,
        })
          .then(response => {
            // Handle successful update
            console.log('Meet edited:', response.data);
          })
          .catch(error => {
            console.error('Error editing the meet:', error);
          });
      };
  return (
    <div className="container mxauto mt-5 mb-10 h-full ">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
      <h2 className="text-2xl mb-4 font-bold">Teacher Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your session title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
         Link
       </label>
  <input
    type="text"
    id="link"
    name="link"
    value={formData.link}
    onChange={handleChange}
    placeholder="Enter your session link"
    className="w-full p-2 border border-gray-300 rounded"
    required
  />
</div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Enter your session date"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      <button
        onClick={postmeet(formData.id)}
        type="submit"
        className="bg-custom text-white p-2 w-full rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-custom"
      >
        Submit
      </button>
    </form>
  </div>
  )
}
