import PageContainer from '@/components/page/PageContainer';
import FlightsGrid from '@/views/Home/Grid';
import PhotosWarning from '@/views/Home/PhotosWarning';

function Home() {
  return (
    <PageContainer>
      <PhotosWarning />
      <FlightsGrid />
    </PageContainer>
  );
}

export default Home;
