const option = ['LinkedIn', 'Facebook', 'Instagram', 'Twitter']

export default {
    title: 'Testimonios',
    name: 'testimonialItem',
    type: 'document',
    fields: [
        {
            title: 'Nombre',
            name: 'userName',
            type: 'localizedString',
        },
        {
            title: 'Icono de Usuario',
            name: 'userIcon',
            type: 'url',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'localizedString',
        },
        {
            title: 'URL del Testimonio',
            name: 'testimonialLink',
            type: 'url',
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
            list: option
            },
        },
        {
            title: 'Red Social',
            name: 'socialMedia',
            type: 'url',
        },
        {
            title: 'Button',
            name: 'btn',
            type: 'localizedString',
        },
    ],
};
  