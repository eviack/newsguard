import React from 'react';

const Heading = () => {
  return (
    <div className="flex flex-col bg-dark-2 justify-center w-full">
      <h1 className="text-4xl font-bold text-light-1 mb-6">
        Authenticity of a News floating around
        <span className="inline-block w-[3px] h-8 bg-primary-500 animate-blink ml-2"></span>
      </h1>
      <p className="text-md text-light-3 mb-8 leading-relaxed">
        Tired of fake news spreading around ? Leave it to NewsGuard, an AI Agent that analyses it for you ! 
      </p>
      
    </div>
  );
};

export default Heading;