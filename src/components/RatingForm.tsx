import { useState, useEffect, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import star from "../assets/star.png";
import Logo from "../assets/Logo-medium.svg";

const RatingForm = () => {
  const [submitForm, setSubmitForm] = useState<boolean>(false);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  // Check localStorage on component mount
  useEffect(() => {
    const storedSubmission = JSON.parse(localStorage.getItem('submittedForm') || 'false');
      // Reset state to hide form and thank you section on refresh
    if (storedSubmission) {
      setSubmitForm(true);
      setShowThankYou(true);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitForm(true);
    setShowThankYou(false);
    localStorage.setItem('submittedForm', JSON.stringify(true));  // Store the submission status in localStorage

    emailjs.sendForm(
      import.meta.env.VITE_REACT_Service,
      import.meta.env.VITE_REACT_Template,
      event.target as HTMLFormElement,
      import.meta.env.VITE_REACT_Public_Key
    )
      .then(() => {
        console.log('SUCCESS!');
      }, (error: any) => {
        console.log('FAILED...', error);
      });
  };

  const handleStarClick = (value: number) => {
    setCurrentRating(value);
  };

  return (
    <section className="mt-8 pl-3">
      {!submitForm ? (  // Show the form if submitForm is false
        <>
          <p className="text-gray max-w-[250px] text-center mx-auto leading-[19.5px] text-[.9rem]">
            Did you enjoy using our extension?
            All feedback is appreciated to help
            us improve our offering!
          </p>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center gap-6 my-4'>
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value}
                  type='button'
                  onClick={() => handleStarClick(value)}>
                  <img
                    src={star}
                    alt={`star ${value}`}
                    className={`cursor-pointer hover:opacity-100 
                  ${currentRating && value <= currentRating ? 'opacity-100' : 'opacity-50'}`}
                  />
                </button>
              ))}
            </div>
            <div className='flex flex-col gap-2'>
              <textarea
                name="message"
                className='resize-none outline-none bg-dark-blue pl-3 text-white rounded-[10px] py-3'
                required>
              </textarea>
              <button className='bg-dark-blue text-white max-w-[90px] mx-auto w-full mt-3 py-1 rounded-[10px] hover:opacity-70'
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        !showThankYou && (
          <section id="submitted-section"
            className='flex flex-col items-center mt-10 gap-2 text-center'>
            <img className='w-[50px] h-[50px]'
              src={Logo}
              alt="Logo"
            />
            <p className='text-dark-blue font-bold'>
              You gave us {currentRating} stars
            </p>
            <span id="rate"></span>
            <h3 className='text-dark-blue font-bold'>Thank you!</h3>
            <p className='text-gray'>
              We appreciate you taking the time to give us feedback.
              If you need any support, feel free to get in touch!
            </p>
          </section>
        )
      )}
    </section>
  );
};

export default RatingForm;
