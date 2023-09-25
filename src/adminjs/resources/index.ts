import { ResourceWithOptions } from 'adminjs';
import { Category } from '../../models';
import { categoryResurceOptions } from './category';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResurceOptions
    }
];