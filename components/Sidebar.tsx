import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import { DiamondButton } from './DiamonButton'

export const Sidebar = ({
  isExpanded,
  setIsExpanded,
  children,
}: {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  children?: JSX.Element
}) => {
  return (
    <motion.div
      className="h-screen w-[400px] absolute top-0 right-0 z-10 "
      initial={{ x: '100% ' }}
      animate={{ x: isExpanded ? '0%' : '100%' }}
      transition={{ easings: ['easeInOut'] }}
    >
      <DiamondButton onClick={() => setIsExpanded(false)} />
      <div
        className="h-full bg-clip-content bg-transparent"
        style={{
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, -860px 1000px, 24px 48.5px, -21px 0)',
        }}
      >
        <div className="bg-black border-solid border-[0.5px] border-gray-700 h-full overflow-y-scroll ">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
