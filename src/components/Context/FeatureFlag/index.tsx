import { createContext, FC, ReactNode } from 'react';
import { useRequestFutureFlag } from '../../../hooks/useRequestFutureFlag';

export interface FeatureFlagContextProps {
  featureFlagStatus: boolean | null;
}

export const FeatureFlagContext = createContext<FeatureFlagContextProps | null>(null);

export const FeatureFlagProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { featureFlagStatus, status, errorText, codeStatus } = useRequestFutureFlag();

  const value = { featureFlagStatus };

  return (
    <>
      {status === 'loading' && <div>loading...</div>}
      {status === 'error' && (
        <div>
          {codeStatus}
          {errorText}
        </div>
      )}
      {status === 'success' && <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>}
    </>
  );
};
