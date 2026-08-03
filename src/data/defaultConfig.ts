import { AppConfig } from '../types';

import sadImg from '../components/Screenshots/sad.jpg';
import happyImg from '../components/Screenshots/happy.jpg';
import step1Img from '../components/Screenshots/step1.jpg';
import step2Img from '../components/Screenshots/step2.jpg';
import step3Img from '../components/Screenshots/step3.jpg';
import step4Img from '../components/Screenshots/step4.jpg';
import step5Img from '../components/Screenshots/step5.jpg';

export const defaultConfig: AppConfig = {
  appName: 'Sport Buddy',
  developerName: 'MoerveanDev',
  groupUrl: 'https://groups.google.com/g/aplikacja-sportbuddy-wczesny-dostep',
  appUrl: 'https://play.google.com/store/apps/details?id=com.moerveandev.sportbuddy',
  ga4MeasurementId: 'G-PW28VWLML9',
  customStepImages: {
    happy: happyImg,
    sad: sadImg,
    step1: step1Img,
    step2: step2Img,
    step3: step3Img,
    step4: step4Img,
    step5: step5Img,
  },
};
