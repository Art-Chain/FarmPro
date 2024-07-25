import { AppShell } from '@/pages/components';
import { useQuery } from '@tanstack/react-query';
import { fetchContents } from '@/api';
import { Space } from '@/ui/common';
import { ContentCard } from '@/pages/main/components';
import React from 'react';

export const ContentListPage = () => {
  const { data } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchContents,
  });

  return (
    <AppShell footer={<Space size={62}/>} contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}>
      {data?.contents.map((content) => (<React.Fragment key={content.id}>
          <ContentCard
            title={content.mainText}
          />
          <Space size={16}/>
        </React.Fragment>
      ))}
    </AppShell>
  );
};