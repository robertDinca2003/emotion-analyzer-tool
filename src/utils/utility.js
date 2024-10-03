import { toast } from 'react-toastify';

export const isApropriateLanguage = (data, isAlerting) => {
  let apropriate = true;
  //Types of inapropriate language
  let toVerify = [
    'Toxic',
    'Insult',
    'Profanity',
    'Sexual',
    'Violent',
    'Deth, Harm & Tragedy',
  ];
  // For every type of inapropriate language,
  // try to find if the confidence score for it is over 0.7
  for (let i = 0; i < toVerify.length; i++) {
    for (let j = 0; j < data.moderationCategories.length; j++) {
      if (data.moderationCategories[j].name == toVerify[i])
        if (data.moderationCategories[j].confidence >= 0.7) {
          if (isAlerting)
            warningNotify(
              `${toVerify[i]} language detected in your input, correct your input!`
            );
          apropriate = false;
          return false;
        }
    }
  }
  return apropriate;
};

export const messageEmotion = (docScore) => {
  //Depending of the score, gives a message describing the emotion transmited
  let score = docScore * 100;
  if (score > 70) {
    return 'strong pozitive';
  } else if (score > 33) {
    return 'pozitive';
  } else if (score > 0) {
    return 'neutral to pozitive';
  } else if (score > -33) {
    return 'netral to negative';
  } else if (score > -66) {
    return 'negative';
  } else return 'strong negative';
};

export const getSentimentColor = (score) => {
  // Depending of the score, return a color to represent the emotion
  if (score * 100 > 70) {
    return '#15803d';
  } else if (score * 100 > 33) {
    return '#4ade80';
  } else if (score * 100 > 0) {
    return '#ddff1d';
  } else if (score * 100 > -33) {
    return '#ffd61d';
  } else if (score * 100 > -66) {
    return '#f87171';
  } else return '#b91c1c';
};

export const getCurrentDate = () => {
  // Return the day, mounth, year, and milliseconds since 1970
  // when the object was created
  const today = new Date();
  return [
    today.getTime(),
    today.getDate(),
    today.getMonth(),
    today.getFullYear(),
  ];
};

export const warningNotify = (message) => {
  // console.log('notifying');
  toast.warn(message, {
    position: 'top-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
