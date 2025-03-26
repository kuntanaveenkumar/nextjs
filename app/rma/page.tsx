'use client'
import React, { useEffect, useState, FormEvent } from 'react';
import { Suspense } from 'react';

export default function Rma() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      console.log(event.currentTarget.name)
      const formData = new FormData(event.currentTarget)
      console.log(formData)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {

      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const ShimmerTable = () => {
    return (
      <div className="w-full p-4">
        <div className="overflow-hidden border border-gray-300 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {Array.from({ length: 5 }).map((_, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 bg-gray-200 shimmer h-8 rounded"
                  ></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 h-8 bg-gray-100 shimmer rounded"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  useEffect(() => {

  }, []);
  return (
    <div>
      <Suspense fallback={<ShimmerTable />}>
        <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <form onSubmit={onSubmit} method="">
            <input type="text" name="name" />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </Suspense>
    </div>
  );
}
