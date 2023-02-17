import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import axios from './api/posts';
import { useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';

const Postpage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  const navigate = useNavigate();
  

  const handleDelete = async(id) => {
    try {
      await axios.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList)
      navigate('/')
    } catch (err){
      console.log(err.message)
    }
  }

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editPostButton'>Edit Post</button></Link>
            <button className='deletePostButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post && 
          <>
            <p>Post not Found!</p>
            <Link to={'/'}>Visit our Homepage</Link>
          </>
        }
      </article>
    </main>
  )
}

export default Postpage