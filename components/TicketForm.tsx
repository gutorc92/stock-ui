import React, { Dispatch } from 'react'
import { FormEvent } from 'react'
import { Button, Label, Modal, TextInput } from 'flowbite-react'

type Props = {
  setShow: Dispatch<boolean>
  stockID: number
  update: boolean
  show: boolean
}

const TicketForm = ({ setShow, stockID, update, show }: Props) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = {
      ticket: form.ticket.value as string,
      stock_id: stockID
    }
    const url = update ? `${process.env.BASE_URL}/ticket/` : `${process.env.BASE_URL}/ticket/`
    console.log('url ticket', url)
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: update ? 'PATCH' : 'POST',
      })
      const result = await response.json()
      console.log('result', result);
      form.reset()
      setShow(false)
    } catch (err) {
      console.error('error on post ticket', err)
    }
  }
  return (
    <React.Fragment>
      <Modal
        show={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header>
          Add Ticket
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="ticket"
                  value="Ticket"
                />
              </div>
              <TextInput
                id="ticket"
                placeholder=""
                required={true}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              color="green"
            >
              Save
            </Button>
            <Button
              color="gray"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  )
}
export default TicketForm