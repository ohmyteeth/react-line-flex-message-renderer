import { useVrtPending, withVrt } from '@natsuneko-laboratory/react-native-visual-regression-test';
import type { Preview } from '@storybook/react-native';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#849ebf',
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  }
});

// Collects the remote image URLs (image and icon components) in a Flex Message JSON.
const collectImageUrls = (node: unknown, urls = new Set<string>()): Set<string> => {
  if (Array.isArray(node)) {
    for (const child of node) collectImageUrls(child, urls);
  } else if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if ((record.type === 'image' || record.type === 'icon') && typeof record.url === 'string') {
      urls.add(record.url);
    }
    for (const value of Object.values(record)) collectImageUrls(value, urls);
  }
  return urls;
};

// Renders the story only after its remote images are in the cache, and holds the VRT capture until then,
// so that screenshots never catch an image halfway through loading.
const PrefetchImages = ({ json, children }: { json: string; children: ReactNode }) => {
  const urls = useMemo(() => {
    try {
      return [...collectImageUrls(JSON.parse(json))];
    } catch {
      return [];
    }
  }, [json]);
  const [readyFor, setReadyFor] = useState<string[] | null>(null);
  const ready = readyFor === urls;
  useVrtPending(!ready);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled(urls.map((url) => Image.prefetch(url))).then(() => {
      if (!cancelled) setReadyFor(urls);
    });
    return () => {
      cancelled = true;
    };
  }, [urls]);

  return ready ? children : null;
};

const preview: Preview = {
  // The first decorator is the innermost: the VRT boundary wraps only the rendered message, not the background.
  decorators: [
    (story, context) =>
      typeof context.args.json === 'string'
        ? <PrefetchImages json={context.args.json}>{story()}</PrefetchImages>
        : story(),
    withVrt,
    // A vertical ScrollView, like a chat, so that a carousel (a horizontal ScrollView) keeps its natural height
    // instead of stretching to the screen, where Android screenshots would pick up overlays such as Storybook's buttons.
    (story) => <ScrollView style={Styles.container} contentContainerStyle={Styles.content}>{story()}</ScrollView>
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    vrt: {
      // Cached images still decode asynchronously after they mount.
      settleMs: 500,
    },
  },
};

export default preview;
