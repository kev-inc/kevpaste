import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //@ts-ignore
    const pasteBody = e.target.body.value
    // POST request to /api/paste
    const res = await fetch('/api/paste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({body: pasteBody}),
    }).then(res => res.json())
    router.push(res.body)
  }

  return (
    <form className='container mx-auto h-screen flex flex-col p-4' onSubmit={onSubmit}>
      <div className='flex justify-between mb-4'>
        <span className='text-3xl'>KevPaste</span>
        <input type='submit' value='Save' className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700'/>
      </div>
      <pre className='h-full w-full flex'>
        <textarea id='body' className='focus:outline-none grow'/>
      </pre>
   
    </form>
  );
}
