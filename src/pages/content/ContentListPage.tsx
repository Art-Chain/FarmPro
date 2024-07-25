import { AppShell } from '@/pages/components';
import { useQuery } from '@tanstack/react-query';
import { fetchContents } from '@/api';
import { Space } from '@/ui/common';
import { ContentCard } from '@/pages/main/components';

export const ContentListPage = () => {
  const { data } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchContents,
  });

  return (
    <AppShell footer={<Space size={62}/>}>
      {data?.contents.map((content) => (
        <ContentCard
          key={content.id}
          title={content.mainText}
        />
      ))}
    </AppShell>
  );
};