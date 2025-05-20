import React from 'react';

const FeedbackButton: React.FC = () => {
  const handleClick = () => {
    window.open('https://forms.gle/32KQLunBgG1wXzMz9', '_blank');
  };

  return (
    <button 
      className="fixed bottom-5 right-5 w-[60px] h-[60px] rounded-full bg-gray-300 text-white border-0 shadow-lg flex items-center justify-center cursor-pointer z-50 transition-all duration-300 ease-in-out hover:bg-gray-400 hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
      aria-label="Send feedback"
    >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="white" 
      width="30px" 
      height="30px" 
      aria-hidden="true"
      className="w-[30px] h-[30px]"
    >
      <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2ZM20 18L18 16H4V4H20V18Z" />
    </svg>
    </button>
  );
};

export default FeedbackButton;
