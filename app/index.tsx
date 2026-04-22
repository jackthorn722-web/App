import { Redirect } from 'expo-router';
import { useTopicStore } from '@/store/useTopicStore';

export default function Index() {
  const onboardingComplete = useTopicStore((s) => s.onboardingComplete);

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/feed" />;
}
