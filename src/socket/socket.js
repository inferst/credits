export const socket = (props) => {
  const connect = () => {
    const ws = new WebSocket('ws://127.0.0.1:8080/');

    const subscribe = {
      request: 'Subscribe',
      id: 'alerts',
      events: {
        Twitch: ['Follow', 'ChatMessage'],
        Raw: ['Action'],
      },
    };

    ws.onopen = function () {
      ws.send(JSON.stringify(subscribe));
      ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.event) {
          if (data.event.source == 'Twitch') {
            switch (data.event.type) {
              case 'Follow': {
                props.onFollow(data.data.user_name);
                break;
              }
              case 'ChatMessage': {
                props.onChatMessage(data.data.message.displayName);
                break;
              }
            }
          } else if (data.event.source == 'Raw') {
            if (data.data.name == 'Switch to End Scene') {
              props.onStart();
            }
          }
        }
      };

      console.log('Connected');
    };

    ws.onclose = function () {
      setTimeout(() => {
        connect();
      }, 10000);

      console.log('Closed');
    };

    ws.onerror = function (error) {
      console.log('Error', error);
    };
  };

  connect();
};
