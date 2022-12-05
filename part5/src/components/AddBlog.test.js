import React from 'react'
import { render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlog from './AddBlog'
test('updates parent state and calls handler onSubmit', () => {
    const addHandler = jest.fn()

    const component = render(<AddBlog addHandler={addHandler} />)
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#addblog')

    fireEvent.change(title, {
      target: { value: 'test form' },
    })
    fireEvent.change(author, {
      target: { value: 'test author' },
    })
    fireEvent.change(url, {
      target: { value: 'test url' },
    })
    fireEvent.submit(form)
    expect(addHandler.mock.calls).toHaveLength(1)

    // with the right data
    expect(addHandler.mock.calls[0][0].title).toBe('test form')
    expect(addHandler.mock.calls[0][0].author).toBe('test author')
    expect(addHandler.mock.calls[0][0].url).toBe('test url')
  })