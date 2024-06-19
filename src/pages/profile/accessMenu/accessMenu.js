import 'react-native-gesture-handler';
import {AccessibilityInfo} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Invert} from 'react-native-color-matrix-image-filters';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useAuth} from '../../../contexts/AuthContext';
import {saveUserSettings} from '../../../redux/slices/settings';
import Header from '../../../components/header';
import {dispatch} from '../../../redux/store';
import {screensEnabled} from 'react-native-screens';

const icons = {
  biggerTextIcon: require('../../../../assets/icons/profile/access_menu/biggerText.png'),
  contrastIcon: require('../../../../assets/icons/profile/access_menu/contrast.png'),
  dictionaryIcon: require('../../../../assets/icons/profile/access_menu/dictionary.png'),
  dyslexiaFriendlyIcon: require('../../../../assets/icons/profile/access_menu/dyslexiaFriendly.png'),
  lineHeightIcon: require('../../../../assets/icons/profile/access_menu/lineHeight.png'),
  hightlightLinksIcon: require('../../../../assets/icons/profile/access_menu/highlightLinks.png'),
  pageStructureIcon: require('../../../../assets/icons/profile/access_menu/pageStructure.png'),
  screenReaderIcon: require('../../../../assets/icons/profile/access_menu/screenReader.png'),
  saturationIcon: require('../../../../assets/icons/profile/access_menu/saturation.png'),
  smartContrastIcon: require('../../../../assets/icons/profile/access_menu/smartContrast.png'),
  textSpacingIcon: require('../../../../assets/icons/profile/access_menu/textSpacing.png'),
  textAlignIcon: require('../../../../assets/icons/profile/access_menu/textAlign.png'),
  voiceIcon: require('../../../../assets/icons/profile/access_menu/voiceSettings.png'),
  warningIcon: require('../../../../assets/icons/profile/access_menu/warning.png'),
};

const accessibilityOptions = [
  {
    key: 'screenReader',
    label: 'Screen Reader',
    modes: ['Screen Reader', 'Normal', 'Fast', 'Slow'],
    icon: icons.screenReaderIcon,
    warn: true,
  },
  {
    key: 'contrast',
    label: 'Contrast +',
    modes: ['Contrast +', 'Invert Color', 'Dark Contrast', 'Light Contrast'],
    icon: icons.contrastIcon,
  },
  {
    key: 'smartContrast',
    label: 'Smart Contrast',
    boolean: true,
    icon: icons.smartContrastIcon,
  },
  {
    key: 'highlightLinks',
    label: 'Highlight Links',
    boolean: true,
    icon: icons.hightlightLinksIcon,
  },
  {
    key: 'biggerText',
    label: 'Bigger Text',
    modes: ['Bigger Text', 'Small', 'Medium', 'Big'],
    icon: icons.biggerTextIcon,
  },
  {
    key: 'textSpacing',
    label: 'Text Spacing',
    modes: ['Text Spacing', 'Small', 'Medium', 'Big'],
    icon: icons.textSpacingIcon,
  },
  {
    key: 'dyslexiaFriendly',
    label: 'Dyslexia Friendly',
    modes: ['Dyslexia Friendly', 'Legible Font'],
    icon: icons.dyslexiaFriendlyIcon,
    warn: true,
  },
  {
    key: 'pageStructure',
    label: 'Page Structure',
    boolean: true,
    icon: icons.pageStructureIcon,
  },
  {
    key: 'lineHeight',
    label: 'Line Height',
    modes: ['Line Height', 'Small', 'Medium', 'Big'],
    icon: icons.lineHeightIcon,
  },
  {
    key: 'textAlign',
    label: 'Text Align',
    modes: [
      'Text Align',
      'Align Left',
      'Align Right',
      'Align Centre',
      'Justify',
    ],
    icon: icons.textAlignIcon,
  },
  {
    key: 'saturation',
    label: 'Saturation',
    modes: ['Saturation', 'Low Saturation', 'High Saturation', 'Desaturate'],
    icon: icons.saturationIcon,
  },
  {
    key: 'dictionary',
    label: 'Dictionary',
    boolean: true,
    icon: icons.dictionaryIcon,
  },
  {
    key: 'voiceSettings',
    label: 'Voice Settings',
    modes: [
      'Voice Settings',
      'Silent',
      'X-Soft',
      'Soft',
      'Medium',
      'Loud',
      'X-Loud',
    ],
    icon: icons.voiceIcon,
  },
];

