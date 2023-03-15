import React, {FC} from 'react';
import {TodoEditorHeader} from "../TodoEditorHeader";
import {TodoEditorTextarea} from "../TodoEditorTextarea";

const TodoEditor: FC = () =>
  <>
    <TodoEditorHeader/>
    <TodoEditorTextarea/>
  </>

export default TodoEditor;
