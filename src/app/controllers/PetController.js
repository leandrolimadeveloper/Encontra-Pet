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
        const schema = Yup.object().shape({
            pet_name: Yup.string().required(),
            type_of_pet: Yup.string().required(),
            gender: Yup.string().required(),
            img: Yup.string(),
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

        const { key, size } = req.file
        const user_id = req.userId

        const { pet_name, type_of_pet, gender, breed, reward, last_seen, description } = req.body

        const pet_register = await Pet.create({
            user_id: req.userId,
            pet_name,
            type_of_pet,
            gender,
            size,
            img: key,
            breed,
            reward,
            last_seen,
            description,
        })

        return res.json({
            error: false,
            message: 'Dados cadastrados com sucesso',
            pet_register
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            pet_name: Yup.string().required(),
            type_of_pet: Yup.string().required(),
            gender: Yup.string().required(),
            img: Yup.string(),
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

        const { key, size } = req.file
        const user_id = req.userId
        const { pet_id } = req.params

        const pet = await Pet.findOne({ where: { id: pet_id } })

        if (!pet) {
            return res.status(404).json({ error: 'Dado não encontrado' })
        }

        if (String(user_id) !== String(pet.user_id)) {
            return res.status(401).json({ error: 'Não autorizado' })
        }

        const { pet_name, type_of_pet, gender, breed, reward, last_seen } = req.body

        await pet.update({
            user_id,
            pet_name,
            type_of_pet,
            gender,
            img: key,
            size,
            breed,
            reward,
            last_seen,
        })

        return res.json({
            error: false,
            message: 'Dados atualizados com sucesso',
            pet
        })
    }

    async destroy(req, res) {
        const { pet_id } = req.body
        const user_id = req.userId

        const pet = await Pet.findOne({ where: { id: pet_id } })

        if (!pet) {
            return res.status(404).json({ error: 'Dado não encontrado' })
        }

        if (String(user_id) !== String(pet.user_id)) {
            return res.status(401).json({ error: 'Não autorizado' })
        }

        await Pet.destroy({ where: { id: pet_id } })

        return res.json({
            error: false,
            message: 'Dado excluído com sucesso'
        })
    }
}

export default new PetController()