const screenWidth = Dimensions.get('window').width;

const MainPage = ({navigation}) => {
  const {user} = useAuth();
  const {settings} = useSelector(state => state.settings);

  AccessibilityInfo.isScreenReaderEnabled().then(screensReaderEnabled => {
    console.log(`Screen reader is ${screensReaderEnabled ? 'on' : 'off'}.`);
  });

  const createInitialState = (options, settings) => {
    return options.reduce((acc, option) => {
      const defaultValue = option.boolean ? false : option.modes[0];
      const value =
        settings && settings.hasOwnProperty(option.key)
          ? settings[option.key]
          : defaultValue;
      acc[option.key] = value;
      return acc;
    }, {});
  };

  const [allModes, setAllModes] = useState(
    createInitialState(accessibilityOptions, settings),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      dispatch(saveUserSettings(user.id, allModes));
    });
    return unsubscribe;
  }, [navigation, allModes]);

  const handleModeChange = (key, isBoolean) => {
    const newAllModes = {...allModes};
    if (isBoolean) {
      newAllModes[key] = !allModes[key];
    } else {
      const currentIndex = accessibilityOptions
        .find(opt => opt.key === key)
        .modes.indexOf(allModes[key]);
      const nextIndex =
        (currentIndex + 1) %
        accessibilityOptions.find(opt => opt.key === key).modes.length;
      newAllModes[key] = accessibilityOptions.find(
        opt => opt.key === key,
      ).modes[nextIndex];
    }
    setAllModes(newAllModes);
  };

  const renderItem = option => {
    const {key, label, modes, boolean, warn} = option;

    let borderColor, color;

    if (boolean) {
      borderColor = !allModes[key] ? '#FBC4AB' : '#0048FF';
      color = !allModes[key] ? 'black' : '#0048FF';
    } else {
      const selected = modes?.indexOf(allModes[key]) === 0;
      borderColor = selected ? '#FBC4AB' : '#0048FF';
      color = selected ? 'black' : '#0048FF';
    }

    return (
      <TouchableOpacity
        key={key}
        onPress={() => handleModeChange(key, boolean)}
        style={styles.menuItemContainer}
      >
        {warn && (
          <Image source={icons.warningIcon} style={styles.warningIcon} />
        )}
        <View style={[styles.menuItemBackground, {borderColor}]}>
          <Image source={option.icon} style={styles.menuItemIcon} />
          <Text style={[styles.menuItemText, {color: color}]}>
            {boolean ? label : allModes[key]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <Invert>
    <View style={styles.container}>
      <Header
        visible={true}
        text={'Accessibility Menu'}
        color={'white'}
        editable={false}
      />
        <Text accessibilityLabel="Welcome to the app" accessibile={true}>
          Welcome to Accessibility menu
        </Text>
      <ScrollView>
        <View style={styles.menuContainer}>
          {accessibilityOptions.map(renderItem)}
        </View>
      </ScrollView>
    </View>
    //</Invert>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 100,
  },

  menuItemContainer: {
    width: (screenWidth - 52) / 2,
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 26.5,
  },
  menuItemIcon: {
    marginTop: 26.5,
    justifyContent: 'center',
  },
  warningIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 26,
    height: 26,
  },
  menuItemBackground: {
    flexDirection: 'column',
    backgroundColor: '#FFDAB91A',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderRadius: 20,
    width: '100%',
  },
});
