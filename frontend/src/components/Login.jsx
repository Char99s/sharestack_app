import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/favicon.png';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      const { access_token } = tokenResponse;
  
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          try {
            localStorage.setItem('user', JSON.stringify(data));
            console.log(data);
            const { name, id, picture } = data;
            console.log(id);
            console.log(name);
            console.log(picture);
            const doc = {
              _id: id,
              _type: 'user',
              userName: name,
              image: picture,
            };
            client
              .createIfNotExists(doc)
              .then(() => {
                navigate('/', { replace: true });
              })
              .catch(e => console.log(e));
          } catch (error) {
            console.log('Error parsing JSON:', error);
          }
        })
        .catch(error => {
          console.log('Error fetching user info:', error);
        });
    },
  });  

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5 rounded-full'>
            <img src={logo} width='130px' alt='logo' className='rounded-full' />
          </div>

          <div className='shadow-2xl'>
            <button
              type='button'
              className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              onClick={() => login()}
            >
              <FcGoogle className='mr-4' /> Sign in with Google
            </button>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Login