import * as React from 'react'
import ListItem from './ListItem'
import { User, Stock } from '../interfaces'

type Props = {
  items: User[] | Stock[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
