export default {
  title: 'Oficinas',
  name: 'offices',
  type: 'document',
  fields: [
    {
      title: 'País',
      name: 'country',
      type: 'localizedString',
    },
    {
      title: 'Dirección',
      name: 'address',
      type: 'localizedString',
    },
  ],
  preview: {
    select: {
      titleEs: 'country.es',
    },
    prepare({titleEs}: {titleEs: string}) {
      return {
        title: titleEs.toUpperCase(),
      }
    },
  },
}
