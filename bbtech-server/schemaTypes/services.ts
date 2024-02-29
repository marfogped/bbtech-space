export default {
    title: 'Servicios',
    name: 'services',
    type: 'document',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'localizedString',
      },
      {
        title: 'Description',
        name: 'description',
        type: 'localizedString',
      },
      {
        title: 'Tag',
        name: 'tag',
        type: 'localizedString',
      },
      {
        title: 'Button',
        name: 'btn',
        type: 'localizedString',
      },
      {
        title: 'URL del Modelo de Spline',
        name: 'splineModelUrl',
        type: 'url',
    },
    ],
    preview: {
      select: {
        titleEs: 'title.es',
      },
      prepare({titleEs} : {titleEs : string}) {
        return {
          title: titleEs.toUpperCase(),
        }
      },
    },
};
  