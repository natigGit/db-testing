/* eslint-disable no-undef */
import { sql } from "@vercel/postgres";
import { useEffect, useState } from "react";

if (process.env.VERCEL_ENV === "production") {
  connectionString = process.env.POSTGRES_URL = process.env.PROD_POSTGRES_URL;
} else if (process.env.VERCEL_ENV === "preview") {
  connectionString = process.env.POSTGRES_URL = process.env.STAGING_POSTGRES_URL;
} else if (process.env.VERCEL_ENV === "development") {
  connectionString = process.env.POSTGRES_URL = process.env.DEV_POSTGRES_URL;
}

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      try {
        const { rows } = await sql`SELECT * from pizzas`;
        setData(rows)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  return (
    <div>
      natig's page
      {data ? data.map((row) => (
        <div key={row.id}>
          {row.name} - {row.price}
        </div>
      ))
        :
        <div>Nothing found</div>
      }
    </div>
  )
}

export default App
