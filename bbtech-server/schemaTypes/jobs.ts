export default {
  title: 'Trabajos',
  name: 'jobs',
  type: 'document',
  fields: [
    {
      title: 'Título',
      name: 'title',
      type: 'string',
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
      title: 'Acerca del empleo',
      name: 'aboutWork',
      type: 'localizedString',
    },
    {
      title: 'Responsabilidades',
      name: 'responsibilities',
      type: 'array',
      of: [
        {
          title: 'Responsabilidad',
          name: 'responsibility',
          type: 'localizedString',
        },
      ],
    },
    {
      title: 'Requisitos',
      name: 'requirements',
      type: 'array',
      of: [
        {
          title: 'Requisito',
          name: 'requirement',
          type: 'localizedString',
        },
      ],
    },
    {
      title: 'Oferta laboral (beneficios)',
      name: 'workBenefits',
      type: 'array',
      of: [
        {
          title: 'Beneficio',
          name: 'workBenefit',
          type: 'localizedString',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title: string}) {
      return {
        title: title?.toUpperCase(),
      }
    },
  },
}
