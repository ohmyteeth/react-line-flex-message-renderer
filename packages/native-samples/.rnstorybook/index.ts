import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startVrtAgent } from '@natsuneko-laboratory/react-native-visual-regression-test';

import { view } from './storybook.requires';

/**
 * This file is user-editable.
 *
 * Use it as your React Native Storybook entrypoint and wrap `StorybookUIRoot`
 * with application decorators/providers (theme, i18n, state, navigation, etc).
 */
const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

// Emitted by the on-device UI's dependencies. On Android the LogBox toast would show up in VRT screenshots.
LogBox.ignoreLogs(['[Reanimated] Dependencies should only be used on the web']);

if (__DEV__) {
  // Connects to `pnpm vrt` on this machine and does nothing until a test run starts.
  startVrtAgent({ view });
}

registerRootComponent(StorybookUIRoot);
