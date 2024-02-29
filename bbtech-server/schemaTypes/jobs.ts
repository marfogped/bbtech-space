export default {
  title: 'Trabajos',
  name: 'jobs',
  type: 'document',
  fields: [
    {
      title: 'Empresa',
      name: 'company',
      type: 'string',
    },
    {
      title: 'Logo de Empresa',
      name: 'companyIcon',
      type: 'image',
    },
    {
      title: 'Areas',
      name: 'areas',
      type: 'array',
      of: [
        {
          title: 'Area',
          name: 'area',
          type: 'localizedString',
        },
      ],
    },
    {
      title: 'Cantidad de Oficinas',
      name: 'offices',
      type: 'number',
    },
    {
      title: 'Cantidad de empleados',
      name: 'employees',
      type: 'number',
    },
    {
      title: 'Cantidad de Trabajos Disponibles',
      name: 'jobs',
      type: 'number',
    },
  ],
  preview: {
    select: {
      companyEs: 'company',
    },
    prepare({companyEs}: {companyEs: string}) {
      return {
        title: companyEs.toUpperCase(),
      }
    },
  },
}
