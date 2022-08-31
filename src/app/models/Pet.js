import sequelize, { Model, Sequelize } from "sequelize";
import upload from "../../config/upload";

class Pet extends Model {
    static init(sequelize) {
        super.init(
            {
                pet_name: Sequelize.STRING,
                type_of_pet: Sequelize.STRING,
                gender: Sequelize.STRING,
                thumbnail: Sequelize.STRING,
                thumbnail_url: Sequelize.VIRTUAL,
                breed: Sequelize.STRING,
                reward: Sequelize.BOOLEAN,
                last_seen: Sequelize.DATE,
                description: Sequelize.STRING,
            },
            {
                sequelize
            },
        )

        this.addHook('beforeSave', pet => {
            if (pet.thumbnail) {
                pet.thumbnail_url = `${process.env.LOCAL_URL}/files/${pet.thumbnail}`
            }
        })

        return this
    }


    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }

}

export default Pet
