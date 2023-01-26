import {Children, cloneElement, createContext, ReactElement, useState} from "react";
import { motion } from 'framer-motion';

interface ChildProps {
  children: ReactElement|ReactElement[]|string
}

// Migrate the ColumnContext to a separate components.
const ColumnContext = createContext({
  currentColumn: 0,
  nextColumn: () => {},
  previousColumn: () => {},
  canNextColumn: () => {},
  canPreviousColumn: () => {},
})

export default function ColumnLayout({ children }: ChildProps) {
  const [currentColumn, setColumn] = useState(0);
  const childrenArray = Children.toArray(children)
  const maxColumn = childrenArray.length
  const canNextColumn = () => currentColumn+1 < maxColumn
  const canPreviousColumn = () => currentColumn > 0
  const nextColumn = () => canNextColumn() && setColumn(currentColumn+1)
  const previousColumn = () => canPreviousColumn() && setColumn(currentColumn-1)


  return <>
      <ColumnContext.Provider value={{ currentColumn, canNextColumn, canPreviousColumn, nextColumn, previousColumn }}>
          <motion.div className='flex '>
            {/* @ts-ignore */}
            {Children.map(childrenArray, (child, index) => cloneElement(child, {index}))}
          </motion.div>
      </ColumnContext.Provider>
  </>
}

interface ColumnProps extends ChildProps {
  index?: number,
}

export function ColumnLayoutColumn({children, index}: ColumnProps) {
  return <motion.div className='text-rose-400'>
    {children}
  </motion.div>
}
