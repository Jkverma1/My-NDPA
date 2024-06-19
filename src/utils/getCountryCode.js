import axios from 'axios';

const getCountryCode = async (countryName) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    if (response.data && response.data.length > 0) {
      return response.data[0].cca2; // Returns the 2-letter country code
    } else {
      throw new Error('Country not found');
    }
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
};

export default getCountryCode;