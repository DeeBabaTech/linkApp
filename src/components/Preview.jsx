import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Preview({ data, info: { firstName, lastName, email }, image }) {

  const fullName = `${firstName} ${lastName}`

  return (
    <div className='hidden md:block w-5/12 h-[100vh] sticky top-0 bg-white rounded-lg'>
      <div className="w-1/2 mx-auto h-[74vh] rounded-[4rem] outline outline-slate-300 relative mt-10">
        <div className="w-[90%] h-[70vh] rounded-[3.5rem] left-[5%] absolute top-[2vh] outline outline-slate-300">
          <img src={image} className='w-32 h-32 rounded-full mx-auto mt-5' alt="" />
          <div className='text-2xl text-center font-bold mx-auto mt-4'>
            {fullName}
          </div>
          <div className='text-center mb-5 text-sm'>
            {email}
          </div>
          <div className="overflow-y-auto h-2/5">
            {data.map(form => {
              return (
                <div key={form.id} className="px-5 mb-2 w-full">
                  <div className={`${form.platform} text-white p-2 rounded-md`}>
                    {form.platform}
                    <FontAwesomeIcon icon={faArrowRight} size='xs' style={{ color: "#ffffff", float: 'right', marginTop: '5px', marginRight: '2px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview