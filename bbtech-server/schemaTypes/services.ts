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
      title: 'Image',
      description: 'Recommendation: Upload images with 150x150px with .webp file format',
      name: 'image',
      type: 'image',
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
    prepare({titleEs}: {titleEs: string}) {
      return {
        title: titleEs.toUpperCase(),
      }
    },
  },
}
