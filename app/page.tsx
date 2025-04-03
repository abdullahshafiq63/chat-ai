"use client"

import { useEffect, useState } from "react";
import type {
  ChannelFilters,
  ChannelSort,
  ChannelOptions,
  User,
  Channel as StreamChannel,
} from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import MyChannelHeader from "./MyChannelHeader";
import MyMessage from "./MyMessage";
import MyAIStateIndicator from "./MyAIStateIndicator";

const apiKey = "7dw7hvsnsupg";
const userId = "learner-99";
const userName = "Learner 99";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVhcm5lci05OSJ9.4IkH1tLqNRHvlxM1ZTJa1Kw6N-8Dnve-oD2FQfMNpxU";

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

const sort: ChannelSort = { last_message_at: -1 };
const filters: ChannelFilters = {
  type: 'messaging',
  members: { $in: [userId] },
};
const options: ChannelOptions = {
  limit: 10,
};

const App = () => {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', 'ai_coach_1', {
      image: 'https://getstream.io/random_png/?name=ai',
      name: 'AI Coach',
      members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel Message={MyMessage}>
        <Window>
          <MyChannelHeader />
          <MessageList />
          <MyAIStateIndicator />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
