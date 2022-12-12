import Pet from "../models/Pet.js"

class Dashboard {
    async show(req, res) {
        const { missing } = req.query

        const pets = await Pet.findAll({
            where: { missing }
        })

        return res.json(pets)
    }
}

export default new Dashboard()
