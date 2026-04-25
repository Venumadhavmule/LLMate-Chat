import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useChatStore, useUIStore } from '../../store';
import { WelcomeScreen } from '../welcome/WelcomeScreen';
import { MessageList } from './MessageList';

export function ChatArea() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeConversationId, setActiveConversation, conversations } = useChatStore();
  const { isGenerating } = useUIStore();

  // Sync URL ID to Store
  useEffect(() => {
    if (id && id !== activeConversationId) {
      const exists = conversations.some(c => c.id === id);
      if (exists) {
        setActiveConversation(id);
      } else {
        navigate('/', { replace: true });
      }
    } else if (!id && activeConversationId) {
      // If we are at root but have an active conversation, clear it in store or stay at root
      // In this app, root means WelcomeScreen
      setActiveConversation(null);
    }
  }, [id, activeConversationId, conversations, setActiveConversation, navigate]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  const handleRegenerate = (msgId: string) => {
    // We'll hook this up to useChat next
    console.log('Regenerate', msgId);
  };

  if (!id || !activeConversation || messages.length === 0) {
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
