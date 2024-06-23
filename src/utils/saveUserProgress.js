import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserProgress = async (moduleName, stepName, results) => {
    console.log(`Save User Settings: `);
    console.log(JSON.stringify(results));
  try {
    await AsyncStorage.setItem(
      `${moduleName}-${stepName}`,
      JSON.stringify(results),
    );
  } catch (err) {
    console.err('Error saving results to storage', err);
  }
};

export const retrieveUserProgress = async (moduleName, stepName) => {
  try {
    const results = await AsyncStorage.getItem(`${moduleName}-${stepName}`);
    return results ? JSON.parse(results) : [];
  } catch (err) {
    console.log(`Error retrieving results from storage`, err)
    return [];
  }
};
