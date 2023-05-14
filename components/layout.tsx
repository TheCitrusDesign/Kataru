import Meta from './meta'
import Header from './header/'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
        <main role="main" className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
