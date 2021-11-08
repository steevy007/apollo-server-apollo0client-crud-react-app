const { personnes, personne, addPersonne, editPersonne, deletePersonne, fakePeople, deleteAll, findExistingPeopleByEmail } = require('./controller/controller')
const {sendMail}=require('./controller/mail')
const resolver = {
    Query: {
        personnes: () => personnes(),
        personne: (parent, { id }) => personne(id),
        fakerPeople: () => {
            if (fakePeople()) {
                return personnes()
            }
        }
    },
    Mutation: {
        addPersonne: async(parent, { nom, prenom, email, sexe }) => {
            let res=await findExistingPeopleByEmail(email)
            if(res){
                throw new Error('Utilisateur Existant')
            }
            return addPersonne(nom, prenom, email, sexe)
        },
        editPersonne: (parent, { id, nom, prenom, sexe }) => {
            return editPersonne(id, nom, prenom, sexe)
        },
        deletePersonne: (parent, { id }) => {
            return deletePersonne(id)
        },
        deleteAll: () => {
            return deleteAll()
        },
        contact:(parent,{fullname,object,email,message})=>{
            return sendMail(fullname,object,email,message)
        }
    }
}

module.exports = resolver