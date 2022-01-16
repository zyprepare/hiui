
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-sad-filled')

export const SadFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14343"  ><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-2.346667 521.898667c-43.178667 0-85.12 12.736-125.546666 37.504-3.946667 2.410667-8.981333 5.888-15.146667 10.389333A39.957333 39.957333 0 0 0 362.666667 713.898667a45.802667 45.802667 0 0 0 60.074666 7.424c1.557333-1.066667 2.986667-2.005333 4.330667-2.837334 28.010667-17.493333 55.445333-25.92 82.581333-25.92 28.096 0 57.322667 9.002667 87.893334 27.712 1.088 0.64 2.346667 1.450667 3.712 2.346667a45.44 45.44 0 0 0 60.074666-8.746667 40.32 40.32 0 0 0-8.064-59.008c-4.885333-3.370667-9.173333-6.186667-12.842666-8.384-42.944-25.941333-86.613333-39.253333-130.773334-39.253333zM405.333333 362.666667a42.666667 42.666667 0 0 0-42.56 39.466666L362.666667 405.333333v42.666667a42.666667 42.666667 0 0 0 85.226666 3.2L448 448v-42.666667a42.666667 42.666667 0 0 0-42.666667-42.666666z m213.333334 0a42.666667 42.666667 0 0 0-42.56 39.466666L576 405.333333v42.666667a42.666667 42.666667 0 0 0 85.226667 3.2L661.333333 448v-42.666667a42.666667 42.666667 0 0 0-42.666666-42.666666z" p-id="14344"></path></svg>
    )
  }
)

if (__DEV__) {
  SadFilled.displayName = 'SadFilled'
}
  