
"use client"

import React, { useState } from 'react';
// import { getBlogData } from '';

import { useRouter } from 'next/navigation';
import axios from 'axios';
  

const Blogs = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();
  async function getServerSideProps(context: any) {
    const router = useRouter(); // Access router for potential dynamic routes
    const { params } = context; // Access route parameters for dynamic routes

    // Replace with your actual data fetching logic (e.g., API calls, database queries)
    const blogData = await fetch(`localhost:3003/api/blog/blogs/${params.id}`); // Assuming an API endpoint for blogs
    const data = await blogData.json();

    return {
      props: {
        blogData: data, // Pass the fetched data as props to your component
      },
    };
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      // Send POST request to backend API using axios
      // Implement form submission logic here
      // e.g., send data to your backend API for processing
      const response = await axios.post('http://localhost:3003/api/blog/blogs', {
        title,
        description,
        category,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
    
      // Check if response is successful
      if (response.status === 201) { // Assuming you return a 201 status code for successful creation
        // Clear form fields
        setTitle('');
        setDescription('');
        setCategory('');

        // Redirect to success page
        router.push('/blog'); // Replace with your desired redirect path
      } else {
        console.error('Error creating post:', response.data);
        // Handle errors appropriately
      }
    } catch (error: any) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      // Handle errors appropriately
      
    }
    return (
      <div className="create-post">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Write something Here..."
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option className='bg-gray-100 text-gray-900 
                    block px-4 py-2 text-sm text-gray-700' value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            {/* Add more category options here */}
          </select><br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }
}
export default Blogs