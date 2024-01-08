import React from 'react'

function Loading({ children }) {
    return (
        <div className='fixed bottom-5 -translate-x-1/2 text-slate-100 text-xl bg-slate-600 py-3 px-5 rounded-xl'>
            {children}
        </div>
    )
}

export default Loading