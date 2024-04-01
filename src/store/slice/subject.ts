/**
 * 课程相关的切片
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/utils/http';
import type { AxiosRes, ResData } from '@/utils/http';
import { RootState } from '../index';

// 课程树状类型
export type LessonTreeType = {
  title: string;
  value: string;
  children?: LessonTreeType[];
};

// 单个课程类型
export type LessonType = {
  _id: string;
  create: Date;
  oneId: string;
  oneName: string;
  twoName: string;
};

// 单个题目类型
export type TopicType = {
  title: string;
  desc: string;
  twoId: string;
  _id: string;
  img: string[];
};

// state类型
type SubjectState = {
  /** 课程树结构 */
  subjectTree: LessonTreeType[];
  /** 课程列表 -- 课程管理页用 */
  lessonList: LessonType[];
  /** 题目列表 */
  topicList: TopicType[];
  /** 当前选择的课程 */
  activeLesson: LessonTreeType | null;
  /** 当前选择的题目 */
  activeTopic: TopicType | null;
  /** 考题选择数据 */
  examSelectData: [];
};

const initialState: SubjectState = {
  subjectTree: [],
  lessonList: [],
  topicList: [],
  activeLesson: null,
  activeTopic: null,
  examSelectData: [],
};

// 获取课程树状数据
export const getSubjectTree = createAsyncThunk<LessonTreeType[], void>(
  'get/subjectTree',
  async (action, state) => {
    const res: AxiosRes<ResData> = await http.get('/api/subject/tree');
    return res.data.data;
  }
);

// 获取题目列表
export const getTopicList = createAsyncThunk<TopicType[], string>(
  'get/topicList',
  async (action, state) => {
    const res: AxiosRes<ResData<TopicType[]>> = await http.get(
      `/api/topic/${action}`
    );
    return res.data.data;
  }
);

// 获取课程列表数据
export const getLessonList = createAsyncThunk<LessonType[], void>(
  'get/lessonList',
  async (action, state) => {
    const res: AxiosRes<ResData> = await http.get('/api/subject/two');
    return res.data.data;
  }
);

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setActiveLesson: (state, action) => {
      state.activeLesson = action.payload;
    },
    setActiveTopic: (state, action) => {
      state.activeTopic = action.payload;
    },
    setExamSelectData: (state, action) => {
      state.examSelectData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // 获取课程树状数据fulfilled
      .addCase(getSubjectTree.fulfilled, (state, res) => {
        state.subjectTree = res.payload;
      })
      // 获取题目列表fulfilled
      .addCase(getLessonList.fulfilled, (state, res) => {
        state.lessonList = res.payload;
      })
      // 获取题目列表fulfilled
      .addCase(getTopicList.fulfilled, (state, res) => {
        state.topicList = res.payload;
      });
  },
});


// 获取课程树状数据
export const selectSubjectTree = (state: RootState) =>
  state.subject.subjectTree;
// 获取当前选择的课程
export const selectActiveLesson = (state: RootState) =>
  state.subject.activeLesson;
// 获取课程列表
export const lessonList = (state: RootState) => state.subject.lessonList;
// 获取题目列表
export const selectTopicList = (state: RootState) => state.subject.topicList;
// 获取当前选择的题目
export const selectActiveTopic = (state: RootState) => state.subject.activeTopic;

// 导出action
export const { setActiveLesson, setActiveTopic, setExamSelectData } = subjectSlice.actions;

export default subjectSlice.reducer;
