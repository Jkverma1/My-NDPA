import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import menuIcon from '../../../assets/icons/mdi_menu.png';
import closeIcon from '../../../assets/icons/m_close_ico.png';

const Header = ({ visible, text, color, editable, chatSidebar = false ,editMode=false, setEdit, goBack=false}) => {
  const navigation = useNavigation();
  const [buttonText, setButtonText] = useState("Edit")

  const handleMenuPress = () => {
    navigation.navigate('ChatSidebar');
  };

  const handleEdit = ()=> {
    if(buttonText === "Edit"){
      setButtonText("Cancel")
    }
    else{
      setButtonText("Edit")
    }
    setEdit((edit)=> { return !edit})
  }

  const handleBack = () => {
    if(goBack){
      navigation.navigate(goBack)
    }
    else navigation.goBack()
  }

  return visible ? (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBack}
        >
          <Image
            source={require('../../../assets/icons/left_ico.png')}
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: '#F08080', marginLeft: 5 }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text numberOfLines={1} style={[styles.text, { color: '#1E1D20' }]}>{text}</Text>
      </View>
      <View style={styles.right}>
        {editMode && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Text style={styles.editButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
        {editable && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Image source={closeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {chatSidebar && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleMenuPress} 
          >
            <Image source={menuIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  left: {
    flex: 1,
  },
  center: {
    flex: "auto",
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1D20',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  editButton: {
    backgroundColor: '#F08080',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  editButtonText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21.79,
    textAlign: 'center',
    flexWrap: "nowrap",
    color: 'white',
  },
});

export default Header;
