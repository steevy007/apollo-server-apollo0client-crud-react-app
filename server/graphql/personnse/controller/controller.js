const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const faker=require('faker')
const personnes=async()=>{
    return await prisma.personne.findMany({})
}

const personne=async(id)=>{
    return await prisma.personne.findUnique({
        where:{
            id:parseInt(id)
        }
    })
}

const addPersonne=async(nom,prenom,email,sexe)=>{
    return await prisma.personne.create({
        data:{
            nom,
            prenom,
            email,
            sexe
        }
    })
}


const editPersonne=async(id,nom,prenom,sexe)=>{
    return await prisma.personne.update({
        where:{
            id:parseInt(id)
        },
        data:{
            nom,
            prenom,
            sexe
        }
    })
}

const deletePersonne=async(id)=>{
    return await prisma.personne.delete({
        where:{
            id:parseInt(id)
        }
    })
}

const fakePeople=async()=>{
    //create 100 people
    for(let i=0;i<100;i++){
        const random=await prisma.personne.create({
            data:{
                nom:faker.name.lastName(),
                prenom:faker.name.findName(),
                email:faker.internet.email(),
                sexe:faker.name.gender()
            }
        })
    }

    return true
}

const findExistingPeopleByEmail=async(email)=>{
    const find=await prisma.personne.findUnique({
        where:{
            email
        }
    })


    if(find!=null){
       // console.log(true)
        return true
    }

    //console.log(false)
    return false
}

const deleteAll=async()=>{
    return await prisma.personne.deleteMany({})
}

module.exports={personne,personnes,addPersonne,editPersonne,deletePersonne,fakePeople,deleteAll,findExistingPeopleByEmail}