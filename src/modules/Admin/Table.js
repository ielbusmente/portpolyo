import React from "react"
import React_Table from "react-bootstrap/Table"
import { Button } from "react-bootstrap"

export default function Table({
  table_columns,
  header,
  loading,
  list,
  handle_delete,
  handle_edit,
}) {
  return (
    <React_Table striped bordered hover>
      <thead>
        <tr>
          {header.forEach(h => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={table_columns}>Loading</td>
          </tr>
        ) : (
          <>
            {list.length > 0 ? (
              list.map((p, p_i) => (
                <tr key={p_i}>
                  <td>{p_i + 1}</td>
                  <td>
                    <button onClick={() => handle_edit(p.id)}>{p.name}</button>
                  </td>
                  <td>
                    <Button type="button" onClick={() => handle_delete(p.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table_columns}>No Data</td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </React_Table>
  )
}
