import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function PastePage() {

    const router = useRouter()

    const [body, setBody] = useState()

    useEffect(() => {
        const id = router.query.id
        if (!id) return
        console.log(id)
        fetch(`/api/paste?id=${id}`)
            .then(res => res.json())
            .then(res => res.body)
            .then(resBody => setBody(resBody))
    }, [router.query.id])

    // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const pasteBody = e.target.body.value
    //   // POST request to /api/paste
    //   const res = await fetch('/api/paste', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({body: pasteBody}),
    //   })
    //   console.log(res)
    //   console.log(e.target.body.value)
    //   console.log('submitted');
    // }
  
    return (
      <form className='container mx-auto h-screen flex flex-col p-4'>
        <div className='flex justify-between mb-4'>
            <Link className='text-3xl' href="/">KevPaste</Link>
          {/* <input type='submit' value='Save' className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700'/> */}
        </div>
        <pre className='h-full w-full flex'>
          <textarea id='body' className='focus:outline-none grow' value={body} readOnly={true}/>
        </pre>
     
      </form>
    );
  }
  