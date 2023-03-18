import React from 'react'
import Link from 'next/link'

import { Stock, User } from '../interfaces'

type Props = {
  data: User | Stock
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    {data.id}:{data.name}
  </Link>
)

export default ListItem
