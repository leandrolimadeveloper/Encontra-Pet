import Pet from "../models/Pet"

class Dashboard {
    async show(req, res) {
        const pets = await Pet.findAll()

        return res.json(pets)
    }
}

export default new Dashboard()
