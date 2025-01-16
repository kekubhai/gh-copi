import { auth, clerkClient } from '@clerk/nextjs/server'
import { error } from 'console';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const SyncUser = async() => {
    const {userId} =await auth();
    if(!userId){
        throw new Error("User is not signed In");
    }
    const client =await clerkClient()
    const user =await client.users.getUser(userId)
    if(!user.emailAddresses){
        return notFound()
    }
 await db.user.upsert({
    where:{
        emailAddress:user.emailAddresses[0]?.emailAddress?? ""
    },
    update:{
        imageUrl:user.imageUrl,
        firstName:user.firstName,
        lastName:user.lastName,
    },
    create:{
id:user.emailAddresses[0]?.emailAddress ?? "",
imageUrl:user.imageUrl,
firstName:user.firstName,
lastName:user.lastName,
    },
 })
 return redirect('/dashboarrd');
}


export default SyncUser
