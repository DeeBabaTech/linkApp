import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useThunk } from '../hooks/use-thunk';
import { fetchForms, fetchProfile } from '../store';

function LinkPreview() {

  const [image, setImage] = useState(null)
  const [fetchLinks, loadingLinks] = useThunk(fetchForms)
  const [fetchingProfile] = useThunk(fetchProfile)
  const navigate = useNavigate()

  const { data } = useSelector(state => {
    return state.forms
  })

  const { info } = useSelector(state => {
    return state.profile
  })

  useEffect(() => {
    fetchLinks()
    fetchingProfile()
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setImage(storedImageUrl);
    }
  }, []);


  return (
    <div className='w-full rounded-lg text-sm md:text-base'>
      <div className="h-[50vh] w-full md:bg-[#613cfc] md:p-5 py-2 rounded-b-[3rem]">
        <div className="sticky top-0 flex justify-between items-center md:bg-white p-3 rounded-xl text-sm md:text-base">
          <button onClick={() => navigate(-1)} className='w-[48%] md:w-fit text-center text-[#613cfc] border border-[#613cfc] px-5 py-2 rounded-md'>
            Back to Editor
          </button>
          <div className='w-[48%] md:w-fit text-center text-white bg-[#613cfc] px-5 py-2 rounded-md'>
            Share Link
          </div>
        </div>
      </div>
      <div className=" md:bg-slate-100 md:w-1/4 mx-auto max-h-[80vh] rounded-2xl md:shadow-xl md:-mt-52 -mt-48 py-2 px-4">
        <img src={image} className='md:w-28 md:h-28 w-24 h-24 rounded-full mx-auto mt-5' alt="" />
        {loadingLinks ? <div className="flex justify-center my-5"> <FontAwesomeIcon icon={faSpinner} size='xl' spin /> </div> :
          info.map(data => {
            const fullName = `${data.firstName} ${data.lastName}`
            return (
              <div key={data.id}>
                <div className='md:text-2xl text-xl text-center font-bold mx-auto md:mt-4 mt-2'>
                  {fullName}
                </div>
                <div className='text-center md:mb-5 mb-3 md:text-sm text-xs'>
                  {data.email}
                </div>
              </div>
            )
          })
        }
        <div className="overflow-y-auto md:max-h-[40vh] max-h-[45vh]">
          {loadingLinks ? <div className="flex justify-center my-5"> <FontAwesomeIcon icon={faSpinner} size='xl' spin /> </div> :
            data.map(form => {
              return (
                <div key={form.id} className="px-5 md:mb-3 mb-2 md:w-full w-10/12 mx-auto">
                  <a href={form.link} target='blank'>
                    <div className={`${form.platform} text-white p-3 rounded-md`}>
                      {form.platform}
                      <FontAwesomeIcon icon={faArrowRight} size='xs' style={{ color: "#ffffff", float: 'right', marginTop: '5px', marginRight: '2px' }} />
                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default LinkPreview