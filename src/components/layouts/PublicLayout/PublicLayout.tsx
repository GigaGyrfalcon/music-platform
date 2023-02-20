import './public-layout.scss'

import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../../fragments'

function PublicLayout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
