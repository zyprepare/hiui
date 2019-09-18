import React, { Component } from 'react'
import Icon from '../icon'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

export default class Notice extends Component {
  state = { open: false }
  openTimer = null
  closeTimer = null
  componentDidMount () {
    this.setState({
      open: true
    })
    if (this.props.duration !== null) {
      this.openTimer = setTimeout(() => {
        this.setState({ open: false })
      }, this.props.duration || 3000)
    }
  }
  componentWillUnmount () {
    clearTimeout(this.openTimer)
    clearTimeout(this.closeTimer)
  }
  closeNotice = e => {
    if (e) {
      e.stopPropagation()
    }
    this.props.onClose(this.props.id)
  }

  render () {
    const { closeable, children, prefix, type } = this.props
    const { open } = this.state
    return (
      <CSSTransition
        in={open}
        timeout={0}
        classNames={`hi-${prefix}`}
        onExited={() => {
          this.closeTimer = setTimeout(() => this.closeNotice(), 300)
        }}
      >
        <div className={classNames(`hi-${prefix}`, { [`hi-${prefix}--${type}`]: type })}>
          <div className={`hi-${prefix}__content--wrapper`}>{children}</div>
          {closeable && (
            <span
              onClick={() => {
                this.setState({ open: false })
              }}
            >
              <Icon className={`hi-${prefix}__closer`} name='close' />
            </span>
          )}
        </div>
      </CSSTransition>
    )
  }
}
