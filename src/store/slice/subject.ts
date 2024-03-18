/**
 * 课程相关的切片
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/utils/http'
import type { AxiosRes, ResData } from '@/utils/http'

const initialState = {
  subjectTree: [], // 课程树结构
  activeTwo: {}, // 二级分类信息
};

// 获取课程数据
export const getSubjectTree = createAsyncThunk('get/subjectTree', async (action, state) => {
  const res: AxiosRes<ResData> = await http.get('/api/subject');
  return res.data.data; 
});

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSubjectTree.fulfilled, (state, action) => {
      console.log('state', state, action);
      
      state.subjectTree = action.payload;
    })
  }
});

export default subjectSlice.reducer;
