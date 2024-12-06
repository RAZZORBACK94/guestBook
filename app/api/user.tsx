'use server';

import prisma from "../lib/prisma"

export async function addGuest(formData:FormData) {
    try{
        const name = formData.get('name')
    const email = formData.get('email')
    const telp = formData.get('telp')

    await prisma.guest.create({
        data:{
            name: name as string,
            email: email as string,
            telp : telp as string
        }
    })

    return{
        success: "berhasil mengisi buku tamu"
    }
    } catch(err){
        console.log('this is error: '+err)
        return{
            error: 'something wrong'
        }
    }finally{
        await prisma.$disconnect()
    }
}

export async function getGuest() {
    try{
        const data = await prisma.guest.findMany()
        return data
    } catch(err) {
        console.log(err)
    } finally{
        await prisma.$disconnect()
    }
}