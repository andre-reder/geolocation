/// <reference types="react-scripts" />
declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H: any;
}
