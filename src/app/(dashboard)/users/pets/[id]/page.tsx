'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useParams, useRouter } from "next/navigation";
import { petMockData } from "@/mockdata";
import PetInfo from '../components/PetInfo';
import { usePet } from '@/hooks/usePets';

export default function page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = usePet(id);

  const petInfo = data?.data;


  // const pet = petMockData.find((p) => p.id === id);
  // if (!pet) {
  //   return <p className="text-red-500">Pet not found.</p>;
  // }
  return (
    <div className='px-10'>
      <div className='mb-6'>
        <button
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            pet details
          </h1>
          
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
                <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-4">
                  <p className="text-deepblue font-bold">Overview</p>
                  <div className="grid grid-cols-3 gap-4 text-[14px]">
                    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                      <p className="font-bold text-deepblue text-[24px]"></p>
                      <p>Total Points</p>
                    </div>
                    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                      <p className="font-bold text-deepblue text-[24px]"></p>
                      <p>Days Streak</p>
                    </div>
                    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 text-center items-center">
                      <p className="font-bold text-deepblue text-[24px]"></p>
                      <p>Badges</p>
                    </div>
                  </div>
                </div>
                
                <PetInfo petInfo={petInfo} />

              </div>
    </div>
  )
}
