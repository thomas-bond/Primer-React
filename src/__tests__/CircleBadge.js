/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import CircleBadge from '../CircleBadge'
import {render, rendersClass, mount} from '../utils/testing'

const imgOutput = <img className="CircleBadge-icon" alt="" src="primer.jpg" />
const imgInput = <img alt="" src="primer.jpg" />

describe('CircleBadge', () => {
  xit('is a system component', () => {
    expect(CircleBadge.systemComponent).toEqual(true)
  })

  it('renders medium by default', () => {
    expect(rendersClass(<CircleBadge />, 'CircleBadge--medium')).toEqual(true)
  })

  it('respects "is" prop', () => {
    expect(
      render(
        <CircleBadge is="a" href="https://github.com">
          {imgInput}
        </CircleBadge>
      )
    ).toEqual(
      render(
        <a className="CircleBadge CircleBadge--medium" href="https://github.com">
          {imgOutput}
        </a>
      )
    )
  })

  it('applies title', () => {
    expect(
      render(
        <CircleBadge is="a" title="primer logo">
          {imgInput}
        </CircleBadge>
      ).props['title']
    ).toEqual('primer logo')
  })

  it('adds bg class', () => {
    expect(rendersClass(<CircleBadge bg="blue" />, 'bg-blue')).toEqual(true)
  })

  it('adds CircleBadge-icon class to children', () => {
    const comp = mount(<CircleBadge>{imgInput}</CircleBadge>)
    expect(comp.find('img').hasClass('CircleBadge-icon')).toEqual(true)
  })

  it('does not duplicate "CircleBadge-icon" classes', () => {
    const comp = mount(
      <CircleBadge>
        <img className="CircleBadge-icon" alt="" src="primer.jpg" />
      </CircleBadge>
    )
    expect(comp.find('img').props().className).toEqual('CircleBadge-icon')
  })

  it('preserves child class names', () => {
    const comp = mount(
      <CircleBadge>
        <img className="primer" alt="" src="primer.jpg" />
      </CircleBadge>
    )
    expect(comp.find('img').hasClass('primer')).toEqual(true)
  })
})
