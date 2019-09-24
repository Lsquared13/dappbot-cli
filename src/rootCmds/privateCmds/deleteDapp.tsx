import React from 'react';
import { Argv } from 'yargs';
import { App, PrettyRequest, ApiMethodLabel } from '../../ui';
import { ArgShape, DappNameArg } from '../../cli';
import { RootResources } from '@eximchain/dappbot-types/spec/methods';
import { requireAuthData, fastRender } from '../../services/util';
import { DeleteDapp } from '@eximchain/dappbot-types/spec/methods/private';

export const command = `${RootResources.private}/deleteDapp <DappName>`;

export const desc = 'Delete one of your Dapps.';

export function builder(yargs:Argv) {
  yargs.middleware(requireAuthData);
}

export function handler(args:ArgShape<DappNameArg>) {
  fastRender(
    <App args={args} renderFunc={({ API }) => {
      const DappName = args.DappName;
      return (
        <PrettyRequest 
          operation={ApiMethodLabel(DeleteDapp.HTTP, DeleteDapp.Path(DappName))}
          req={() => API.private.deleteDapp.resource(DappName)} />
      )
    }} />
  )
}