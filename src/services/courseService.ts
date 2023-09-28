import { Op } from "sequelize"
import { Course } from "../models"

export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        })

        return courseWithEpisodes
    },

    getRandomFeaturedCourses: async () => {
        const feturedCourses = await Course.findAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                featured: true
            }
        })

        const randomFeaturedCourses = feturedCourses.sort(() => 0.5 - Math.random())

        return randomFeaturedCourses.slice(0, 3)
    },

    getoTopTenNewest: async () => {
        const courses = await Course.findAll({
            limit: 10,
            order: [['created_at', 'DESC']],
        })

        return courses
    },

    getTopTenByLikes: async () => {
        const result = await Course.sequelize?.query(
            `SELECT 
                c.id, 
                c.name, 
                c.synopsis, 
                c.thumbnail_url AS "thumbnailUrl", 
                COUNT(users.id) AS likes
            FROM courses c
                LEFT OUTER JOIN likes
                    ON c.id = likes.course_id
                    INNER JOIN users
                        ON likes.user_id = users.id
            GROUP BY c.id
            ORDER BY likes DESC
            LIMIT 10;`,
        )

        if (result) {
            const [topTen, metadata] = result
            return topTen
        } else {
            return null
        }
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage

        const { count, rows} = await Course.findAndCountAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: perPage,
            offset
        })

        return {
            courses: rows,
            page,
            perPage,
            total: count
        }
    }
}