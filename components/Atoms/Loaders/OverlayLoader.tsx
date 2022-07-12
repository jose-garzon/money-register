import { SingleLoader } from './SingleLoader'

const OverlayLoader = () => {
  return (
    <div
      role="presentation"
      className="absolute inset-0 grid place-content-center place-items-center"
    >
      <SingleLoader />
      <h1 className="bg-gradient-to-r from-[#F9964F] to-[#F9C74F] bg-clip-text font-bold text-transparent">
        Expenses
      </h1>
    </div>
  )
}

export { OverlayLoader }
