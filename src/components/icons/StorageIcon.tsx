interface Props {
  fill?: string
  stroke?: string
}

export default function StorageIcon (props: Props) {
  return (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="matrix(0 -1 1 0 2 18)" {...props}>
        <path d="m2.5.5h4l5.7878386 2.48050226c.7353677.31515758 1.2121614 1.03823384 1.2121614 1.83829006v7.36241538c0 .8000562-.4767937 1.5231325-1.2121614 1.83829l-5.7878386 2.4805023h-4c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="3" fill="currentColor" r="1" {...props}/>
        <path d="m6.5 1v15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}/>
      </g>
    </svg>
  )
}
