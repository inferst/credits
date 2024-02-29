import { trackStore } from '@solid-primitives/deep';
import { Heart } from 'lucide-solid';
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';
import { Motion } from 'solid-motionone';

function Credits(props) {
  const [height, setHeight] = createSignal(0);

  let div;

  createEffect(() => {
    trackStore(props.state);
    setHeight(div.offsetHeight);
  });

  const isBestChatter = createMemo(() => {
    const chatters = props.state.chatters;

    return (chatterName) => {
      const messages = Object.values(chatters).map(
        (chatter) => chatter.messages
      );
      return Math.max(...messages) <= chatters[chatterName].messages;
    };
  });

  const chatters = createMemo(() => Object.keys(props.state.chatters));

  return (
    <div class="overflow-hidden h-screen text-white">
      <Motion.div
        ref={div}
        animate={{ y: [1080, -height()] }}
        onMotionComplete={props.onComplete}
        transition={{ duration: 20, easing: 'linear' }}
      >
        <div class="text-center text-[65px] mb-8">Thanks for watching!</div>
        <Show when={props.state.followers.size > 0}>
          <div class="flex text-[42px] mb-4">
            <div class="flex-1 text-right mr-4">New followers:</div>
            <div class="flex-1">
              {[...props.state.followers].map((follower) => (
                <div class="mb-2">{follower}</div>
              ))}
            </div>
          </div>
        </Show>
        <Show when={chatters().length > 0}>
          <div class="flex text-[42px] mb-4">
            <div class="flex-1 text-right mr-4">Chatters:</div>
            <div class="flex-1">
              <For each={chatters()}>
                {(chatter) => (
                  <div class="mb-2 flex items-center">
                    <div>{chatter}</div>
                    <div class="ml-2">
                      <Show when={isBestChatter()(chatter)}>
                        <Heart size={42} fill="red" />
                      </Show>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
        <div class="flex text-[42px] mb-4">
          <div class="flex-1 text-right mr-4">Streamer:</div>
          <div class="flex-1 mb-2">MikeRime</div>
        </div>
        <div class="flex items-center justify-center text-center text-[42px] mt-10">
          <div class="mr-2">
            <Heart size={42} fill="red" />
          </div>
          <div>See you</div>
          <div class="ml-2">
            <Heart size={42} fill="red" />
          </div>
        </div>
      </Motion.div>
    </div>
  );
}

export default Credits;
