import React from 'react'
import StatCard from './StatCard'

const Post = () => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-3 gap-4'>
            <StatCard title='total posts' value='412' subtitle='last 30 days'/>
            <StatCard title='photos' value='412' subtitle='last 30 days'/>
            <StatCard title='videos' value='412' subtitle='last 30 days'/>
        </div>
        
    </div>
  )
}

export default Post