import React, { createContext } from 'react'

const MenuContext = createContext<{
  placement?: 'vertical' | 'horizontal'
  expandedType?: 'default' | 'pop'
  showAllSubMenus?: boolean
  mini?: boolean
  expandedIds?: React.ReactText[]
  selectedIds?: React.ReactText[]
  clickMenu?: (id: React.ReactText) => void
  clickSubMenu?: (id: React.ReactText) => void
}>({})

export default MenuContext
