import * as Yup from 'yup'
import Pet from '../models/Pet'

class PetController {
    async index(req, res) {
        const pets = await Pet.findAll({
            where: { user_id: req.userId }
        })

        return res.json(pets)
    }

    async store(req, res) {
        console.log(req.body)
        console.log(req.file)

        const schema = Yup.object().shape({
            pet_name: Yup.string().required(),
            type_of_pet: Yup.string().required(),
            gender: Yup.string().required(),
            thumbnail: Yup.string(),
            breed: Yup.string(),
            reward: Yup.boolean().required(),
            last_seen: Yup.date(),
            description: Yup.string().required()
        })

        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err.errors
            })
        }
        
        const { filename } = req.file
        const { pet_name, type_of_pet, gender, breed, reward, last_seen, description } = req.body

        const pet_register = await Pet.create({
            user_id: req.userId,
            pet_name,
            type_of_pet,
            gender,
            thumbnail: filename,
            breed,
            reward,
            last_seen,
            description
        })

        return res.json({ 
            error: false,
            message: 'Dados cadastrados com sucesso',
            pet_register 
        })
    }
}

export default new PetController()