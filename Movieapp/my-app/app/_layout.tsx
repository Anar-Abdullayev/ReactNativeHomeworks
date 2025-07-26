import { resetDb } from '@/lib/DbFromFileService';
import { useEffect } from 'react';
import 'react-native-reanimated';
import TabNavigator from './navigation/TabNavigator';

export default function RootLayout() {
  useEffect(() => {
    (async () => await resetDb())();
  }, [])
  return (
    <>
      <TabNavigator />
    </>
  );
}
