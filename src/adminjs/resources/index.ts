import { ResourceWithOptions } from 'adminjs';
import { Category, Course, Episode } from '../../models';
import { categoryResurceOptions } from './category';
import { courseResourceOptions } from './course';
import { episodeResourceFeatures, episodeResourceOptions } from './episode';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResurceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
];