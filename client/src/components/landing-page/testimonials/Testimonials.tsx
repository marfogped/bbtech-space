import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTag, TypeWritterEffect } from '../..';
import { 
  InstagramIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  TwitterIcon 
} from 'lucide-react';
import useWindowDimensions from '../../../lib/useWindowDimensions';

const Testimonials: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { windowWidth } = useWindowDimensions();
  const { t } = useTranslation('testimonials');

  const texts = [t('purple-word'), t('purple-word-second')];

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
          <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center flex flex-col items-center font-vt323 text-pretty">
            {t('title')}{" "}
            <TypeWritterEffect texts={texts} typingSpeed={100} deletingSpeed={100} />
          </h2>
        </div>
        
        <div className={`grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12 ${windowWidth < 768 && !isExpanded ? 'h-screen overflow-hidden' : 'h-auto'} `}>
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
        {windowWidth < 768 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="w-full py-2 text-center font-semibold text-neutral/80 hover:text-neutral transition-colors duration-200 underline text-xl mt-6"
          >
            { isExpanded ? t('see-less') : t('see-more')}
          </button>
        )}
      </div>
    </section>
  )
}

export default Testimonials