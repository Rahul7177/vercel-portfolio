import Link from 'next/link'
import React from 'react'
import "../style/Email.css"

const Email = () => {
  return (
    <div className='email fixed bottom-0 -right-6 hidden md:flex flex-col gap-16'>
        <Link href="mailto:rahulr7177@gmail.com" className='email-link rotate-90 decoration-0 font-firacode text-sm tracking-wide p-0 py-4 outline-2 outline-dashed outline-transparent mb-6'>
            rahulr7177@gmail.com
        </Link>
    </div>
  )
}

export default Email
