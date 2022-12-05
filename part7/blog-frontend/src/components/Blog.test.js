import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
test('renders only title and author',() => {
    const blog = {
        title:'Testing Blog',
        author:'Tester',
        url:'tester',
        like:10
    }
    const fn = jest.fn()
    const component = render(
        <Blog blog={blog} reloder={fn}/>
    )
    expect(component.container).toHaveTextContent(
        'Testing Blog Tester'
    )
})
test('view shows url and like',() => {
    const blog = {
        title:'Testing Blog',
        author:'Tester',
        url:'tester',
        like:10
    }
    const fn = jest.fn()
    const component = render(
        <Blog blog={blog} reloder={fn}/>
    )
    const btn = component.getByText('Show')
    fireEvent.click(btn)
    expect(component.container).toHaveTextContent(
        'tester'
    )
    expect(component.container).toHaveTextContent(
        '10'
    )
})