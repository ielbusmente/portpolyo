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
export async function update_project(data) {
  const doc = db.projects.doc(data._id)
  const project_from_db = await doc.get()
  if (project_from_db.exists) {
    await doc
      .update(data)
      .then(() => console.log(`Project updated.`))
      .catch(e => console.error(`Failed to update project. ${e}`))
  } else console.error(`Project does not exist`)
}
export async function delete_project(id) {
  await db.projects
    .doc(id)
    .delete()
    .then(() => console.log(`Project  deleted.`))
    .catch(e => console.error(`Failed to delete project. ${e}`))
}
