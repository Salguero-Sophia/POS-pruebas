import { CheckContent, CheckForm, ListNovaPagos } from '../components';


export const HomePage = () => {

  return (
    <div className="bg-gray-50 mb-20">

      <h2 className="sr-only">Checkout</h2>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-full">

        <CheckContent>

          <CheckForm />

        </CheckContent>

      </div>

      <ListNovaPagos />

      {/* <CreditCard /> */}

    </div>
  )
}
