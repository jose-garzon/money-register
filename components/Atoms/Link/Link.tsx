import NextLink from 'next/link'
import { FC } from 'react'

interface LinkProps {
  to: string
  className?: string
}

const Link: FC<LinkProps> = ({ to, className, children }) => {
  return (
    <NextLink href={to} passHref>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

export { Link }
