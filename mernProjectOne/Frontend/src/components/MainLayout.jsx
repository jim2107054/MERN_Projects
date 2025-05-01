import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({children}) => {
  return (
    <div>
        <Header/>
        {children} 
        {/*This is where the child components will be rendered.
           Whatever i write in MainLayout tag will be included here.*/}
        <Footer/>
    </div>
  )
}

export default MainLayout