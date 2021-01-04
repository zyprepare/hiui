import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import EventEmitter from '../_util/EventEmitter'
import Title from './Title'
import Item from './Item'
import SubMenu from './SubMenu'
import './style/index'
class Menu extends Component {
  constructor(props) {
    super(props)
    const { activeId, collapsed } = this.props
    const activeIndex = this.getActiveIndex(activeId)
    let expandIndex = []
    this.clickOutsideHandel = this.clickOutside.bind(this)
    if (this.isNoMiniVertaicalMenu(collapsed)) {
      // 垂直非mini菜单默认打开激活项
      expandIndex = [activeIndex.split('-').slice(0, -1).join('-')]
    }
    this.state = {
      activeId: this.props.activeId,
      expandIndex,
      activeIndex,
      collapsed
    }
    this.clickInsideFlag = false // click在menu标识
  }

  componentWillReceiveProps(nextProps) {
    const { activeId, data, collapsed } = nextProps
    if (activeId !== this.props.activeId || !_.isEqual(data, this.props.data)) {
      const activeIndex = this.getActiveIndex(activeId, data)

      this.setState({
        activeId: activeId,
        activeIndex
      })
      this.isNoMiniVertaicalMenu(collapsed) &&
        this.setState({
          expandIndex: [activeIndex.split('-').slice(0, -1).join('-')]
        })
    }

    if (collapsed !== this.props.collapsed) {
      this.setState({
        collapsed: collapsed
      })
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.clickOutsideHandel)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutsideHandel)
  }

  clickOutside = () => {
    console.log('1')
    if (!this.clickInsideFlag && !this.isNoMiniVertaicalMenu()) {
      this.setState({
        expandIndex: []
      })
    }

    this.clickInsideFlag = false
  }

  clickInside() {
    this.clickInsideFlag = true
  }

  getExpandIndex(clickedIndex) {
    if (!clickedIndex) {
      return []
    }
    const { accordion } = this.props
    const { expandIndex } = this.state
    let _clickedIndex = clickedIndex
    let subInExpandIndex = false

    const _expandIndex = expandIndex.filter((item) => {
      // 点击父菜单时，需要把已展开的子菜单过滤掉，因为父菜单关闭时所有子菜单也要关闭
      const flag = item.startsWith(_clickedIndex)
      if (flag) {
        subInExpandIndex = true
      }
      return !flag
    })
    subInExpandIndex && _expandIndex.push(_clickedIndex) // subInExpandIndex为true说明其有子菜单被展开，在点击需要关闭
    const index = _expandIndex.indexOf(clickedIndex)

    if (index > -1) {
      // 点击同一个submenu，如果已展开则关闭
      _clickedIndex = clickedIndex.split('-').slice(0, -1).join('-')
    }

    if (!accordion && this.isNoMiniVertaicalMenu()) {
      // 非手风琴模式只有在垂直非mini状态下才生效
      index > -1 ? _expandIndex.splice(index, 1, _clickedIndex) : _expandIndex.push(_clickedIndex)

      return _expandIndex
    } else {
      return _clickedIndex ? [_clickedIndex] : []
    }
  }

  isNoMiniVertaicalMenu(collapsed = this.state.collapsed) {
    // 垂直非mini菜单
    return this.props.placement === 'vertical' && !collapsed
  }

  getActiveMenus(menus, activeId, activeMenus = []) {
    let result
    for (const index in menus) {
      const _activeMenus = [...activeMenus]
      if (menus[index].id === activeId) {
        _activeMenus.push(index)
        result = _activeMenus
      } else if (menus[index].children) {
        _activeMenus.push(index)
        result = this.getActiveMenus(menus[index].children, activeId, _activeMenus)
      }
      if (result) {
        break
      }
    }
    if (result) {
      return result
    }
  }

  getActiveIndex(activeId, menu) {
    // 获取激活item对应的索引，以'-'拼接成字符串
    const { data = [] } = this.props

    if (activeId === undefined || activeId === '') {
      return data[0] && data[0].id
    }
    const activeMenus = this.getActiveMenus(menu || data, activeId, [])
    return (activeMenus && activeMenus.join('-')) || ''
  }

  toggleMini() {
    const collapsed = !this.state.collapsed
    const expandIndex = collapsed ? [] : this.state.expandIndex

    setTimeout(() => {
      this.setState(
        {
          collapsed,
          expandIndex
        },
        () => {
          this.props.onCollapse && this.props.onCollapse(collapsed)
        }
      )
    }, 0)
  }

  onClick = (indexs, id, data) => {
    const expandIndex = this.isNoMiniVertaicalMenu() ? this.state.expandIndex : this.getExpandIndex('') // 非mini垂直菜单选中时不需要收起子菜单
    const oldId = this.state.activeId

    this.setState(
      {
        activeId: id,
        activeIndex: indexs,
        expandIndex
      },
      () => {
        this.props.onClick(id, oldId, data)
      }
    )
  }

  onClickSubMenu(index) {
    console.log('2')
    const expandIndex = this.getExpandIndex(index)
    console.log('sss', _.cloneDeep(expandIndex))
    this.clickInside()
    this.setState(
      {
        expandIndex
      },
      () => {
        index && this.props.onClickSubMenu && this.props.onClickSubMenu(index.split('-'))
      }
    )
  }

  // 按键操作
  handleKeyDown = (evt) => {
    evt.stopPropagation()
    // up
    if (evt.keyCode === 38) {
      evt.preventDefault()
      // moveFocusedIndex('up')
    }
    // down
    if (evt.keyCode === 40) {
      evt.preventDefault()
      // moveFocusedIndex('down')
    }
    // right
    if (evt.keyCode === 39) {
      evt.preventDefault()
      const { data } = this.props
      console.log('this.state.activeIndex ', this.state.activeIndex)
      let { activeIndex } = this.state
      if (isNaN(Number(activeIndex))) {
        activeIndex = activeIndex.split('-')[0]
      }
      if (data && data[activeIndex].children) {
        let levelIndex = 0
        let noLegalNode = false
        const childs = data[activeIndex].children
        EventEmitter.emit('$HiMenuSubMenuonClick', activeIndex)
        this.clickOutside()

        while (childs[levelIndex] && childs[levelIndex].disabled && !noLegalNode) {
          ++levelIndex
          if (levelIndex >= childs.length) {
            noLegalNode = true
          }
        }
        this.setState({
          activeIndex: activeIndex + '-' + levelIndex
        })
      } else {
        this.setState({
          activeIndex: String(activeIndex / 1 + 1)
        })
      }
    }
    // left
    console.log('activeIndex', this.state.activeIndex)
    if (evt.keyCode === 37) {
      evt.preventDefault()
      // this.setState({
      //   activeIndex
      // })
      this.setState({
        activeIndex: String(this.state.activeIndex - 1)
      })
    }
    // enter
    if (evt.keyCode === 13) {
      // enter
      // onEnterSelect()
    }
    // esc
    if (evt.keyCode === 27) {
      // setDropdownShow(false)
    }
    // space
    if (evt.keyCode === 32) {
      evt.preventDefault()
      // setDropdownShow(!dropdownShow)
    }
  }

  renderItem(data, index, props = {}) {
    // render menu item
    const { activeIndex, activeId } = this.state
    const mergeProps = Object.assign(
      {
        onClick: this.onClick.bind(this),
        id: data.id,
        icon: data.icon,
        activeIndex,
        activeId: activeId,
        index: index,
        disabled: data.disabled,
        key: index,
        data
      },
      props
    )

    return <Item {...mergeProps}>{data.content}</Item>
  }

  renderFatSubMenu(data, parentIndex) {
    // render胖菜单
    const groups = []

    data.forEach((dataItem, groupIndex) => {
      groups.push(
        <li className="hi-menu-fat" key={groupIndex}>
          <div className="hi-menu-fat__title hi-menu__title">
            <Title icon={dataItem.icon} content={dataItem.content} />
          </div>
          {dataItem.children && (
            <ul className="hi-menu-fat__content">
              {dataItem.children.map((child, index) => {
                return this.renderItem(child, parentIndex + '-' + groupIndex + '-' + index, { level: 2 })
              })}
            </ul>
          )}
        </li>
      )
    })
    return groups
  }

  renderMenu(data, parentIndex = '') {
    const { showAllSubMenus, placement, theme, overlayClassName } = this.props
    const { activeIndex, expandIndex, collapsed, activeId } = this.state
    const items = []
    const renderMenu = showAllSubMenus ? this.renderFatSubMenu.bind(this) : this.renderMenu.bind(this)
    data.forEach((item, index) => {
      const indexStr = parentIndex !== '' ? parentIndex + '-' + index : '' + index
      const level = indexStr.split('-').length

      if (item.children) {
        items.push(
          <SubMenu
            key={index}
            theme={theme}
            overlayClassName={overlayClassName}
            onClick={this.onClickSubMenu.bind(this)}
            clickInside={this.clickInside.bind(this)}
            index={indexStr}
            level={level}
            fatMenu={showAllSubMenus}
            activeIndex={activeIndex}
            activeId={activeId}
            expandIndex={expandIndex}
            disabled={item.disabled}
            content={item.content}
            icon={item.icon}
            renderMenu={renderMenu}
            datas={item.children}
            mode={placement}
            mini={collapsed}
          />
        )
      } else {
        items.push(this.renderItem(item, indexStr, { level, placement, mini: collapsed }))
      }
    })

    return items
  }

  render() {
    const { data, placement, showCollapse, theme } = this.props
    const { collapsed } = this.state
    const cls = classNames('hi-menu', `theme__${theme}`, `hi-menu--${placement}`, {
      'hi-menu--mini': collapsed
    })
    const miniIcon = <i className={`hi-icon icon-${collapsed ? 'Expand' : 'Collapse'}`} />

    return (
      <div className={cls} onKeyDown={this.handleKeyDown} tabIndex="0">
        <ul className="hi-menu-items">{this.renderMenu(data)}</ul>
        {placement === 'vertical' && showCollapse && (
          <div className="hi-menu--mini__toggle" onClick={this.toggleMini.bind(this)}>
            {miniIcon}
          </div>
        )}
      </div>
    )
  }
}

Menu.defaultProps = {
  placement: 'vertical',
  onClick: () => {},
  activeId: '',
  collapsed: false,
  showCollapse: false,
  showAllSubMenus: false,
  accordion: true
}
Menu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      children: PropTypes.array
    })
  ),
  placement: PropTypes.oneOf(['horizontal', 'vertical']),
  collapsed: PropTypes.bool, // 是否是mini模式，需要同时placement=vertical时才生效
  showCollapse: PropTypes.bool, // mini状态开关，需要同时placement=vertical时才生效
  showAllSubMenus: PropTypes.bool, // 胖菜单，需要同时placement=horizontal时才生效
  accordion: PropTypes.bool,
  onClick: PropTypes.func,
  onClickSubMenu: PropTypes.func,
  onCollapse: PropTypes.func
}
export default Menu
