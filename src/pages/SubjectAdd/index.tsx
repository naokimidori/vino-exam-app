import { AppDispatch } from '@/store';
import { getSubjectTree } from '@/store/slice/subject';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function SubjectAdd() {
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSubjectTree());
  }, []);

  return (
    <h1>subject add</h1>
  );
}

export default SubjectAdd;
