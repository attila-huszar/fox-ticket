import '../styles/CtaSection.css';
import { Button } from '@nextui-org/react';

export default function CtaSection() {

  return (
    <>
      <section className="sectionCta">
        <div>
          <div className='sectionCtaContainer'>
            <div className="ctaTextBox">
              <h2 className='headingSecondary'>
                Get your first ticket for free!
              </h2>
              <p className='ctaText'>
                Quickly, hassle-free on the go solutions for buying tickets and passes. Start purchasing comfortably today. And the first ticket is on us!
              </p>
              <form className="ctaForm" action='#'>
                <div>
                <label htmlFor='ctaName'>Full name: 
                  <input id="ctaName" className='ctaForm' type="text" name='name' placeholder='John Doe' required></input>
                </label>
                </div>
                <div>
                <label htmlFor='ctaEmail'>E-mail:
                  <input id="ctaEmail" className='ctaForm' type="email"  name='email' placeholder='me@example.com' required></input>
                </label>
                  </div>
                  <div>
                  <label htmlFor='select-where'>
                    Where did you hear from us?</label>
                  <select id='select-where' required>
                    <option value="">Please choose one option:</option>
                    <option value="friends">Friends and Family</option>
                    <option value="youtube">Youtube video</option>
                    <option value="facebook">Facebook ad</option>
                    <option value="podcast">Podcast</option>
                    <option value="others">Others</option>
                  </select>
                  </div>
                <Button type='submit' className='ctaSignUpButton'> 
                I want the free ticket!
                </Button>
              </form>
            </div>
            <div className="ctaImageBox">
              <img
                className="ctaPic"
                role="img"
                aria-label="woman enjoying buying tickets on phone"
              />
            </div>
            </div>
          </div>
      </section>
    </>
  );
}
