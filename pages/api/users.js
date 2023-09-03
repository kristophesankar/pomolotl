import clientPromise from '../../db/mongodb'

// handler that serves users
export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('pomolotltest')
  switch (req.method) {
    case 'GET': {
      const users = await db.collection('Users').find({}).toArray()
      res.json({ status: 200, data: users })
      break
    }
  }
}

export async function getServerSideProps() {
  let res = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  let users = await res.json()

  return {
    props: { users },
  }
}
