import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TestThumb2Icon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      d="M14 3a3 3 0 0 1 2.995 2.824L17 6v4h2a3 3 0 0 1 2.98 2.65l.015.174L22 13l-.02.196-1.006 5.031c-.381 1.627-1.502 2.797-2.81 2.78L18 21h-8a1 1 0 0 1-.993-.883L9 20l.001-9.536a1 1 0 0 1 .5-.865 3 3 0 0 0 1.492-2.397L11 7V6a3 3 0 0 1 3-3M6 10a1 1 0 0 1 .993.883L7 11v9a1 1 0 0 1-.883.993L6 21H5a2 2 0 0 1-1.995-1.85L3 19v-7a2 2 0 0 1 1.85-1.995L5 10z"
    />
  </svg>
);
export default TestThumb2Icon;
