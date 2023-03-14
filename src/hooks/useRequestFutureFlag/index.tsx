import { useEffect } from 'react';
import { featureFlag } from '../../store/FeatureFlag';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectFeatureFlag } from '../../store/Selectors';

export const useRequestFutureFlag = () => {
  const dispatch = useAppDispatch();
  const { featureFlagStatus, status, errorText, codeStatus } = useAppSelector(selectFeatureFlag);

  useEffect(() => {
    dispatch(featureFlag());
  }, []);

  return { featureFlagStatus, status, errorText, codeStatus };
};
