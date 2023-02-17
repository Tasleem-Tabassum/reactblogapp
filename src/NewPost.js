import { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import axios from './api/posts';
import DataContext from './context/DataContext';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody}
    try {
      const response = await axios.post('/posts', newPost)
      const allPosts = [ ...posts, response.data ];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log('Error: ' + err.message);
    }
  }
  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
          id="postTitle"
          type="text"
          placeholder="Type post title..."
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id="postBody"
          required
          placeholder="Write something..."
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </main>
  )
}

export default NewPost