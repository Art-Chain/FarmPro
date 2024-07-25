import { AppShell, EmptyView } from '@/pages/components';
import { useQuery } from '@tanstack/react-query';
import { contentPurposeToString, contentTypeToString, fetchContents } from '@/api';
import { Space } from '@/ui/common';
import { ContentCard } from '@/pages/main/components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const ContentListPage = () => {
  const navigation = useNavigation();

  const { data, error } = useQuery({
    queryKey: ['contents'],
    queryFn: fetchContents,
  });
  console.log('contentList', data, error);

  return (
    <AppShell footer={<Space size={62}/>} contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}>
      {data?.contents.map((content) => (<React.Fragment key={content.id}>
        <ContentCard
          tags={[contentPurposeToString(content.contentPurpose), contentTypeToString(content.contentType)]}
          title={content.title}
          description={content.mainText ?? '내용 없음'}
          source={content.images.images[0] ? { uri: content.images.images[0].imageUrl } : undefined}
          onPress={() => navigation.navigate('contentView', { content })}
        />
        <Space size={16}/>
      </React.Fragment>))}
      <EmptyView data={data?.contents} />
    </AppShell>
  );
};