import {darkTheme, lightTheme} from "../../themes";
import themeReducer from "./themeSlice";
import {setTheme} from "./themeSlice";

describe('Theme switch test', () => {
  test('Set theme', () => {
    expect(themeReducer({
      theme: darkTheme
    }, setTheme(lightTheme))).toEqual({
      theme: lightTheme
    })
  })
})