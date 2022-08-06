import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    value: 0,
  },
  reducers: {
  },
})

export const {  } = todoSlice.actions

export default todoSlice.reducer
