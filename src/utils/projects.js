import { db } from "./firebase"

export async function add_project({
  title,
  date,
  details,
  description,
  link,
  skills,
  proj_type,
}) {
  await db.projects
    .add({ title, date, details, description, link, skills, proj_type })
    .then(() => console.log(`Project added.`))
    .catch(e => console.error(`Failed to add the project. ${e}`))
}
