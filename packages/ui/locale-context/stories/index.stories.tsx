import React from 'react'

export * from './basic.stories'

export default {
  title: 'Private/LocaleContext',
  decorators: [(story: Function) => <div>{story()}</div>],
}
