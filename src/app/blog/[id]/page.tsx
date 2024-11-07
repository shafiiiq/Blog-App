"use client"

import Post from '@/app/components/Post'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function BlogDetails({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any>({})
    const router = useRouter()

    useEffect(() => {
        fetchBlogData()
    }, [params.id])

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`http://localhost:3003/api/blog/blogs/${params.id}`)
            const blogData = await response.json()
            setData(blogData)
        } catch (error) {
            console.error('Error fetching blog data:', error)
        }
    }

    const handleUpdate = (id: number) => {
        router.push(`/blog/update/${id}`)
    }

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:3003/api/blog/blogs/${id}`, {
                method: 'DELETE'
            })
            router.push('/blog') // Redirect to blog list after deletion
        } catch (error) {
            console.error('Error deleting blog:', error)
        }
    }

    if (!data || Object.keys(data).length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <Post 
                    key={data._id} 
                    post={{
                        title: data.title,
                        body: data.description,
                        id: data.id,
                        category: data.category
                    }}
                />
            </div>
            <button
                type="button"
                onClick={() => handleUpdate(data._id)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Update blog
            </button>
            <button
                type="button"
                onClick={() => handleDelete(data._id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                Delete blog
            </button>
        </div>
    )
}

export default BlogDetails