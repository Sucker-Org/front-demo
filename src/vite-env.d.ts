declare module '*.less' {
  const map: Record<string, string>;
  export = map;
}

declare module '*.png' {
  const path: string;

  export default path;
}
declare module '*.gif' {
  const path: string;

  export default path;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

/* declare interface Window {
  ethereum: any
} */

/* declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
} */