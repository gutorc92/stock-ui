import { useState } from 'react'
import Layout from '../../components/Layout'
import { FormEvent } from 'react'
import { Modal, Button } from 'flowbite-react'
import { useRouter } from 'next/navigation';
const RegisterPage = () => {
  const { push } = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const onClick = async (event: FormEvent) => {
    console.log('event', event)
    push('/stock');
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    try {
      const response = await fetch('http://localhost:5000/stock', {
        body: JSON.stringify({
          name: form.name.value as string,
          base_ticket: form.base_ticket.value as string,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const result = await response.json()
      console.log('result from create stock', result)
      setShow(true)
    } catch (error) {
      console.error('error on create stock', error)
    }
  }
  return (
    <Layout title="Stock Register">
      <section className="bg-white dark:bg-gray-900">
      <Modal
        show={show}
        onClose={() => setShow(false)}
      >
        <Modal.Body>
          Stock created.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClick}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Adicionar Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="base_ticket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Base</label>
          <input type="text" id="base_ticket" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
      </div>
      </section>
    </Layout>
  )
  }

export default RegisterPage
