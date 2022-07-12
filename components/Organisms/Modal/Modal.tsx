import { FC, MouseEventHandler } from 'react'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
  title: string
  subtitle?: string
  open: boolean
  close?: MouseEventHandler<SVGElement>
}

const Modal: FC<ModalProps> = ({ title, subtitle, children, open, close }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 grid  place-content-center bg-slate-900/50  backdrop-blur-sm">
      <div
        role="presentation"
        className="relative mx-auto min-w-[50vw] max-w-[80vw] rounded-xl bg-white p-5 shadow-xl"
      >
        <h2 className="mr-5 font-bold">{title}</h2>
        <small className=" mb-4 block text-sm">{subtitle}</small>
        {children}
        <FaTimes
          size={24}
          onClick={close}
          role="close"
          className="absolute top-4 right-4 cursor-pointer text-slate-700"
        />
      </div>
    </div>
  )
}

export { Modal }
