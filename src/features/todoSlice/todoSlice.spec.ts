import todoReducer, {
  addTodo,
  initialState,
  removeTodo, setEditingTodo, setEditQuery,
  setQuery,
  setStatus,
  TodoStatusEnum,
  updateTodo
} from './todoSlice'

const exampleTodo = {
  id: '1',
  status: TodoStatusEnum.WAITING,
  title: 'Заголовок',
  text: "Текст",
  isEdited: true,
};
const exampleTodoChanged = {
  id: '1',
  status: TodoStatusEnum.WAITING,
  title: 'Заголовок 2',
  text: "Текст 2",
  isEdited: true,
};
const exampleQuery = 'some query...'

describe('todos Slice', () => {
  test('Add todo', () => {
    expect(todoReducer(initialState, addTodo({
      todo: exampleTodo
    }))).toEqual({
      ...initialState,
      todos: [exampleTodo],
    })
  })

  test('Update todo', () => {
    expect(todoReducer({
      ...initialState,
      todos: [
        exampleTodo
      ],
    }, updateTodo({
      todo: exampleTodoChanged
    }))).toEqual({
      ...initialState,
      todos: [
        {...exampleTodoChanged, isEdited: false}
      ],
    })
  })

  test('Remove todo', () => {
    expect(todoReducer({
      ...initialState,
      todos: [
        exampleTodo
      ],
    }, removeTodo({
      id: exampleTodo.id
    }))).toEqual(initialState)
  })

  test('Set todo status', () => {
    expect(todoReducer({
      ...initialState,
      todos: [
        exampleTodo
      ],
    }, setStatus({
      id: exampleTodo.id,
      status: TodoStatusEnum.FINISHED
    }))).toEqual({
      ...initialState,
      todos: [
        {
          ...exampleTodo, status: TodoStatusEnum.FINISHED
        }
      ],
    })
  })

  test('Set query', () => {
    expect(todoReducer(initialState, setQuery({
      query: exampleQuery
    }))).toEqual({
      ...initialState,
      searchQuery: exampleQuery,
    })
  })

  test('Set editing todo', () => {
    expect(todoReducer({
      ...initialState,
      todos: [exampleTodo]
    }, setEditingTodo({
      id: exampleTodo.id
    }))).toEqual({
      ...initialState,
      todos: [{...exampleTodo, isEdited: false}]
    })
  })

  test('Set edit query', () => {
    expect(todoReducer(
      initialState,
      setEditQuery({
        query: exampleQuery
      })
    )).toEqual({
      ...initialState,
      editorQuery: exampleQuery
    })
  })
})
