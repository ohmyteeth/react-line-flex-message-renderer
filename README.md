# LINE Flex Message Renderer

This is a React component library for rendering LINE Flex Messages.

https://developers.line.biz/ja/reference/messaging-api/#flex-message

## for Web

```bash
$ npm install @ohmyteeth/react-line-flex-message-renderer
```

and

```tsx
import { FlexMessageRenderer } from "@ohmyteeth/react-line-flex-message-renderer";

const flexMessageJson = `{ ... }`; // your flex message json

const renderWithoutEvent = () => <FlexMessageRenderer json={flexMessageJson} />;
const renderWithEvent = () => (
  <FlexMessageRenderer
    json={flexMessageJson}
    onAction={(action) => {
      console.log(action);
    }}
  />
);
```

## for React Native

```bash
$ npm install @ohmyteeth/react-native-line-flex-message-renderer
```

and

```tsx
import { FlexMessageRenderer } from "@ohmyteeth/react-native-line-flex-message-renderer";

const flexMessageJson = `{ ... }`; // your flex message json

const renderWithoutEvent = () => <FlexMessageRenderer json={flexMessageJson} />;
const renderWithEvent = () => (
  <FlexMessageRenderer
    json={flexMessageJson}
    onAction={(action) => {
      console.log(action);
    }}
  />
);
```

## License

MIT by [Oh my teeth, Co.](https://github.com/ohmyteeth)
