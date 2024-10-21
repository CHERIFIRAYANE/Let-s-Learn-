import React, { useState,useEffect } from 'react';
import prof1 from "../../assets/prof1.jpg";
import prof2 from "../../assets/prof2.jpg";
import prof3 from "../../assets/prof3.jpg";
import prof4 from "../../assets/prof4.jpg";
import prof5 from "../../assets/prof5.jpg";
import prof6 from "../../assets/prof6.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const AdDeletemeet = () => {
  const location = useLocation();
  const UserEmail = location.state
 
  
  
  const [showFullText, setShowFullText] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/meets/');
        setData(response.data.Meet);
      } catch (error) {
        // Handle error, e.g., set an error state
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
    
  }, []); 
  const deletemeet = async (ID) => {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/meet/${ID}');
      console.log('id',ID)
    } catch (error) {
      console.error('Error during delete request:', error);
    };
  }
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide message after 3 seconds
  };
  const buttonClickHandler = (ID) => {
    deletemeet(ID)
    };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-12"  style={{ letterSpacing: '0.1em' }}>Online Sessions</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((meet) => (
            <div key={meet.id} className="group relative mb-8">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={meet.teacher.user.profile_image}
                  //alt={ c}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={meet.link}>
                      <span className="font-bold" style={{ letterSpacing: '0.2em' }}>{meet.teacher.user.name} {meet.teacher.user.family_name }</span>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500" onClick={() => setShowFullText(!showFullText)}>
                    {showFullText ? meet.title : `${meet.title.slice(0, 20)}...`}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-700 " style={{ letterSpacing: '0.2em' }}>
                    <FontAwesomeIcon icon={faClock} className="mr-1"  />
                    {new Date(meet.meeting_time).toLocaleString()}
                  </div>
                </div>
                <button className='absolute -mt-16 ml-48 rounded border-1 border-black bg-white text-black px-6 py-2'>{meet.teacher.langue.name}</button>
              </div>
              <div className="mt-4">
                          
                 <button className='border-2  w-full rounded hover:border-custom hover:bg-custom hover:text-white transition-all duration-300'
                 onClick={() => buttonClickHandler(meet.id)}>
                         Delete
                 </button>
                 <a href={`/editmeet/${meet.id}`}>
                 <button
                className='border-2 w-full rounded mt-2 hover:border-custom hover:bg-custom hover:text-white transition-all duration-300'
                 >
                Edit
                </button>
                </a>   
                           
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdDeletemeet;

