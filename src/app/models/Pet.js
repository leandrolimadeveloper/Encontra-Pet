import Sequelize, { Model } from 'sequelize';
import upload from '../../config/upload.js';

class Pet extends Model {
    static init(sequelize) {
        super.init(
            {
                pet_name: Sequelize.STRING,
                type_of_pet: Sequelize.STRING,
                gender: Sequelize.STRING,
                img: Sequelize.STRING,
                img_url: Sequelize.VIRTUAL,
                size: Sequelize.INTEGER,
                breed: Sequelize.STRING,
                reward: Sequelize.BOOLEAN,
                last_seen: Sequelize.DATE,
                missing: Sequelize.BOOLEAN,
                description: Sequelize.STRING,
            },
            {
                sequelize
            },
        )

        this.addHook('beforeSave', pet => {
            if (upload.storage['s3']) {
                pet.img_url = `${process.env.AWS_URL}/${pet.img}`
            } else {
                pet.img_url = `${process.env.LOCAL_URL}/files/${pet.img}`
            }
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }

}

export default Pet
