'use client'

const IconPlus = ({onClick}: {onClick: () => void}) => {
  
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:bg-slate-400/90 rounded-full p-3 hover:text-white border-slate-600 border w-10 h-10 items-center justify-center flex"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.33331V12.6666" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.33337 8H12.6667" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default IconPlus