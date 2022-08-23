import React, { FC, RefObject, useCallback } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IChat, IDM } from '@typings/db';
import Chat from '@components/Chat';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';

interface Props {
  chatSections: { [ket: string]: IDM[] };
  scrollbarRef: RefObject<Scrollbars>;
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd?: boolean;
}

const ChatList: FC<Props> = ({ chatSections, scrollbarRef, setSize, isEmpty, isReachingEnd }) => {
  const onScroll = useCallback(
    (values: positionValues) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        console.log('스크롤이 가장 위');
        setSize((size) => size + 1).then(() => {
          // 스크롤 유지
          scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
        });
      }
    },
    [setSize, scrollbarRef, isEmpty, isReachingEnd],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
