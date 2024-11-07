// 'use client';

// import { useRouter } from 'next/navigation';

// export default function BlogUpdateButton() {
//   const router = useRouter();

//   const handleUpdateClick = () => {
//     router.push('/update');
//   };

//   return (
   
//     <button type="button" onClick={handleUpdateClick}  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create New Blog Post</button>
//   );
// }

import { useState } from 'react';
import axios from 'axios';

export default function UpdateBlogButton({ blogId, initialData, onUpdate }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      // Make a PUT request to update blog details on the server
      const response = await axios.put(`/api/blogs/${blogId}`, {
        title,
        category,
        description,
      });
      
      // If successful, invoke the callback to refresh data or UI
      if (response.status === 200) {
        onUpdate();  // Refresh the blog list or data on the page
        alert("Blog updated successfully");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h3>Update Blog Details</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? 'Updating...' : 'Update Blog'}
      </button>
    </div>
  );
}