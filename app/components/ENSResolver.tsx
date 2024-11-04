import { useState } from 'react'
import { useEnsName, useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'
import { toast } from 'react-toastify'

function ENSResolver() {
  const [input, setInput] = useState('')
  const [lookupType, setLookupType] = useState<'name' | 'address'>('name')

  const { data: ensName, isLoading: nameLoading, isError: nameError } = useEnsName({
    address: lookupType === 'address' ? input as `0x${string}` : undefined,
  })

  const { data: ensAddress, isLoading: addressLoading, isError: addressError } = useEnsAddress({
    name: lookupType === 'name' ? normalize(input) : undefined,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input) {
      toast.error('Please enter a value to lookup')
      return
    }
    // Lookup is automatically triggered by wagmi hooks
  }

  const isLoading = nameLoading || addressLoading
  const isError = nameError || addressError

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lookupType === 'name' ? 'Enter ENS name' : 'Enter Ethereum address'}
        />
        <select value={lookupType} onChange={(e) => setLookupType(e.target.value as 'name' | 'address')}>
          <option value="name">Lookup Address</option>
          <option value="address">Lookup Name</option>
        </select>
        <button type="submit" disabled={isLoading}>Lookup</button>
      </form>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred during lookup</p>}
        {!isLoading && !isError && (
          <>
            {lookupType === 'name' && ensAddress && <p>Address: {ensAddress}</p>}
            {lookupType === 'address' && ensName && <p>Name: {ensName}</p>}
            {lookupType === 'name' && !ensAddress && <p>No address found for this name</p>}
            {lookupType === 'address' && !ensName && <p>No name found for this address</p>}
          </>
        )}
      </div>
    </div>
  )
}

export default ENSResolver