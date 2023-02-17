import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { format } from 'date-fns';
import axios from './api/posts';
import DataContext from './context/DataContext';

const EditPost = () => {
    const { 
        posts, setPosts
    } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(post) {
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [post, setEditBody, setEditTitle])

    const handleEdit = async(id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const editPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await axios.put(`/posts/${id}`, editPost);
          setPosts(posts.map(post => post.id === id ? {...response.data} : post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        } catch (err){
          console.log(err.message);
        }
      }    

  return (
    <main className='NewPost'>
        {editTitle && 
            <>
                <h2>EditPost</h2>
                <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='postTitle'>Title:</label>
                    <input 
                    id="postTitle"
                    type="text"
                    placeholder="Type post title..."
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea 
                    id="postBody"
                    required
                    placeholder="Write something..."
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Post</button>
                </form>
            </>
        }
        {!editTitle &&
        <>
            <h2>Post not found</h2>
            <p>Well, that's disapponting.</p>
            <p>
              <Link to="/">Visit our homepage</Link>
            </p>
        </>
        }
    </main>
  )
}

export default EditPost