interface Props {
  fill?: string
  stroke?: string
}

export default function CloudIcon (props: Props) {
  return (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg" ><path d="m8.5.5c2.7614237 0 5 2.23857625 5 5 0 .48543539-.0691781.95471338-.1982137 1.39851335.3339576-.25026476.748773-.39851335 1.1982137-.39851335 1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2c-1.104407 0-10.16182706 0-11 0-1.65685425 0-3-1.34314575-3-3s1.34314575-3 3-3c.03335948 0 .06659179.00054449.09968852.00162508.46264217-2.28304993 2.48077946-4.00162508 4.90031148-4.00162508z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 5)" {...props}/></svg>
  )
}
