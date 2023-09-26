import { Response, Request } from "express";
import { courseService } from "../services/courseService";

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
