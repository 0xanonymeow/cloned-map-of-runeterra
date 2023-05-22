import { ButtonHTMLAttributes } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

export const DiamondButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-black h-6 w-6 text-center transform rotate-45 absolute z-30 top-9 left-[-12px] flex justify-center items-center border-solid border-[0.5px] border-gray-700"
      {...props}
    >
      <RiArrowRightSLine
        className="transform -rotate-45 text-sm text-[#a09b8c] ml-[1px] -mt-[1px]"
        size="16px"
      />
      {children}
    </button>
  )
}
