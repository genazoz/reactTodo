import '@testing-library/jest-dom'
import {cleanup, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {createReduxStore} from "./app/store";
import App from "./App";
import {MemoryRouter} from "react-router-dom";

const initialState = {
  todo: {
    todos: [],
    searchQuery: '',
    editorQuery: ''
  }
}
const pagesTestId = {
  main: 'main-page',
  notFound: 'not-found-page'
}

describe('App', () => {
  afterEach(cleanup)

  test('Is theme switcher exist', () => {
    const {getByTestId} = render(
      <Provider store={createReduxStore(initialState)}>
        <MemoryRouter initialEntries={['/someroute']}>
          <App/>
        </MemoryRouter>
      </Provider>
    )

    const themeToggleBtn = getByTestId('theme-toggle-btn');

    expect(themeToggleBtn).toBeInTheDocument();
  })

  test('Is "not found" page exist', () => {
    const {getByTestId} = render(
      <Provider store={createReduxStore(initialState)}>
        <MemoryRouter initialEntries={['/someroute']}>
          <App/>
        </MemoryRouter>
      </Provider>
    )

    expect(getByTestId(pagesTestId.notFound)).toBeInTheDocument()
  })

  test('Is "main" page exist', () => {
    const {getByTestId} = render(
      <Provider store={createReduxStore(initialState)}>
        <MemoryRouter initialEntries={['/']}>
          <App/>
        </MemoryRouter>
      </Provider>
    )

    expect(getByTestId(pagesTestId.main)).toBeInTheDocument()
  })
})
