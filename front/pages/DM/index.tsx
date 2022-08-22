import React, { useCallback } from 'react';
import { Container, Header } from '@pages/DM/styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import { IDM, IUser } from '@typings/db';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';

const DM = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/members/${id}`, fetcher);
  // const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
  //   `/api/workspaces/${workspace}/dms/${id}/chats?parPage=20&page=1`,
  //   fetcher,
  // );

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: any) => {
      e.preventDefault();
      if (chat?.trim()) {
        // 만약 채팅이 존재하면
        axios // 채팅 등록
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
          .then(() => {
            // mutateChat();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat],
  );

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DM;
