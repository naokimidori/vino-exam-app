/**
 * 课程相关的切片
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/utils/http';
import type { AxiosRes, ResData } from '@/utils/http';
import { RootState } from '../index';

// 单个课程类型
export type LessonType = {
  title: string;
  value: string;
  children: LessonType[];
};

const initialState = {
  subjectTree: [], // 课程树结构
  lessonList: [], // 课程列表
  activeTwo: {
    title: '',
    value: '',
  }, // 二级分类信息
};

// 获取课程树状数据
export const getSubjectTree = createAsyncThunk(
  'get/subjectTree',
  async (action, state) => {
    const res: AxiosRes<ResData> = await http.get('/api/subject/tree');
    return res.data.data;
  }
);

// 获取课程数据
export const getLessonList = createAsyncThunk(
  'get/lessonList',
  async (action, state) => {
    const res: AxiosRes<ResData> = await http.get('/api/subject');
    return res.data.data;
  }
);

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setActiveTwo: (state, action) => {
      state.activeTwo = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSubjectTree.fulfilled, (state, res) => {
        state.subjectTree = res.payload;
      })
      .addCase(getLessonList.fulfilled, (state, res) => {
        state.lessonList = res.payload;
      });
  },
});

// 导出state
export const selectSubjectTree = (state: RootState) =>
  state.subject.subjectTree;
export const selectActiveTwo = (state: RootState) => state.subject.activeTwo;
export const lessonList = (state: RootState) => state.subject.lessonList;

// 导出action
export const { setActiveTwo } = subjectSlice.actions;

export default subjectSlice.reducer;
