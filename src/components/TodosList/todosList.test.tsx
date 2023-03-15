import '@testing-library/jest-dom'
import {cleanup, fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {createReduxStore} from "../../app/store";
import {TodosList} from "./index";

const initialState = {
  todo: {
    todos: [
      {
        id: '1',
        status: 'waiting',
        title: 'Beautiful todo',
        text: 'Frontend Todo',
        isEdited: false
      },
      {
        id: '2',
        status: 'waiting',
        title: 'Beautifully todo',
        text: 'Frontend Todo',
        isEdited: false
      },
      {
        id: '3',
        status: 'waiting',
        title: 'Beauty todo',
        text: 'Frontend Todo',
        isEdited: false
      },
      {
        id: '4',
        status: 'waiting',
        title: 'Red todo',
        text: 'Frontend Todo',
        isEdited: false
      },
      {
        id: '5',
        status: 'waiting',
        title: 'Blue todo',
        text: 'Frontend Todo',
        isEdited: false
      }
    ],
    searchQuery: '',
    editorQuery: ''
  }
}

describe('Todos list', () => {
  afterEach(cleanup)

  test('Search todo in list', () => {
    const {getByTestId, getAllByTestId} = render(
      <Provider store={createReduxStore(initialState)}>
        <TodosList/>
      </Provider>
    )

    const searchInput = getByTestId('search-todo-input');

    expect(getAllByTestId('todo')).toHaveLength(5)

    fireEvent.input(searchInput, {
      target: {
        value: 'Beaut'
      }
    });

    expect(getAllByTestId('todo')).toHaveLength(3)
  })

  test('Search for a non-existent todo', () => {
    const {getByTestId, getAllByTestId, queryAllByTestId} = render(
      <Provider store={createReduxStore(initialState)}>
        <TodosList/>
      </Provider>
    )

    const searchInput = getByTestId('search-todo-input');

    expect(getAllByTestId('todo')).toHaveLength(5)

    fireEvent.input(searchInput, {
      target: {
        value: 'dsfgfsd'
      }
    });

    expect(queryAllByTestId('todo')).toHaveLength(0)
  })

  test('Search without existing todos', () => {
    const {getByTestId, queryAllByTestId} = render(
      <Provider store={createReduxStore({
        todo: {
          todos: [],
          searchQuery: '',
          editorQuery: ''
        }
      })}>
        <TodosList/>
      </Provider>
    )

    const searchInput = getByTestId('search-todo-input');

    expect(queryAllByTestId('todo')).toHaveLength(0)

    fireEvent.input(searchInput, {
      target: {
        value: 'dsfgfsd'
      }
    });

    expect(queryAllByTestId('todo')).toHaveLength(0)
  })
})
