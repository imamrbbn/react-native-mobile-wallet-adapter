import React from 'react';
import WebViewWrapper from '../components/WebView';
import {StyleSheet, Text, View} from 'react-native';

const walletAddress = '';

const MainScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>I'm a Wallet!</Text>
        <Text>Address: {walletAddress}</Text>
      </View>
      <WebViewWrapper walletAddress={walletAddress} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
