import React from 'react';
import { ProviderSelector } from './ProviderSelector';
import type { Provider } from '../types';
import CodexAgentSettingsCard from './CodexAgentSettingsCard';
import { Separator } from './ui/separator';

const DEFAULT_AGENT: Provider = 'codex';

const AgentsSettingsCard: React.FC = () => {
  const [agent, setAgent] = React.useState<Provider>(DEFAULT_AGENT);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="text-xs text-muted-foreground sm:shrink-0">Select an agent to configure.</div>
        <div className="w-full sm:flex-1">
          <ProviderSelector value={agent} onChange={setAgent} className="w-full" />
        </div>
      </div>

      <Separator className="border-border/60" />

      {agent === 'codex' ? (
        <CodexAgentSettingsCard />
      ) : (
        <p className="text-sm text-muted-foreground">No settings yet for this agent.</p>
      )}
    </div>
  );
};

export default AgentsSettingsCard;
