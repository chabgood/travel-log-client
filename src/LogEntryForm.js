import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from './API'
const LogEntryForm = ({ location, onClose }) => {
  const { handleSubmit, register, errors } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const onSubmit = async (entry) => {
    try {
      setLoading(true)
      entry.latitude = location.latitude
      entry.longitude = location.longitude
      await createLogEntry(entry)
      onClose()
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className='error'>{error}</h3> : null}
      <label htmlFor='title'>Title</label>
      <input name='title' required ref={register} />
      <label htmlFor='description'>Description</label>
      <input name='description' ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' ref={register} />
      <label htmlFor='image'>Image</label>
      <input name='image' ref={register} />
      <label htmlFor='visitDate'>Visit date</label>
      <input name='visitDate' type='date' required ref={register} />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Create Travel Log Entry'}
      </button>
    </form>
  )
}
export default LogEntryForm
