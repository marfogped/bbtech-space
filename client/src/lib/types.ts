export interface TestimonialsProps {
  userName?: string;
  userIcon?: string;
  description?: string;
  socialMedia?: "LinkedIn" | "Facebook" | "Instagram" | "Twitter";
  testimonialLink?: string;
}

interface AreasProps {
  area?: string;
  requirement?: string;
  responsibility?: string;
  workBenefit?: string;
}

export interface JobsProps {
  _id: string;
  title?: string;
  areas?: AreasProps[];
  offices?: number;
  employees?: number;
  aboutWork: string;
  requirements: AreasProps[];
  responsibilities: AreasProps[];
  workBenefits: AreasProps[];
}

export interface ServicesProps {
  title?: string;
  description?: string;
  tag?: string;
  splineModelUrl?: string;
}

export interface HomeProps {
  _id: string;
  type?: string;
  showSection: boolean;
  hero_title?: string;
  hero_purple_word?: string;
  hero_purple_word_second?: string;
  description?: string;
  btn_1?: string;
  btn_2?: string;
  about_title?: string;
  about_purple_word?: string;
  about_purple_word_second?: string;
  about_tag_label?: string;
  description_1?: string;
  description_2?: string;
  services_title?: string;
  services_purple_word?: string;
  services_purple_word_second?: string;
  services_tag_label?: string;
  services?: ServicesProps[];
  jobs_title?: string;
  jobs_purple_word?: string;
  jobs_purple_word_second?: string;
  jobs_tag_label?: string;
  jobs?: JobsProps[];
  testimonials_title?: string;
  testimonials_purple_word?: string;
  testimonials_purple_word_second?: string;
  testimonials_tag_label?: string;
  testimonials?: TestimonialsProps[];
}

export interface SubSectionTranslation {
  title: string;
  content: string;
}

export interface SectionTranslationProps {
  section: string;
  subSections: SubSectionTranslation[];
}
