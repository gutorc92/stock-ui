import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { TicketComplete } from '../../interfaces'
import { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import PurchaseForm from '../../components/PurchaseForm'
import { Button, Table } from 'flowbite-react'

type Props = {
  items: TicketComplete[]
}

const PurchasePage = ({ items }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState(0)

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleChange = async (event: FormEvent<HTMLInputElement>) => {
    console.log('change', event.currentTarget.value)
  }
  const handleOpen = async (ticketID: number) => {
    console.log('stock')
    setTicket(ticketID)
    setShow(true)
  }
  return (
    <Layout title="Purchase">
      { domLoaded && <PurchaseForm setShow={setShow} show={show} ticketID={ticket} update={false} ></PurchaseForm>}
      <div>
        <p>Teste</p>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Ticket
          </Table.HeadCell>
          <Table.HeadCell>
            Empresa
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {items.map((item) => (
          <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.ticket}
            </Table.Cell>
            <Table.Cell>
              {item.name}
            </Table.Cell>
            <Table.Cell>
              <Button onClick={() => handleOpen(item.id)}>Add</Button>
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Layout>
  )
  }

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const response = await fetch(`${process.env.BASE_URL}/ticket`)
  const result = await response.json()
  const items: TicketComplete[] = result.items
  return { props: { items } }
}
export default PurchasePage
