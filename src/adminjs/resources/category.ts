import { ResourceOptions } from "adminjs";

export const categoryResurceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'position'],
    filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'position'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt']
}