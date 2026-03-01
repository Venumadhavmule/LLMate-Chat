import { TopBar } from '../topbar/TopBar';
import { ChatArea } from '../chat/ChatArea';
import { InputArea } from '../input/InputArea';

export function MainPanel() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      <TopBar />
      <div className="flex-1 overflow-hidden">
        <ChatArea />
      </div>
      <div className="px-4 pb-4 shrink-0 mx-auto w-full max-w-4xl">
        <InputArea />
      </div>
    </div>
  );
}
