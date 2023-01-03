import * as Yup from 'yup';
import User from '../models/User.js';
import Pet from '../models/Pet.js';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(8),
        });

        try {
            await schema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err.errors,
            });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({
            error: false,
            message: 'Data successfully registered',
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when('oldPassword', (oldPassword, field) => {
                    oldPassword ? field.required() : field;
                }),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        try {
            await schema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err.errors,
            });
        }

        const { email, password, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res
                .status(401)
                .json({ error: 'The current password is incorrect' });
        }

        if (password === oldPassword) {
            return res.status(400).json({ error: 'Passwords are the same' });
        }

        const { id, name } = await user.update(req.body);

        res.json({
            error: false,
            message: 'Data successfully updated',
            id,
            name,
            email,
        });
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.userId);

        await Pet.findAll()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        await Pet.destroy({
            where: {
                user_id: user.id
            }
        })

        await User.destroy({
            user,
            where: {
                id: user.id,
            }
        })

        return res.json()
    }
}

export default new UserController();
