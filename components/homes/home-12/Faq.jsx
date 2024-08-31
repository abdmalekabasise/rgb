import { faqs3 } from "@/data/faq";
import Image from "next/image";

export default function Faq({ nonce }) {
  return (
    <section className="bg-light-base py-24 dark:bg-jacarta-800">
      <div className="container">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="mb-6 text-center font-display text-3xl font-medium text-jacarta-700 dark:text-white">
            What Is EliteBoost all about?
          </h2>
          <p className="text-lg dark:text-jacarta-300">
            Browse our FAQs to find answers to your questions about EliteBoost.
          </p>
        </div>
        <div className="lg:flex lg:flex-nowrap">
          <div className="lg:w-[59%]">
            <figure className="relative mb-8 overflow-hidden rounded-3xl">
              <Image
                width={639}
                height={546}
                src="/img/ico-landing/ico_landing_promo.png"
                className=""
                alt="image"
              />
            </figure>
          </div>
          <div className="lg:w-[41%] lg:pl-24">
            <p className="mt-10 mb-5 dark:text-jacarta-300">
              Looking to work with us? Here are some of the most common questions
            </p>
            <a
              href="#"
              className="mb-10 inline-block text-sm font-bold text-accent"
            >
              Learn More
            </a>

            <div className="accordion mx-auto max-w-[35rem]" id="accordionFAQ">
              {faqs3.map((elm, i) => (
                <div
                  key={i}
                  className="accordion-item mb-5 overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600"
                >
                  <h2 className="accordion-header" id={`faq-heading-${elm.id}`}>
                    <button
                      className={`accordion-button collapsed relative flex w-full items-center justify-between bg-white px-4 py-3 text-left font-display text-sm text-jacarta-700 dark:bg-jacarta-700 dark:text-white`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${elm.id}`}
                      aria-expanded={true}
                      aria-controls={`faq-${elm.id}`}
                      data-nonce={nonce} // Use nonce for inline scripts if necessary
                    >
                      <span>{elm.question}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="accordion-arrow h-4 w-4 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`faq-${elm.id}`}
                    className={`accordion-collapse collapse visible`}
                    aria-labelledby={`faq-heading-${elm.id}`}
                    data-bs-parent="#accordionFAQ"
                  >
                    <div className="accordion-body border-t border-jacarta-100 bg-white p-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <p className="dark:text-jacarta-200">{elm.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
