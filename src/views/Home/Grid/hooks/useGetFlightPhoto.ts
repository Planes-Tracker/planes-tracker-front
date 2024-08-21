import type { Flight } from '@/services/flight/types';
import {
  useGetPhotoByHexQuery,
  useGetPhotoByRegQuery,
} from '@/services/planespotters/api';

const useGetFlightPhoto = (flight: Flight) => {
  const shouldFetchByIcao = !!flight.icaoAddress;
  const shouldFetchByReg = !flight.icaoAddress && !!flight.registration;

  const { data: icaoPhoto } = useGetPhotoByHexQuery(flight.icaoAddress, {
    skip: !shouldFetchByIcao,
  });
  const { data: regPhoto } = useGetPhotoByRegQuery(flight.registration, {
    skip: !shouldFetchByReg,
  });

  const data = shouldFetchByIcao
    ? icaoPhoto
    : shouldFetchByReg
    ? regPhoto
    : null;

  if (data?.photos.length === 0)
    return {
      src: undefined,
      link: undefined,
    };

  return {
    src: data?.photos[0]?.thumbnail?.src,
    link: data?.photos[0].link,
  };
};

export default useGetFlightPhoto;
