import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className="py-3 px-10 border-b border-[#E1E1E1] flex justify-end">
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    
                      <Image
                      src="/notification.svg"
                      alt="notification icon"
                      width={40}
                      height={40}
                    />
                    
                  </div>
                  <div className="flex gap-2">
                    <Image src="avatar.svg" alt="avatar" width={40} height={40} />
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col text-xs w-[112px]">
                        <p className="font-bold text-deepblue">Einstein O.</p>
                        <p>Admin</p>
                      </div>
                      <button>
                        <Image
                          src="/dropdown.svg"
                          alt="button"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  )
}
