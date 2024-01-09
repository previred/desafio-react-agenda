import { SVGProps } from 'react'

export function IcRoundPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='1rem'
      height='1rem'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='currentColor'
        stroke='currentColor'
        fillRule='evenodd'
        d='M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z'
      />
    </svg>
  )
}
