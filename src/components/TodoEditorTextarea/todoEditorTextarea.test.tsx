import '@testing-library/jest-dom'
import {fireEvent, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TodoEditorTextarea} from "./index";
import {createReduxStore} from "../../app/store";
import {Provider} from "react-redux";

const exampleQuery = 'some query...'
const updatedQuery = '123123'

describe('Todo editor test', () => {
  test('Add todo', () => {
    const {getByTestId} = render(
      <Provider store={createReduxStore({})}>
        <TodoEditorTextarea/>
      </Provider>
    );
    const textarea = getByTestId('todo-editor-textarea');

    expect(textarea).toContainHTML('');

    fireEvent.input(textarea, {
      target: {
        value: exampleQuery
      }
    });
    userEvent.type(textarea, updatedQuery)

    expect(getByTestId('todo-editor-textarea')).toContainHTML(updatedQuery);
  })
})
