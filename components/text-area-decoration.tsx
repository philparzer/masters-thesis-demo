interface TextAreaDecorationProps {
    isLoading: boolean;
}

const TextAreaDecoration = ({isLoading}: TextAreaDecorationProps) => {
  return (
    <>
      <svg
        width="8"
        height="8"
        className={` dark:stroke-white ${isLoading ? "animate-pulse" : ""}`}
        viewBox="0 0 72 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.874634"
          y="0.539673"
          width="70.2224"
          height="10.686"
          className="dark:fill-white fill-black"
        />
        <rect
          x="11.5607"
          y="0.539673"
          width="70.2224"
          height="10.686"
          transform="rotate(90 11.5607 0.539673)"
          className="dark:fill-white fill-black"
        />
      </svg>
      <svg
        className={`right-0 absolute top-0 scale-x-[-1] ${
          isLoading ? "animate-pulse" : ""
        }`}
        width="8"
        height="8"
        viewBox="0 0 72 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.874634"
          y="0.539673"
          width="70.2224"
          height="10.686"
          className="dark:fill-white fill-black"
        />
        <rect
          x="11.5607"
          y="0.539673"
          width="70.2224"
          height="10.686"
          transform="rotate(90 11.5607 0.539673)"
          className="dark:fill-white fill-black"
        />
      </svg>
      <svg
        className={`bottom-0 absolute scale-y-[-1] ${
          isLoading ? "animate-pulse" : ""
        }`}
        width="8"
        height="8"
        viewBox="0 0 72 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.874634"
          y="0.539673"
          width="70.2224"
          height="10.686"
          className="dark:fill-white fill-black"
        />
        <rect
          x="11.5607"
          y="0.539673"
          width="70.2224"
          height="10.686"
          transform="rotate(90 11.5607 0.539673)"
          className="dark:fill-white fill-black"
        />
      </svg>
      <svg
        className={`bottom-0 right-0 absolute scale-y-[-1] scale-x-[-1] ${
          isLoading ? "animate-pulse" : ""
        }`}
        width="8"
        height="8"
        viewBox="0 0 72 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.874634"
          y="0.539673"
          width="70.2224"
          height="10.686"
          className="dark:fill-white fill-black"
        />
        <rect
          x="11.5607"
          y="0.539673"
          width="70.2224"
          height="10.686"
          transform="rotate(90 11.5607 0.539673)"
          className="dark:fill-white fill-black"
        />
      </svg>
    </>
  );
};

export default TextAreaDecoration;
