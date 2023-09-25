import { ResourceWithOptions } from 'adminjs';
import { Category, Course } from '../../models';
import { categoryResurceOptions } from './category';
import { courseResourceOptions } from './course';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResurceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions
    }
];