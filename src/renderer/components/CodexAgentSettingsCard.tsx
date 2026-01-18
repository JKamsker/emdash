import React from 'react';
import { Checkbox } from './ui/checkbox';

const CodexAgentSettingsCard: React.FC = () => {
  const [useYolo, setUseYolo] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await window.electronAPI.getSettings();
        if (result.success && result.settings) {
          const autoApproveFlag =
            result.settings.agents?.providerOverrides?.codex?.autoApproveFlag ?? '--full-auto';
          setUseYolo(autoApproveFlag === '--yolo');
        }
      } catch (error) {
        console.error('Failed to load Codex agent settings:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateUseYolo = async (next: boolean) => {
    setUseYolo(next);
    try {
      await window.electronAPI.updateSettings({
        agents: { providerOverrides: { codex: { autoApproveFlag: next ? '--yolo' : '--full-auto' } } },
      });
    } catch (error) {
      console.error('Failed to update Codex agent settings:', error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">Configure flags used when launching Codex.</div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={useYolo}
          disabled={loading}
          onCheckedChange={(checked) => updateUseYolo(checked === true)}
        />
        Run without sandbox (--yolo)
      </label>

    </div>
  );
};

export default CodexAgentSettingsCard;
