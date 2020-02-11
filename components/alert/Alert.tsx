import * as React from 'react';
import classNames from 'classnames'
import './style/index'

class Alert extends React.Component<AlertProps,AlertState>  {
  state = { visible: true }
  static defaultProps = {
    prefixCls: 'hi-alert',
    type: 'info',
    closeable: true,
    duration: null
  }
  timeoutId :number
  componentDidMount () {
    if (this.props.duration !== null) {
    this.timeoutId = window.setTimeout(() => {
        this.handleClose()
      }, this.props.duration)
    }
  }
  componentWillUnmount () {
    clearTimeout(this.timeoutId)
  }
  handleClose () {
    this.setState({ visible: false })
    this.props.onClose && this.props.onClose()
  }
  render () {
    let classnames = classNames(this.props.prefixCls, this.state.visible, this.props.type, {
      noTitle: !this.props.title
    })
    let _type :string = 'tishi'

    switch (this.props.type) {
      case 'warning':
        _type = 'jinggao'
        break
      case 'error':
        _type = 'shibai'
        break
      case 'success':
        _type = 'chenggong'
        break
      default:
        _type = 'tishi'
    }

    return (
      this.state.visible && (
        <div className={classnames}>
          <div className='hi-icon__title'>
            <i className={`hi-icon icon-${_type}`} />
            {this.props.title && <div className='text-title'>{this.props.title}</div>}
          </div>
          {this.props.content && <div className='text-message'>{this.props.content}</div>}
          {this.props.closeable && (
            <div className='close-btn icon-img-delete' onClick={this.handleClose.bind(this)}>
              <i className='hi-icon icon-close' />
            </div>
          )}
        </div>
      )
    )
  }
}

export interface AlertProps {
    type ?: 'info' | 'error' |  'success' | 'warning';
    onClose ?: () => void;
    content ?: React.ReactNode;
    title ?: React.ReactNode;
    closeable ?: boolean;
    duration ?: number | null;
    prefixCls ?: 'hi-alert';
}
export interface AlertState {
    visible : boolean
}

export default Alert
