import React, { useCallback, useState } from 'react';
import { CollapseButton } from '@components/DMList/styles';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';

const ChannelList = () => {
  const [channelCollapse, setChannelCollapse] = useState(false);

  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            return (
              <NavLink
                key={channel.name}
                className={({ isActive }) => (isActive ? 'selected' : 'not')}
                to={`/workspace/${workspace}/channel/${encodeURIComponent(channel.name)}`}
              >
                <span># {channel.name}</span>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
