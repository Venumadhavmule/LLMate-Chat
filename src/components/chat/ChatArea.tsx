import { useChatStore, useUIStore } from '../../store';
import { WelcomeScreen } from '../welcome/WelcomeScreen';
import { MessageList } from './MessageList';

export function ChatArea() {
  const { activeConversationId, conversations } = useChatStore();
  const { isGenerating } = useUIStore();

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  const handleRegenerate = (msgId: string) => {
    // We'll hook this up to useChat next
    console.log('Regenerate', msgId);
  };

  if (!activeConversation || messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      <MessageList
        messages={messages}
        isGenerating={isGenerating}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
