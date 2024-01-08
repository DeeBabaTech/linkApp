import React, { useEffect, useState } from 'react'
import Preview from '../../components/Preview'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'
import { useThunk } from './../../hooks/use-thunk'
import dP from './../../assets/images.png'
import axios from 'axios'
import { fetchForms, fetchProfile } from '../../store'
import { useNavigate } from 'react-router'

function Profile() {
  const [fetchingProfile] = useThunk(fetchProfile)
  const [fetchingForms] = useThunk(fetchForms)
  const navigate = useNavigate()

  useEffect(() => {
    fetchingProfile()
    fetchingForms()
  }, [])

  const { info } = useSelector(state => {
    return state.profile
  })

  const { data } = useSelector(state => {
    return state.forms
  })


  const [image, setImage] = useState(dP)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const { firstName, lastName, email } = profileData

  const handleChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const newProfile = {
    firstName,
    lastName,
    email
  }


  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(newProfile)
    await axios.put('http://localhost:3005/profile/1', body, config)
    navigate('/preview')
  }

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setImage(storedImageUrl);
    }
  }, []);

  const imageChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataURL = reader.result
      setImage(dataURL)
      localStorage.setItem("uploadedImageUrl", dataURL)
    }
    reader.readAsDataURL(e.target.files[0])
  }


  return (
    <div className='w-11/12 m-auto flex justify-between h-fit'>
      <Preview data={data} info={newProfile} image={image} />
      <div className='md:w-[57%] bg-white md:px-7 px-5 md:py-10 py-5 rounded-lg'>
        <div className="font-bold text-3xl">
          Profile Details
        </div>
        <p className='text-slate-500 my-2'>
          Add your details to create a personal touch to your profile.
        </p>
        <form className='text-slate-600' onSubmit={handleSubmit}>
          <div className="md:flex items-center justify-between rounded-lg bg-slate-100 py-5 px-4 mb-5">
            <div className="md:w-2/5 mb-3 md:mb-0">Profile Picture</div>
            <label htmlFor='dPic' className='w-[30%] relative md:flex items-center font-semibold text-slate-400'>
              <div className="w-full">
                <img src={image} alt="display picture" className='mr-5 w-48 h-48 rounded-lg' />
                <div className="opacity-0 hover:opacity-70 absolute top-0 h-full w-48 bg-slate-400 text-white text-center pt-20 rounded-lg"> +Upload your <br /> image here </div>
              </div>
              <input
                type="file"
                id='dPic'
                name='dPic'
                accept='.jpg, .jpeg, .png'
                className='hidden'
                onChange={imageChange}
              />
            </label>
            <div className="md:w-[30%] mt-3 md:mt-0">Images must be in jpg, jpeg or png format</div>
          </div>
          <div className="bg-slate-100 rounded-lg py-5 px-4">
            <div className="md:flex justify-between items-center mb-2">
              <label htmlFor="firstName">First Name</label> <br />
              <input type="text" name="firstName" id="firstName" value={firstName} onChange={handleChange}
                className='md:w-3/5 w-full mt-2 md:mt-0 outline outline-slate-200 rounded-lg focus:outline-[#613cfc] p-2'
                required
              />
            </div>
            <div className="md:flex justify-between items-center mb-2">
              <label htmlFor="lastName">Last Name </label> <br />
              <input type="text" name="lastName" id="lastName" value={lastName} onChange={handleChange}
                className='md:w-3/5 w-full mt-2 md:mt-0 outline outline-slate-200 rounded-lg focus:outline-[#613cfc] p-2'
                required
              />
            </div>
            <div className="md:flex justify-between items-center">
              <label htmlFor="email">Email </label> <br />
              <input type="email" name="email" id="email" value={email} onChange={handleChange}
                className='md:w-3/5 w-full mt-2 md:mt-0 outline outline-slate-200 rounded-lg focus:outline-[#613cfc] p-2'
                required
              />
            </div>

          </div>
          <div className="flex justify-end mr-5 mt-5 w-full mx-auto">
            <button type="submit" className="bg-[#613cfc] w-full md:w-fit text-white py-3 px-5 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile