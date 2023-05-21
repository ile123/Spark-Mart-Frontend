import stlyes from './ProtectedRoute.module.css'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import Layout from '../../../UI/Layout/Layout'

export default function ProtectedRoute() {
  const { userInfo } = useSelector((state: any) => state.auth)

  if (JSON.stringify(userInfo) === '{}') {
    return (
      <Layout>
        <h1 id={stlyes.warning}>You cannot access the profile page until you have been authenticated!</h1>
      </Layout>
    )
  }

  return <Outlet />
}