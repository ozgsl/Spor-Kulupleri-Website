import { Client } from 'pg'
import 'dotenv/config'

async function testConnection() {
  const connectionString = process.env.DATABASE_URL
  console.log(`Connecting to: ${connectionString?.replace(/:[^:]*@/, ':***@')}`)
  
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log('Successfully connected to DATABASE_URL!')
    const res = await client.query('SELECT NOW()')
    console.log('Time from DB:', res.rows[0])
    await client.end()
  } catch (err) {
    console.error('Error connecting to DATABASE_URL:', err)
  }

  const directString = process.env.DIRECT_URL
  console.log(`Connecting to DIRECT: ${directString?.replace(/:[^:]*@/, ':***@')}`)
  
  const client2 = new Client({ connectionString: directString })
  
  try {
    await client2.connect()
    console.log('Successfully connected to DIRECT_URL!')
    await client2.end()
  } catch (err) {
    console.error('Error connecting to DIRECT_URL:', err)
  }
}

testConnection()
