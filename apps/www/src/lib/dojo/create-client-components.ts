import { overridableComponent } from '@dojoengine/recs';

import { ContractComponents } from './generated/contract-components';

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: ContractComponents;
}) {
  return {
    ...contractComponents,
  };
}
