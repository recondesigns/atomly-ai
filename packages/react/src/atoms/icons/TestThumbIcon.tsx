import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TestThumbIcon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden={!title}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#000"
      fillRule="evenodd"
      d="M13.6 2.4a3.2 3.2 0 0 1 3.2 3.2v3.8h1.8a3.2 3.2 0 0 1 3.2 3.2q0 .119-.023.236l-1 4.999-.009.038c-.183.78-.545 1.525-1.097 2.077-.547.547-1.284.898-2.105.85H10.6c-.85 0-1.674-.26-2.366-.732q-.038.046-.079.087A2.2 2.2 0 0 1 6.6 20.8h-2a2.2 2.2 0 0 1-2.2-2.2v-7a2.203 2.203 0 0 1 2.2-2.2h3a2.8 2.8 0 0 0 2.8-2.8v-1a3.2 3.2 0 0 1 3.2-3.2m0 2.4a.8.8 0 0 0-.8.8v1a5.198 5.198 0 0 1-4 5.058V16.6a1.8 1.8 0 0 0 1.8 1.8h7l.101.004c.018.002.114.007.273-.152.17-.17.353-.48.457-.926l.961-4.805a.8.8 0 0 0-.226-.487.8.8 0 0 0-.566-.234h-3a1.2 1.2 0 0 1-1.2-1.2v-5a.8.8 0 0 0-.8-.8M4.8 18.4h1.6v-6.6H4.8z"
      clipRule="evenodd"
    />
  </svg>
);
export default TestThumbIcon;
