import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTag } from '../..';
import { 
  InstagramIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  TwitterIcon 
} from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t } = useTranslation('testimonials');

  const testimonials: {
    _id: string;
    username: string;
    userIcon: string;
    description: string;
    testimonialLink: string;
    socialMedia: string;
    btn: string;
  }[] = t('testimonials', { returnObjects: true });
  
  return (
    <section className="w-full h-max py-24">
      <div className="section-container">

        <div className="flex flex-col items-center gap-5">
          <SectionTag index={4} label={t('tag-label')} />
          <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center font-vt323 text-pretty">
            {t('title')}{" "}
            <span className="bg-purplePrimary block w-max mx-auto text-black">
              {t('purple-word')}
            </span>{" "}
          </h2>
        </div>
        
        <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12'>
          {
            testimonials.map((testimonial) => (
              <article 
              key={testimonial._id}
              className='testimonial-card'
              >
                <div className='flex items-center gap-6 w-full'>
                  <img 
                  src={testimonial.userIcon} 
                  alt={testimonial.username} 
                  className='h-20 rounded-full'
                  />

                  <div className='flex flex-col justify-start'>
                    <h3 className='font-vt323 text-2xl'>{testimonial.username}</h3>
                    <span className='flex items-center text-lg gap-2 font-zenKaku'>
                      { testimonial.socialMedia === "Facebook" && (<FacebookIcon size={20} />)}
                      { testimonial.socialMedia === "Instagram" && (<InstagramIcon size={20} />)}
                      { testimonial.socialMedia === "LinkedIn" && (<LinkedinIcon size={20} />)}
                      { testimonial.socialMedia === "Twitter" && (<TwitterIcon size={20} />)}
                      {testimonial.socialMedia}
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <p className='font-zenKaku text-md'>{testimonial.description}</p>
                </div>

                <div className='w-full flex justify-end mt-4'>
                  <a 
                  target='_blank'
                  className='underline text-neutral/90 hover:text-neutral font-zenKaku text-md'
                  href={testimonial.testimonialLink}
                  aria-label={`${testimonial.username}`}
                  >
                    {testimonial.btn}
                  </a>
                </div>
              </article>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Testimonials