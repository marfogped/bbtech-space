import {SanityDocument} from '@sanity/types'

// --- DOCUMENT TYPES ---
const NAVBAR = 'navbar'
const HERO = 'hero'
const ABOUT = 'about'
const SERVICES = 'services'
const JOBS = 'jobs'
const TESTIMONIALS = 'testimonials'
const FOOTER = 'footer'
const CONTACT = 'contact'

const option = [HERO, ABOUT, SERVICES, JOBS, TESTIMONIALS, CONTACT, FOOTER, NAVBAR]

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: option,
      },
    },
    {
      name: 'showSection',
      title: 'Mostrar sección',
      type: 'boolean',
      options: {
        layout: 'radio',
        list: [
          {title: 'Si', value: true},
          {title: 'No', value: false},
        ],
      },
    },
    {
      title: 'Acerca De',
      name: 'navbar_about',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== NAVBAR,
    },
    {
      title: 'Servicios',
      name: 'navbar_services',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== NAVBAR,
    },
    {
      title: 'Trabajos',
      name: 'navbar_jobs',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== NAVBAR,
    },
    {
      title: 'Título',
      name: 'hero_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },
    {
      title: 'Palabra con Background',
      name: 'hero_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'hero_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },
    {
      title: 'Botón 1',
      name: 'btn_1',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },
    {
      title: 'Botón 2',
      name: 'btn_2',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== HERO,
    },

    // ----- About -----

    {
      title: 'Título',
      name: 'about_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },
    {
      title: 'Palabra con Background',
      name: 'about_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'about_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },
    {
      title: 'Etiqueta de la Sección',
      name: 'about_tag_label',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },
    {
      title: 'Descripción - Párrafo 1',
      name: 'description_1',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },
    {
      title: 'Descripción - Párrafo 2',
      name: 'description_2',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== ABOUT,
    },

    // ----- Services -----

    {
      title: 'Título',
      name: 'services_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== SERVICES,
    },
    {
      title: 'Palabra con Background',
      name: 'services_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== SERVICES,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'services_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== SERVICES,
    },
    {
      title: 'Etiqueta de la Sección',
      name: 'services_tag_label',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== SERVICES,
    },
    {
      title: 'Servicios',
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'services'}],
        },
      ],
      options: {
        limit: 2,
      },
      hidden: ({document}: {document: SanityDocument}) => document.type !== SERVICES,
    },

    // ----- Jobs -----

    {
      title: 'Título',
      name: 'jobs_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== JOBS,
    },
    {
      title: 'Palabra con Background',
      name: 'jobs_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== JOBS,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'jobs_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== JOBS,
    },
    {
      title: 'Etiqueta de la Sección',
      name: 'jobs_tag_label',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== JOBS,
    },
    {
      title: 'Trabajos',
      name: 'jobs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'jobs'}],
        },
      ],
      options: {
        limit: 8,
      },
      hidden: ({document}: {document: SanityDocument}) => document.type !== JOBS,
    },

    // ----- Testimonials -----
    {
      title: 'Título',
      name: 'testimonials_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },
    {
      title: 'Descripción',
      name: 'testimonials_description',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },
    {
      title: 'Palabra con Background',
      name: 'testimonials_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'testimonials_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },
    {
      title: 'Etiqueta de la Sección',
      name: 'testimonials_tag_label',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },
    {
      title: 'Testimonios',
      name: 'testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'testimonials'}],
        },
      ],
      options: {
        limit: 8,
      },
      hidden: ({document}: {document: SanityDocument}) => document.type !== TESTIMONIALS,
    },

    // ----- Contact -----
    {
      title: 'Título',
      name: 'contact_title',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== CONTACT,
    },
    {
      title: 'Descripción',
      name: 'contact_description',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== CONTACT,
    },
    {
      title: 'Palabra con Background',
      name: 'contact_purple_word',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== CONTACT,
    },
    {
      title: 'Segunda Palabra con Background',
      name: 'contact_purple_word_second',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== CONTACT,
    },
    {
      title: 'Etiqueta de la Sección',
      name: 'contact_tag_label',
      type: 'localizedString',
      hidden: ({document}: {document: SanityDocument}) => document.type !== CONTACT,
    },

    // ----- Footer -----

    {
      title: 'Oficinas',
      name: 'offices',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'offices'}],
        },
      ],
      options: {
        limit: 3,
      },
      hidden: ({document}: {document: SanityDocument}) => document.type !== FOOTER,
    },
    {
      title: 'Mail para Empresas',
      name: 'companies_mail',
      type: 'string',
      hidden: ({document}: {document: SanityDocument}) => document.type !== FOOTER,
    },
    {
      title: 'Mail para Candidatos',
      name: 'workers_mail',
      type: 'string',
      hidden: ({document}: {document: SanityDocument}) => document.type !== FOOTER,
    },
  ],
  preview: {
    select: {
      title: 'type',
    },
    prepare({title}: any) {
      return {
        title: title.toUpperCase(),
      }
    },
  },
}
