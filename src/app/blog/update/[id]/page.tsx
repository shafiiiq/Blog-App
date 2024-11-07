// Mark this component as a Client Component by adding "use client" at the top
'use client';

import { useEffect, useState } from 'react';
import BlogUpdateForm from '../../../components/BlogUpdateForm'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function BlogUpdatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  console.log(router);
  
  const id = useSearchParams();
  console.log( " herddgffdg" +  id);
   // Get the blog post ID from the URL
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // Fetch blog post data using useEffect when the component mounts
  useEffect(() => {


    // const { id } = router.query; // Get the blog post ID from the URL

    if (id) {  // Only fetch if id is available (i.e., the router has initialized)
      const fetchBlogPost = async () => {
        try {
          const response = await fetch('http://localhost:3003/api/blog/blogs/' + params.id);  // Replace with your actual API
          const data = await response.json();

          if (response.ok) {
            setBlogPost(data);
          } else {
            setError(true);
          }
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogPost();
    }
  }, [id]);  // Depend on 'id' to trigger re-fetching when it changes

 // Handle loading and error states
 if (loading) {
  return <div>Loading...</div>;
}

if (error || !blogPost) {
  return <div>Error loading blog post. Please try again later.</div>;
}
  
  
    
  return (
    <div>
      <h1>Update Blog Post</h1>
      {/* Render BlogUpdateForm and pass the fetched blog post as initial data */}
        <BlogUpdateForm initialData={blogPost} /> 
      </div>
    )
  }
