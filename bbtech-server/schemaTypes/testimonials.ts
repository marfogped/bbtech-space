const option = ['LinkedIn', 'Facebook', 'Instagram', 'Twitter']

export default {
    title: 'Testimonios',
    name: 'testimonialItem',
    type: 'document',
    fields: [
        {
            title: 'Nombre',
            name: 'userName',
            type: 'string',
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
            title: 'Red Social',
            name: 'socialMedia',
            type: 'string',
            options: {
                list: option
            },
        },
        {
            title: 'URL del Testimonio',
            name: 'testimonialLink',
            type: 'url',
        },
    ],
};
  