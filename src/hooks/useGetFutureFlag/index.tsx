import { useContext } from 'react';
import { FeatureFlagContext } from '../../components/Context/FeatureFlag';

export const useGetFeatureFlagStatus = () => {
  const { featureFlagStatus } = useContext(FeatureFlagContext);

  return { featureFlagStatus };
};
