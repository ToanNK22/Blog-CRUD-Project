import React from 'react'
import CreatePost from './components/CreatePost'
import BlogList from './components/BlogList'

export default function Blog() {
  return (
    <div className='p-5'>
      <CreatePost />
      <BlogList />
    </div>
  )
}
