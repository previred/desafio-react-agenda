import AddContact from '@/components/AddContact'
import ContactDrawer from '@/components/ContactDrawer'
import ContactList from '@/components/ContactList'

export default function Home() {
  return (
    <main className='px-8 xl:px-16 py-12 max-w-screen-lg bg-white'>
      <section>
        <h1 className='text-3xl font-medium text-slate-600'>
          Agenda Previred - Mi agenda de contactos laboral
        </h1>
        <p className='text-slate-500 pt-2'>
          Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
          nuevos contactos y eliminar contactos no deseados.
        </p>
      </section>
      <AddContact />
      <ContactList />
      <ContactDrawer />
    </main>
  )
}
