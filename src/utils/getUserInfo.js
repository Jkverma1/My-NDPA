const calculateAge = birthday => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  console;
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  if (age < 5) {
    age = 5;
  }
  return age;
};

export const getUserInfo = user => {
  if (user) {
    const name = (user.fullName && user.fullName.split(' ')[0]) || 'David';
    const age = calculateAge(user.birthday) || 12;
    const symptom = 'dyslexia';
    const gender = 'male';

    return {name, age, symptom, gender};
  } else {
    return {name: 'David', age: '12', symptom: 'dyslexia', gender: 'male'}
  }
};
