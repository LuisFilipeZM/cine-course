import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";
import { json } from "sequelize";

export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists){
                throw new Error('Este email já está em uso.')
            }

            const user = await userService.create({
                firstName,
                lastName,
                email,
                password,
                birth,
                phone,
                role: 'user'
            })
            return res.status(201).json(user)
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

            user.checkPassword(password, (err, isSame) => {
                if (err) return res.status(400).json({ message: err.message })
                if (!isSame) return res.status(400).json({ message: 'Senha incorreta.' })
            })

            const payload = {
                id: user.id,
                firstNAme: user.firstName,
                email: user.email,
            }
            const token = await jwtService.signToken(payload, '1d')

            return res.json({ authenticated: true, ...payload, token })
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    }
}