import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation';
import { db } from '../server/db';
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
        firtName:user.firstName,
        lastName:user.lastName,
    },
    create:{
id:user.emailAddresses[0]?.emailAddress ?? "",
emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
clerkId: user.id,
imageUrl:user.imageUrl,
firtName:user.firstName,
lastName:user.lastName,
    },
 })
 return redirect('/dashboard');
}


export default SyncUser
