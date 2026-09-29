# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Visual regression tests

Every Storybook story is captured on the simulator with [`@natsuneko-laboratory/react-native-visual-regression-test`](https://github.com/mika-f/react-native-visual-regression-test) and compared with the baselines in `__vrt__/`.

The module contains native code, so it needs a development build (Expo Go does not work):

```bash
pnpm turbo run build --filter=@ohmyteeth/react-native-line-flex-message-renderer...
pnpm ios        # expo run:ios (set LANG=en_US.UTF-8 if `pod install` fails with an encoding error)
pnpm android    # expo run:android
pnpm vrt        # in another terminal, while the app is running (vrt:ios / vrt:android when both are running)
pnpm vrt:update # after an intended visual change
```

Baselines are kept per platform and were taken on these devices; use the same ones to compare with them:

| Platform | Device |
| --- | --- |
| iOS | iPhone 17 Pro simulator, iOS 26.5 |
| Android | Pixel 10 Pro emulator, Android 17 (API 37) |

Android 17 asks for the local network permission on first launch. Allow it, or grant it ahead of time:

```bash
adb shell pm grant com.natsuneko.reactnativelineflexmessagerenderersample android.permission.ACCESS_LOCAL_NETWORK
```

Android captures the pixels on screen, so keep stories free of overlays (LogBox toasts, Storybook's buttons). On failure, `expected | actual | diff` images are written to `__vrt__/<platform>/__diffs__/`.

### CI

The [VRT workflow](../../.github/workflows/on-pull_request-vrt.yml) runs both platforms on pull requests that touch the renderer or the samples. Failed runs upload the diff images as the `vrt-<platform>-diffs` artifact.

To update baselines from CI (for example, when the CI emulator renders slightly differently from yours), run the workflow manually with **update** checked, download the `vrt-<platform>-baselines` artifact, and commit its files to `__vrt__/<platform>/`.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
