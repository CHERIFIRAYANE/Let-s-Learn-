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
const OnlineSessions = () => {
  const location = useLocation();
  const UserEmail = location.state
 
  const sessions = [
    {
      id: 1,
      name: 'Yasmine HABI',
      href: '#',
      imageSrc: prof4,
      imageAlt: "Front of men's Basic Tee in black.",
      time: '14h30',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'English',
    },
    {
      id: 2,
      name: 'Wail BOUGUERRA',
      href: '#',
      imageSrc: prof2,
      imageAlt: "",
      time: '08h30',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'French',
    },
    {
      id: 3,
      name: 'Amel SADOUN',
      href: '#',
      imageSrc: prof3,
      imageAlt: "",
      time: '00h00',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'Spanish',
    },
    {
      id: 4,
      name: 'Rayane CHERIFI',
      href: '#',
      imageSrc: prof1,
      imageAlt: "",
      time: '15h30',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'English',
    },
    {
      id: 5,
      name: 'Mounia HADJEBAR',
      href: '#',
      imageSrc: prof5,
      imageAlt: "",
      time: '19h00',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'English',
    },
    {
      id: 6,
      name: 'Meroua REZIG',
      href: '#',
      imageSrc: prof6,
      imageAlt: "",
      time: '13h00',
      title: 'Enseignant passionné et expérimenté avec une solide expertise dans lenseignement du français en tant que langue étrangère',
      langue: 'French',
    },
    // More products...
  ]
  
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
  const postData = async (link) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-email/', {
        to: UserEmail,
        subject: 'SpeaKifi',
        message:link
        // Other fields...
      });
      // Perform actions with the response data if needed
    } catch (error) {
      console.error('Error during POST request:', error);
      // Handle errors or show error messages
    };
  }
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide message after 3 seconds
  };
  const buttonClickHandler = (link,Full_reserved) => {
    if (!Full_reserved) {
      postData(link);
      showMessage('We just send you an email with the link meet');
    } else {
      console.log('Message is fully reserved');
      // Optionally show a message indicating that the message is fully reserved
    }

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
                {!meet.Full_reserved ? (
                 <button className='border-2  w-full rounded hover:border-custom hover:bg-custom hover:text-white transition-all duration-300'
                 onClick={() => buttonClickHandler(meet.link,meet.Full_reserved)}>
                         Subscribe
                 </button>
                       ) : (
                        <button className='border-2 w-full rounded cursor-not-allowed opacity-50 bg-gray-300' disabled>Full_reserved</button>
                      )}
                       {message && <p>{message}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineSessions;

