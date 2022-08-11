import { useState } from 'react'

interface Props {
  initialValue: {
    [key: string]: any
  }
}

export default function useForm (props: Props) {
  const [data, setData] = useState(props.initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return {
    data,
    handleChange
  }
}
