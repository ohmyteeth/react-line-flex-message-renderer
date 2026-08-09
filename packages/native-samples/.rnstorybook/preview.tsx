import type { Preview } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#849ebf',
    width: '100%',
    height: '100%',
    padding: 20,
  }
});

const preview: Preview = {
  decorators: [
    (story) => <View style={Styles.container}>{story()}</View>
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
