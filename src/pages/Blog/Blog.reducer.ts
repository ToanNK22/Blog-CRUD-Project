import { PayloadAction, createAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { initialBlogList } from 'constants/Blog.constants'
import { Blog } from 'types/Blog.types'
interface BlogState {
  blogList: Blog[]
  editingPost: Blog | null
}
const initialState: BlogState = {
  blogList: initialBlogList,
  editingPost: null
}

// export const createPost = createAction('blog/createPost', function prepare(newBlog: Blog) {
//   return {
//     payload: {
//       ...newBlog,
//       id: nanoid()
//     }
//   }
// })
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditingPost = createAction<string>('blog/startEditingPost')
// export const updatePost = createAction<Blog>('blog/updatePost')
// export const cancelEditing = createAction('blog/cancelEditing')

const blogSlice = createSlice({
  name: 'blogHandling',
  initialState,
  reducers: {
    createPost: {
      reducer: (state, action: PayloadAction<Blog>) => {
        state.blogList.push(action.payload)
      },
      prepare(newBlog: Omit<Blog, 'id'>) {
        return {
          payload: {
            ...newBlog,
            id: nanoid()
          }
        }
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const deletedId = action.payload
      const foundIndex = state.blogList.findIndex((blog) => blog.id === deletedId)
      if (foundIndex !== -1) {
        state.blogList.splice(foundIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const editingId = action.payload
      const foundBlog = state.blogList.find((blog) => blog.id === editingId)
      if (foundBlog) {
        state.editingPost = foundBlog
      }
    },
    updatePost: (state, action: PayloadAction<Blog>) => {
      const updateId = action.payload.id
      const foundIndex = state.blogList.findIndex((blog) => blog.id === updateId)
      state.blogList[foundIndex] = action.payload
      state.editingPost = null
    },
    cancelEditing: (state) => {
      state.editingPost = null
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(createPost, (state, action) => {
  //     state.blogList.push(action.payload)
  //   })
  //   builder.addCase(deletePost, (state, action) => {
  //     const deletedId = action.payload
  //     const foundIndex = state.blogList.findIndex((blog) => blog.id === deletedId)
  //     if (foundIndex !== -1) {
  //       state.blogList.splice(foundIndex, 1)
  //     }
  //   })
  //   builder.addCase(startEditingPost, (state, action) => {
  //     const editingId = action.payload
  //     const foundBlog = state.blogList.find((blog) => blog.id === editingId)
  //     if (foundBlog) {
  //       state.editingPost = foundBlog
  //     }
  //   })
  //   builder.addCase(updatePost, (state, action) => {
  //     const updateId = action.payload.id
  //     const foundIndex = state.blogList.findIndex((blog) => blog.id === updateId)
  //     state.blogList[foundIndex] = action.payload
  //     state.editingPost = null
  //   })
  //   builder.addCase(cancelEditing, (state, action) => {
  //     state.editingPost = null
  //   })
  // }
})

export const { createPost, deletePost, startEditingPost, updatePost, cancelEditing } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer

// export const blogReducer = createReducer(initialState, (builder) => {
//   builder.addCase(createPost, (state, action) => {
//     state.blogList.push(action.payload)
//   })
//   builder.addCase(deletePost, (state, action) => {
//     const deletedId = action.payload
//     const foundIndex = state.blogList.findIndex((blog) => blog.id === deletedId)
//     if (foundIndex !== -1) {
//       state.blogList.splice(foundIndex, 1)
//     }
//   })
//   builder.addCase(startEditingPost, (state, action) => {
//     const editingId = action.payload
//     const foundBlog = state.blogList.find((blog) => blog.id === editingId)
//     if (foundBlog) {
//       state.editingPost = foundBlog
//     }
//   })
//   builder.addCase(updatePost, (state, action) => {
//     const updateId = action.payload.id
//     const foundIndex = state.blogList.findIndex((blog) => blog.id === updateId)
//     state.blogList[foundIndex] = action.payload
//     state.editingPost = null
//   })
//   builder.addCase(cancelEditing, (state, action) => {
//     state.editingPost = null
//   })
// })
