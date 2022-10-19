import Sequelize, { Model } from "sequelize";

class Address extends Model {
    static init(sequelize) {
        super.init(
            {
                street: Sequelize.STRING,
                number: Sequelize.INTEGER,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                zipcode: Sequelize.STRING
            },
            {
                sequelize
            },
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }

}

export default Address
