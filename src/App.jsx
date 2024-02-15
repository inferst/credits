import { Show, createSignal } from 'solid-js';
import { socket } from './socket/socket';
import Credits from './components/Credits';
import { createStore } from 'solid-js/store';

function App() {
  const [state, setState] = createStore({
    followers: new Set(),
    chatters: new Set(),
  });

  const [isStarted, setIsStarted] = createSignal(false);

  socket({
    onFollow: (followerName) => {
      if (!isStarted()) {
        setState('followers', (followers) => followers.add(followerName));
      }
    },
    onChatMessage: (chatterName) => {
      if (!isStarted()) {
        setState('chatters', (chatters) => chatters.add(chatterName));
      }
    },
    onStart: () => {
      setIsStarted(true);
    },
  });

  return (
    <Show when={isStarted()}>
      <Credits state={state} onComplete={() => {
        setIsStarted(false);
      }} />
    </Show>
  );
}

export default App;
