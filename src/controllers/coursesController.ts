import { Response, Request } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesController = {
    featured: async (req: Request, res: Response) => {       
        try {
            const featureCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featureCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    newest: async (req: Request, res: Response) => {       
        try {
            const newestCourses = await courseService.getoTopTenNewest()
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    search: async (req: Request, res: Response) => {
        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if (typeof name !== 'string') throw new Error('Name must be a string')
            const courses = await courseService.findByName(name, page, perPage)
            return res.json(courses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id }  = req.params
        
        try {
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}
