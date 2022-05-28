/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import WebView from 'react-native-webview';

enum Status {
  WAITING = 'waiting',
  READY = 'ready',
  ERROR = 'error',
}

const BUNDLE_URL = 'https://github.com/leegeunhyeok/leegeunhyeok/files/8791678/bundle.zip';

const App = () => {
  const [status, setStatus] = useState(Status.WAITING);
  const [resourcePath, setResourcePath] = useState('');

  useEffect(() => {
    Promise.all([
      (WebView as any).getResourcePath(),
      (WebView as any).downloadBundle(BUNDLE_URL),
    ]).then(([path, result]) => {
      setResourcePath(path);
      setStatus(Status.READY);
      console.log('downloadBundle()', { path, result });
    }).catch((error) => {
      setStatus(Status.ERROR);
      console.error('WebView', error)
    });
  }, []);

  const uri = `file://${resourcePath}/dist/index.html`;

  const renderWebView = () => {
    if (status === Status.ERROR) {
      return <Text>Error!!!</Text>;
    } else if (resourcePath && status === Status.READY) {
      return (
        <WebView
          source={{ uri }}
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
        />
      );
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderWebView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
