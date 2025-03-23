import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState } from 'react';
import {appColors} from '../../constant/appColors';
import {fonts} from '../../constant/fonts';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from '../../utils/validation';

const SignupScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
  }>({});
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const handleSignup = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    

    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
      confirmPassword: confirmPasswordError || undefined,
      phoneNumber: phoneNumberError || undefined,
    });

    if (!emailError && !passwordError && !confirmPasswordError && !phoneNumberError) {
      console.log('Signup successful');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.navigate('WelcomeScreen')}>
        <Ionicons
          name={'arrow-back-outline'}
          color={appColors.primary}
          size={25}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name={'mail-outline'}
            size={30}
            color={appColors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={appColors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={'lock'}
            size={30}
            color={appColors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={appColors.secondary}
            secureTextEntry={isPasswordHidden}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
          <Ionicons
            name={isPasswordHidden ? "eye-off-outline" : "eye-outline"}
            size={25}
            color={appColors.secondary}
          />
        </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={'lock'}
            size={30}
            color={appColors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor={appColors.secondary}
            secureTextEntry={isConfirmPasswordHidden}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}>
          <Ionicons
            name={isConfirmPasswordHidden ? "eye-off-outline" : "eye-outline"}
            size={25}
            color={appColors.secondary}
          />
        </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={'screen-smartphone'}
            size={30}
            color={appColors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={appColors.secondary}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity
            style={styles.loginHighlight}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: appColors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    color: appColors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: appColors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    color: appColors.primary,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: appColors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: appColors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: appColors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: appColors.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: appColors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: appColors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 20,
    color: appColors.primary,
  },
  loginHighlight: {
    paddingVertical: 5,
    borderRadius: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
  },
});
