import { useState } from 'react';
import { useUIStore } from '../../store';
import { Modal, ModalContent } from '../ui/Modal';
import { GeneralSettings } from './GeneralSettings';
import { APISettings } from './APISettings';
import { AppearanceSettings } from './AppearanceSettings';
import { LuUser as User, LuKey as Key, LuPalette as Palette, LuKeyboard as Keyboard, LuShield as Shield } from 'react-icons/lu';
import { cn } from '../../utils/cn';

export function SettingsModal() {
  const { activeModal, closeModal } = useUIStore();
  const [activeTab, setActiveTab] = useState('general');

  const isOpen = activeModal === 'settings';

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <ModalContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden bg-[var(--color-bg)]">
        <div className="flex h-full">
          {/* Sidebar Tabs */}
          <div className="w-48 md:w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] p-4 flex flex-col gap-1 shrink-0">
            <h2 className="font-semibold text-lg mb-4 text-[var(--color-text)]">Settings</h2>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors",
                  activeTab === tab.id
                    ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-medium shadow-sm"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'api' && <APISettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'shortcuts' && (
              <div className="text-[var(--color-text-muted)]">Keyboard shortcuts documentation coming soon.</div>
            )}
            {activeTab === 'privacy' && (
              <div className="text-[var(--color-text-muted)]">Privacy settings coming soon.</div>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
