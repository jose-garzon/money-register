import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styles from './styles.module.css'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  variant?: 'main' | 'outline'
  startIcon?: FC<{ className: string; role: string }>
}

const Button: FC<ButtonProps> = ({
  variant = 'main',
  children,
  className,
  startIcon: StartIcon,
  ...rest
}) => {
  const defineStyles = {
    main: styles.main,
    outline: styles.outline,
  }
  return (
    <button className={`${className} ${defineStyles[variant]}`} {...rest}>
      {StartIcon && (
        <StartIcon role="start-icon" className="mr-4 text-slate-700" />
      )}
      {children}
    </button>
  )
}

export { Button }
export type { ButtonProps }
