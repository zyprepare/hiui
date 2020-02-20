import React from 'react'
import { mount } from 'enzyme'
import sinon, { fake } from 'sinon'
import Search from '../index'
import Input from '../../input'
import Button from '../../button'
function trigger(elem, event, code ){

  var myEvent = document.createEvent('Event')        // 初始化这个事件对象，为它提高需要的“特性”
  if (code) {
    myEvent.which = code;
    myEvent.keyCode = code; // Ctrl
  }
  
  myEvent.initEvent(event, true, true);        //执行事件

  elem.dispatchEvent(myEvent);

}
describe('Search', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })
    it('basic', () => {
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              onSearch = {(value) => {
                console.log('Input Value', value)
              }}
          />
        )
        expect(wrapper.find('.hi-search_input')).toHaveLength(1)
        wrapper.find(Input).simulate('focus')
        expect(document.querySelectorAll('.hi-popper__container')).toHaveLength(0)
    })
    it('disable', () => {
      const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              disable
              onSearch = {callback}
          />
        )
        expect(wrapper.find('.hi-search_input')).toHaveLength(1)
        wrapper.find(Button).simulate('click')
        expect(callback.callCount).toEqual(0)
    })
    
    describe('events', () => {
      it('onSearch', () => {
        const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              onSearch = {callback}
          />
        )
        expect(wrapper.find('.hi-search_input')).toHaveLength(1)
        wrapper.find(Button).find('.hi-btn').at(1).simulate('click')
        expect(callback.callCount).toEqual(0)
        wrapper.find('input').simulate('change', { target: { value: '1' } })
        wrapper.find(Button).find('.hi-btn').at(1).simulate('click')
        expect(callback.callCount).toEqual(1)
      })
      it('onDelete', () => {
        const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              historyDataSource = {[{
                  value: 1,
                  text: '小米9'
              }]}
              dataSource = {[{
                value: 1,
                text: '小米9 青春版'
              }]}
              placeholder='搜索关键字'
              onDelete = {callback}
          />
        )
        wrapper.find('input').simulate('focus')
        clock.tick(300)
        expect(document.querySelectorAll('.hi-popper__container')).toHaveLength(1)
        expect(document.querySelectorAll('.hi-search_dropdown--item-history')).toHaveLength(1)
        expect(document.querySelectorAll('.hi-search_dropdown--item')).toHaveLength(2)
        trigger(document.querySelector('.icon-delete'),'click')
        wrapper.find('input').simulate('blur')

        expect(callback.callCount).toEqual(1)
      })
      it('onChange', () => {
        const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              historyDataSource = {[{
                  value: 1,
                  text: '小米9'
              }]}
              dataSource = {[{
                value: 1,
                text: '小米9 青春版'
              }]}
              placeholder='搜索关键字'
              onChange = {callback}
          />
        )
        wrapper.find('input').simulate('focus')
        clock.tick(300)
        expect(document.querySelectorAll('.hi-popper__container')).toHaveLength(2)
        wrapper.find('input').simulate('change', { target: { value: '1' } })
        expect(callback.callCount).toEqual(1)
      })
    })

    it('historyDataSource && dataSource', () => {
      const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              historyDataSource = {[{
                  value: 1,
                  text: '小米9'
              }]}
              dataSource = {[{
                value: 1,
                text: '小米9 青春版'
              }]}
              onSearch = {callback}
          />
        )
        wrapper.find('input').simulate('focus')
        clock.tick(300)
        expect(document.querySelectorAll('.hi-popper__container')).toHaveLength(3)
        expect(document.querySelectorAll('.hi-search_dropdown--item-history')).toHaveLength(2)
        wrapper.find('input').simulate('change', { target: { value: '1' } })
        trigger(document.querySelectorAll('.hi-search__popper')[1],'mouseout')
        trigger(document.querySelectorAll('.hi-search__popper')[1],'mouseover')
        expect(document.querySelectorAll('.hi-search_dropdown--item-history')).toHaveLength(1)
        trigger(document.querySelectorAll('.hi-search_dropdown--item_normal')[2],'click')
        expect(callback.callCount).toEqual(1)
        wrapper.unmount()
    })
    it('historyDataSource && dataSource', () => {
      const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              historyDataSource = {[]}
              dataSource = {[]}
              onSearch = {callback}
          />
        )
        wrapper.find('input').simulate('focus')
        wrapper.find('input').simulate('change', { target: { value: '1' } })
        wrapper.unmount()
    })
    it('classic', () => {
      const callback = fake()
        const wrapper = mount(
            <Search 
              style={{ width: 260 }}
              placeholder='搜索关键字'
              historyDataSource = {[{
                  value: 1,
                  text: <span>查看更多</span>
              }]}
              dataSource = {[
                {
                  value: 1,
                  text: '(小米[9]) 青春版',
                  children : [
                    {
                      value: 2,
                      text: '小米10'
                    },
                    {
                      value: 3,
                      text: <span>查看更多</span>
                    },
                  ]
                }
              ]}
              onSearch = {callback}
          />
        )
        wrapper.find('input').simulate('focus')
        clock.tick(300)
        // expect(document.querySelectorAll('.hi-search_dropdown--item_normal')).toHaveLength(1)

        trigger(document.querySelectorAll('.hi-search_dropdown--item_normal')[2],'click')
        wrapper.find('input').simulate('focus')
        clock.tick(300)
        wrapper.find('input').simulate('change', { target: { value: '(小米[9])' } })
        expect(document.querySelectorAll('.hi-search_dropdown--item-title')).toHaveLength(1)
        trigger(document.querySelectorAll('.hi-search_dropdown--item_normal')[3],'click')

        wrapper.unmount()
    })
    
  })
  