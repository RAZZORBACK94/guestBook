'use client'

import { useState } from "react";
import { addGuest } from "./api/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [telp, setTelp] = useState<string>('')

  const router = useRouter()

  async function handleSubmit() {
    try{
      const formdata = new FormData()
      if(name) formdata.append('name',name)
      if(email) formdata.append('email',email)
      if(telp) formdata.append('telp',telp)

      const result = await addGuest(formdata)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success)
      }
    }catch (err) {
      console.log('this is error: '+err)
      toast.error('something wrong')
    } finally {
      setName('')
      setEmail('')
      setTelp('')
    }
  } 

  return (
    <div>
      <p>buku tamu</p>
      <input className="border-2 border-black" type="text" placeholder="nama" value={name} onChange={(e) => setName(e.target.value)} required/>
      <input className="border-2 border-black" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input className="border-2 border-black" type="number" placeholder="telepon" value={telp} onChange={(e) => setTelp(e.target.value)} required/>
      <button onClick={handleSubmit}>Kirim</button>
      <button onClick={() =>router.push('/admin')}>admin</button>
    </div>
  );
}
