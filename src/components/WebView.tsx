import React, {useMemo, useRef} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import mobileWalletStandardAdapter from '../script/mobileWalletStandardAdapter';

const uri = 'https://marinade.finance/app/';

type Props = {
  walletAddress: string;
};

const WebViewWrapper = ({walletAddress}: Props) => {
  const webViewRef = useRef<WebView>(null);

  const MWAScript = useMemo(() => {
    const injectedWalletAddress = mobileWalletStandardAdapter.replace(
      'SOLANA_WALLET_ADDRESS',
      walletAddress,
    );

    return `${injectedWalletAddress}\ntrue;`;
  }, [walletAddress]);

  const onMessage = async (event: WebViewMessageEvent) => {
    let data;
    try {
      const parsedData = JSON.parse(event.nativeEvent.data);
      data = parsedData;
    } catch (error) {
      data = event.nativeEvent.data;
    }

    try {
      if (data.method === 'signTransaction') {
        // handle sign transaction here
        console.log(data);

        return;
      }

      if (data.method === 'signMessage') {
        // handle sign message here
        console.log(data);

        return;
      }
    } catch (error) {
      console.log({error});
    }
  };
  return (
    <WebView
      ref={webViewRef}
      source={{uri}}
      injectedJavaScriptBeforeContentLoaded={MWAScript}
      onMessage={onMessage}
      startInLoadingState
      style={{flex: 1}}
      pullToRefreshEnabled
    />
  );
};

export default WebViewWrapper;
