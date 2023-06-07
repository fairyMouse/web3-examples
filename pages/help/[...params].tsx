import { useRouter } from 'next/router'

// http://localhost:3000/help/who
// http://localhost:3000/help/who/test
export default function Help() {
  const router = useRouter()
  const params = router.query.params

  console.log(params)
  return (
    <main>
      <h4>Help page</h4>
    </main>
  )
}
