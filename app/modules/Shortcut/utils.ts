export const useShortcut = () => {
  const isMac = typeof window !== 'undefined' ? /Mac/i.test(navigator.userAgent) : false;
  const isMobile = typeof window !== 'undefined' ? /iPhone|iPad|Android/i.test(navigator.userAgent) : false;


  return { isMac, isMobile}
}
