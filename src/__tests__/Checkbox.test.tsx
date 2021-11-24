import React from 'react'
import {Checkbox} from '..'
import {behavesAsComponent, checkExports} from '../utils/testing'
import {render, cleanup} from '@testing-library/react'
import {toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    cleanup()
  })
  behavesAsComponent({Component: Checkbox})

  checkExports('Checkbox', {
    default: Checkbox
  })

  it('renders a valid checkbox input', () => {
    const {getByRole} = render(<Checkbox />)

    const checkbox = getByRole('checkbox')

    expect(checkbox).toBeDefined()
  })

  it('renders an unchecked checkbox by default', () => {
    const {getByRole} = render(<Checkbox />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)
  })

  it('renders an active checkbox when checked attribute is passed', () => {
    const handleChange = jest.fn()
    const {getByRole} = render(<Checkbox checked onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(true)
  })

  it('accepts a change handler that can alter the checkbox state', () => {
    const handleChange = jest.fn()
    const {getByRole} = render(<Checkbox onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)

    userEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
    expect(checkbox.checked).toEqual(true)

    userEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
    expect(checkbox.checked).toEqual(false)
  })

  it('renders an indeterminate prop correctly', () => {
    const handleChange = jest.fn()
    const {getByRole} = render(<Checkbox indeterminate checked onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.indeterminate).toEqual(true)
    expect(checkbox.checked).toEqual(false)
  })

  it('renders an inactive checkbox state correctly', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Checkbox disabled onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.disabled).toEqual(true)
    expect(checkbox.checked).toEqual(false)
    expect(checkbox).toHaveAttribute('aria-disabled', 'true')

    userEvent.click(checkbox)

    expect(checkbox.disabled).toEqual(true)
    expect(checkbox.checked).toEqual(false)
    expect(checkbox).toHaveAttribute('aria-disabled', 'true')

    // remove disabled attribute and retest
    rerender(<Checkbox onChange={handleChange} />)

    expect(checkbox).toHaveAttribute('aria-disabled', 'false')
  })

  it('renders an uncontrolled component correctly', () => {
    const {getByRole} = render(<Checkbox defaultChecked />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(true)

    userEvent.click(checkbox)

    expect(checkbox.checked).toEqual(false)
  })

  it('renders an aria-checked attribute correctly', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Checkbox checked={false} onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    rerender(<Checkbox checked={true} onChange={handleChange} />)

    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    rerender(<Checkbox indeterminate checked onChange={handleChange} />)

    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('renders an invalid aria state when validation prop indicates an error', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Checkbox onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox).toHaveAttribute('aria-invalid', 'false')

    rerender(<Checkbox onChange={handleChange} validationStatus="success" />)

    expect(checkbox).toHaveAttribute('aria-invalid', 'false')

    rerender(<Checkbox onChange={handleChange} validationStatus="error" />)

    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders an aria state indicating the field is required', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Checkbox onChange={handleChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    expect(checkbox).toHaveAttribute('aria-required', 'false')

    rerender(<Checkbox onChange={handleChange} required />)

    expect(checkbox).toHaveAttribute('aria-required', 'true')
  })
})
