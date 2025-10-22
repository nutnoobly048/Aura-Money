import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function AccountSetting() {
  return (
        <div className="flex flex-col p-4">
            <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">
            Account Setting
            </h1>
            <div className="flex flex-col p-1 divide-y divide-zinc-300 border-zinc-300 border rounded-2xl">
                <p className="py-6 pl-1.5 flex flex-wrap justify-between items-center">
                Account Picture : <img src="Accset.jpg" className=" aspect-16/10 w-58 rounded-2xl ring-2 ring-offset-2 ring-zinc-300 mr-3 " />
                </p>
                <p className="py-6 pl-1.5 pr-5 flex justify-between items-center ">
                Account Name : อยากได้ทุงทุงซาโฮร
                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer'/>
                </p>
                <p className="py-6 pl-1.5 pr-5 flex justify-between items-center">
                Set priority
                <img src="Star.svg" className='cursor-pointer' />
                </p>
            </div>
        </div>
  )
}

export default AccountSetting