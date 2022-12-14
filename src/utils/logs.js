import { db } from "./firebase"

export async function add_log({ log }) {
  await db.logs
    .add({ log, date: Date.parse(Date(db.get_server_timestamp)) })
    .then(() => console.log(`Logged.`))
    .catch(e => console.error(`Logging failed. ${e}`))
}

export async function get_logs() {
  await db.logs
    .get()
    .then(logs_res => {
      const new_data = logs_res.docs.map(data => data.data())
      return new_data
    })
    .catch(e => console.error(`Fetching logs failed. ${e}`))
}
