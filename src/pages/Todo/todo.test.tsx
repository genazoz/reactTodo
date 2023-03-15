import '@testing-library/jest-dom'
import {cleanup, fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {createReduxStore} from "../../app/store";
import userEvent from "@testing-library/user-event";
import {TodosList} from "../../components/TodosList";
import TodoEditor from "../../components/TodoEditor";
import {Sidebar} from "../../components";
import Todo from "./Todo";

const exampleQuery = 'some query...'
const exampleQuery2 = 'edited query...'

describe('Todo editor test', () => {
  afterEach(cleanup)

  test('Add, update and delete todo, when one todo already exist', () => {
    const {getByTestId, getAllByTestId, queryByText} = render(
      <Provider store={createReduxStore({
        todo: {
          todos: [{
            id: '1678887280592',
            status: 'waiting',
            title: 'dgsd',
            text: 'Frontend Todo',
            isEdited: false
          }],
          searchQuery: '',
          editorQuery: ''
        }
      })}>
        <TodoEditor/>
        <TodosList/>
      </Provider>
    )

    const createTodoBtn = getByTestId('create-todo-btn');
    const textarea = getByTestId('todo-editor-textarea');

    expect(getByTestId('create-todo-btn')).toHaveStyle(`pointer-events: none`);

    fireEvent.input(textarea, {
      target: {
        value: exampleQuery
      }
    });

    expect(getByTestId('create-todo-btn')).toHaveStyle(`pointer-events: all`);

    userEvent.click(createTodoBtn);

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent(exampleQuery)

    const createdTodo = getAllByTestId('todo-edit-btn')[0];

    userEvent.click(createdTodo);

    fireEvent.input(textarea, {
      target: {
        value: exampleQuery2
      }
    });

    userEvent.click(createTodoBtn);

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent(exampleQuery2)

    const removeTodoBtn = getAllByTestId('todo-remove-btn')[0];
    userEvent.click(removeTodoBtn);

    expect(queryByText(exampleQuery2)).toBeNull()
  })

  test('Add todo', () => {
    const {getByTestId, getAllByTestId} = render(
      <Provider store={createReduxStore({
        todo: {
          todos: [],
          searchQuery: '',
          editorQuery: ''
        }
      })}>
        <TodoEditor/>
        <TodosList/>
      </Provider>
    )

    const createTodoBtn = getByTestId('create-todo-btn');
    const textarea = getByTestId('todo-editor-textarea');

    expect(getByTestId('create-todo-btn')).toHaveStyle(`pointer-events: none`);

    fireEvent.input(textarea, {
      target: {
        value: exampleQuery
      }
    });

    expect(getByTestId('create-todo-btn')).toHaveStyle(`pointer-events: all`);

    userEvent.click(createTodoBtn);

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent(exampleQuery)
  })

  test('Update todo', () => {
    const {getByTestId, getAllByTestId} = render(
      <Provider store={createReduxStore({
        todo: {
          todos: [{
            id: '1678887280592',
            status: 'waiting',
            title: 'dgsd',
            text: 'Frontend Todo',
            isEdited: false
          }],
          searchQuery: '',
          editorQuery: ''
        }
      })}>
        <TodoEditor/>
        <TodosList/>
      </Provider>
    )

    const createTodoBtn = getByTestId('create-todo-btn');
    const textarea = getByTestId('todo-editor-textarea');
    const updateTodoBtn = getAllByTestId('todo-edit-btn')[0];

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent('dgsd')
    expect(getByTestId('create-todo-btn')).toHaveStyle(`pointer-events: none`);

    userEvent.click(updateTodoBtn);
    fireEvent.input(textarea, {
      target: {
        value: exampleQuery2
      }
    });
    userEvent.click(createTodoBtn);

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent(exampleQuery2)
  })

  test('Remove todo', () => {
    const {getAllByTestId, queryByText} = render(
      <Provider store={createReduxStore({
        todo: {
          todos: [{
            id: '1678887280592',
            status: 'waiting',
            title: 'dgsd',
            text: 'Frontend Todo',
            isEdited: false
          }],
          searchQuery: '',
          editorQuery: ''
        }
      })}>
        <TodoEditor/>
        <TodosList/>
      </Provider>
    )
    const removeTodoBtn = getAllByTestId('todo-remove-btn')[0];

    expect(getAllByTestId('todo-title')[0]).toHaveTextContent('dgsd')

    userEvent.click(removeTodoBtn);

    expect(queryByText('dgsd')).toBeNull()
  })

  test('Should move the sidebar by mouse delta-x', () => {
    const {getByTestId, debug} = render(
      <Provider store={createReduxStore({})}>
        <Todo/>
      </Provider>
    );

    const mouse = {
      clientX: 900
    }

    const sidebarDivider = getByTestId('sidebar-divider')
    const sidebar = getByTestId('sidebar')

    expect(sidebar).toHaveStyle('width: 300px')

    fireEvent.mouseDown(sidebarDivider)
    fireEvent.mouseMove(sidebarDivider, mouse)
    fireEvent.mouseUp(sidebarDivider)

    expect(getComputedStyle(sidebar).width).toBe("900px")

    debug()
  })
})
