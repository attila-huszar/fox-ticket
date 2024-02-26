import { Button } from '@nextui-org/react'

export function CtaSection() {
  return (
    <>
      <section>
        <div>
          <div>
            <div>
              <h2>Get your first ticket for free!</h2>
              <p>
                Quickly, hassle-free on the go solutions for buying tickets and
                passes. Start purchasing comfortably today. And the first ticket
                is on us!
              </p>
              <form>
                <div>
                  <label htmlFor="ctaName">
                    Full name:
                    <input
                      id="ctaName"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required></input>
                  </label>
                </div>
                <div>
                  <label htmlFor="ctaEmail">
                    E-mail:
                    <input
                      id="ctaEmail"
                      type="email"
                      name="email"
                      placeholder="me@example.com"
                      required></input>
                  </label>
                </div>
                <div>
                  <label htmlFor="select-where">
                    Where did you hear from us?
                  </label>
                  <select id="select-where" required>
                    <option value="">Please choose one option:</option>
                    <option value="friends">Friends and Family</option>
                    <option value="youtube">Youtube video</option>
                    <option value="facebook">Facebook ad</option>
                    <option value="podcast">Podcast</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <Button type="submit">I want the free ticket!</Button>
              </form>
            </div>
            <div>
              <img
                role="img"
                aria-label="woman enjoying buying tickets on phone"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
