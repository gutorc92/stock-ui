import React, { Dispatch, useState } from 'react'
import { Label, Modal, Button, TextInput } from 'flowbite-react'
import { FormEvent } from 'react'
// import Datepicker from 'flowbite-datepicker/Datepicker';
import Datepicker from "tailwind-datepicker-react"

type Props = {
  setShow: Dispatch<boolean>
  ticketID: number
  update: boolean
  show: boolean
}

const options = {
	title: "Demo Title",
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("2000-01-01"),
	theme: {
		background: "bg-gray-700 dark:bg-gray-800",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "bg-red-500",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2022-01-01"),
	language: "pt-br",
}

const PurchaseForm = ({ setShow, ticketID, update, show }: Props) => {
  const [ showDatepicker, setDatepicker ] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log('passou aqui', ticketID)
    const form = event.target as HTMLFormElement
    const data = {
      value: form.value.value as string,
      quantity: form.quantity.value as string,
      date: form.date.value as string,
      ticket_id: ticketID
    }
    const url = `${process.env.BASE_URL}/transaction/ticket/${ticketID}/purchase`
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  const handleChange = (selectedDate: Date) => {
		console.log(selectedDate)
	}
  return (
    <Modal
      show={show}
      onClose={() => setShow(false)}
    >
      <Modal.Header>
        Add Purchase
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="quantity"
                value="Quantity"
              />
            </div>
            <TextInput
              id="quantity"
              placeholder="0"
              required={true}
            />
          </div>
          <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="value"
                  value="Value"
                />
              </div>
              <TextInput
                id="value"
                placeholder="0"
                required={true}
              />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="date"
                value="Date"
              />
            </div>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              </div>
              <input id="date" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
              {/* <Datepicker onChange={handleChange} options={options} show={showDatepicker} setShow={() => setDatepicker(false)} /> */}
            </div>
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
    
  )
}
export default PurchaseForm