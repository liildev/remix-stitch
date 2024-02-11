import { MouseEventHandler, useRef } from 'react'
import { parseISO, intervalToDuration } from 'date-fns'
import { useToast } from '~/context';
import { LottieRef } from 'lottie-react'

export const getDuration = (startDate: string, endDate?: string): string => {
  const durationObj: Duration = intervalToDuration({
    start: parseISO(startDate),
    end: endDate ? parseISO(endDate) : new Date(),
  });

  let durationStr = '';

  if (durationObj.years !== undefined) {
    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `;
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `;
    }
  }

  if (durationObj.months !== undefined) {
    durationStr += `${durationObj.months} mos`;
  }

  return durationStr;
};

export const useBio = (description: string) => {
  const copyBioRef: LottieRef = useRef(null);
  const downloadRef: LottieRef = useRef(null);
  const { setToast } = useToast();

  const downloadHeadShot = () => {
    setToast(
      'Downloading...',
      'You can now add this photo to your fancy site.',
      true,
      true)
  }

  const copyBio: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToast(
      'Copied :D',
      'You can now paste it anywhere.',
      true,
      true)
  }

  return {
    copyBio,
    downloadHeadShot,
    copyBioRef,
    downloadRef,
  }
}
