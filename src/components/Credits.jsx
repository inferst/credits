import { trackStore } from '@solid-primitives/deep';
import { Show, createEffect, createSignal } from 'solid-js';
import { Motion } from 'solid-motionone';

function Credits(props) {
  const [height, setHeight] = createSignal(0);

  let div;

  createEffect(() => {
    trackStore(props.state);
    setHeight(div.offsetHeight);
  });

  return (
    <div class="overflow-hidden h-screen text-white">
      <Motion.div
        ref={div}
        animate={{ y: [1080, -height()] }}
        onMotionComplete={props.onComplete}
        transition={{ duration: 20, easing: 'linear' }}
      >
        <div class="text-center text-[66px] mb-8">Thanks for watching!</div>
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
        <Show when={props.state.chatters.size > 0}>
          <div class="flex text-[42px] mb-4">
            <div class="flex-1 text-right mr-4">Chatters:</div>
            <div class="flex-1">
              {[...props.state.chatters].map((chatter) => (
                <div class="mb-2">{chatter}</div>
              ))}
            </div>
          </div>
        </Show>
        <div class="flex text-[42px] mb-4">
          <div class="flex-1 text-right mr-4">Streamer:</div>
          <div class="flex-1 mb-2">MikeRime</div>
        </div>
        <div class="flex items-center justify-center text-center text-[42px] mt-10">
          <div>See you</div>
          <div class='ml-2'><img src="/pixel-heart.png" alt="" width={80} /></div>
        </div>
      </Motion.div>
    </div>
  );
}

export default Credits;
