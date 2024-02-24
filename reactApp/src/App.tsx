import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UsersModuleComponent } from './modules/users/UsersModule.component'

//Creamos el objeto queryClient que solicita react query con una pequeña configuración
const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          retry: 0
      },
  },
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UsersModuleComponent />
      </QueryClientProvider>
    </>
  )
}

export default App
