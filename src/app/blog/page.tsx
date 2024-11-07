"use client"


import Post from '@/app/components/Post'
import { getBlogData } from '@/app/components/BlogPost';
// import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NewBlogButton from '../components/NewBlogButton';
import { useEffect, useState } from 'react';
// import type { IferGetServerSidePropsType, GetServerSideProps } from 'next'

export default function Blog() {
  const [data, setData] = useState([])
  useEffect(() => {
   fetch('http://localhost:3003/api/blog/blogs')
   .then((res) => res.json())
   .then((data) => setData(data))
  }, [])

 
  return (
    <div className='container mx-auto pt-8'>
      <h1 className='text-2xl mb-5 capitalize'>blogs</h1>
      {/* <button type="button" onClick={handleNewBlogClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Blog</button> */}
      <NewBlogButton />
      <div className="grid grid-cols-4 gap-4">
        {data.map((item: any) => (
          <Post key={item._id}
            post={
              {
                title: item.title,
                body: item.description,
                id: item._id,
                category: item.category
              }
            } />
        ))}
      </div>
    </div>
  )
}






