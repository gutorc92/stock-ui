import { GetStaticProps, GetStaticPaths } from 'next'

import { Stock } from '../../../interfaces'
import Layout from '../../../components/Layout'
import ListDetail from '../../../components/ListDetail'
import StockForm from '../../../components/StockForm'

type Props = {
  item?: Stock
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'Stock Detail'
      }`}
    >
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Editar Empresa</h2>
          <StockForm item={item} update={true}></StockForm>
        </div>
      </section>
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:5000/stock')
  console.log('response', response)
  const result = await response.json()
  console.log('result', result.stocks)
  const items: Stock[] = result.stocks
  const paths = items.map((stock) => ({
    params: { id: stock.id.toString() },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const response = await fetch(`http://localhost:5000/stock/${id}`)
    console.log('response', response)
    const result = await response.json()
    const item = result.item
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}