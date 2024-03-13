import { useState, useEffect, Children } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Carousel, Dropdown } from 'rsuite';
import Skeleton from 'react-loading-skeleton';
import Avatar from '../../../global_components/Avatar';
import CarouselHero from '../../../global_components/CarouselHero';

import {
  ClockIcon,
  CalendarIconGray,
  PinIcon,
  CouponIcon,
  ToiletIcon,
  CarParkIcon,
  PrayIcon,
  DogIcon,
  FoodIcon,
  WifiIcon,
  MedicalIcon,
  HearthIconOutline,
  DotIcon,
} from '../../../icons';
import formatDate from '../../../utils/formatDate';
import useEventContext from '../hook/useEventContext';
import EventMapLocation from './EventMapLocation';
import EventModalImage from './EventModalImage';
import { authMe } from '../../../api/auth';
import { createReminder, deleteReminder } from '../../../api/user';
import useAuth from '../../auth/hooks/auth';

export default function EventContainer() {
  const eventObj = useEventContext();
  const { event } = eventObj;

  const allAuthObj = useAuth();
  const { authUser } = allAuthObj;

  console.log(event);

  const navigate = useNavigate();

  const [isReminder, setIsReminder] = useState(false);
  const [authEvents, setAuthEvents] = useState(null);

  const { eventId } = useParams();
  const { loading } = useEventContext();

  const nevigate = useNavigate();
  const checkReminded = authEvents?.Reminder.filter(
    (el) => el.eventId === event?.id
  );

  const fetchAuthEvent = async () => {
    try {
      setLoading(true);
      const authEvent = await authMe();
      setAuthEvents(authEvent.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleReminderClick = async () => {
    if (!authUser) {
      navigate('/login');
    }
    await createReminder(+eventId);
    toast.success('keep to reminded');
    fetchAuthEvent();
  };

  const handleDelReminderClick = async () => {
    if (!authUser) {
      navigate('/login');
    }
    await deleteReminder(+eventId);
    toast.success('remove to your reminder');
    fetchAuthEvent();
  };

  useEffect(() => {
    fetchAuthEvent();
  }, []);

  // ================= loading Spinner ====================//
  if (loading) {
    return (
      <div className='flex flex-col gap-4'>
        {/* cover picture */}
        <div className='w-full'>
          {loading ? (
            <Skeleton height='400px' />
          ) : (
            <img className='object-contain ' src='' alt='' />
          )}
        </div>
        {/* header description */}
        <div className='border-2 rounded-xl px-4 py-2 flex flex-col gap-2 '>
          <h1 className='text-[1.5rem]'>{eventObj?.event?.title}</h1>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <ClockIcon />
              <span>
                {loading ? (
                  <Skeleton count='1.5' width='3rem' />
                ) : (
                  'Time Period'
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <CouponIcon />
              <span>
                {loading ? <Skeleton count='1.5' width='3rem' /> : 'Entrance'}{' '}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <CalendarIconGray />
            <span>
              {loading ? <Skeleton count='1.5' width='3rem' /> : 'Date'}
            </span>
          </div>
          <div className='flex justify-between'>
            <div className='border-2 p-2 rounded-xl'>
              <span>
                Start :&nbsp;
                {loading ? <Skeleton count='1' width='2rem' /> : 'start'}
              </span>
              <span>
                End : &nbsp;
                {loading ? <Skeleton count='1' width='2rem' /> : 'ending'}
              </span>
            </div>
            <div className='flex gap-2 items-baseline max-w-[10rem] '>
              <PinIcon className='w-[1rem] h-[1rem]' />
              <span>
                {loading ? <Skeleton count='1.5' width='3rem' /> : 'PinIcon'}
              </span>
              <p>{eventObj?.event?.EventAddress?.address}</p>
            </div>
          </div>
          <div />
        </div>
        {/* Host */}
        <div className='flex gap-3 items-center px-4'>
          {/* <Avatar size='w-[3rem]' /> */}
          <div>
            {loading ? (
              <Skeleton circle='true' width='3rem' height='3rem' />
            ) : (
              'Avatar'
            )}
          </div>
          <p>
            Hosted By :&nbsp;&nbsp;
            <span>{loading ? <Skeleton width='3rem' /> : 'Hosted by'}</span>
          </p>
        </div>
        {/* Description */}
        <div className='flex flex-col px-4'>
          <p className='text-[1.5rem] font-bold'>Description</p>
          <span>{loading ? <Skeleton count='3.5' /> : 'Descrption'}</span>
          <span>{loading ? <Skeleton count='3.5' /> : 'Descrption'}</span>

          <div className='flex justify-end py-4'>
            <div className='border flex items-center gap-2 p-2 rounded-full'>
              <HearthIconOutline />
              <div>Remind Me</div>
            </div>
          </div>
        </div>
        {/* Facility */}
        <div className='flex flex-col px-4 '>
          <p className='text-[1.5rem] font-bold'>Facility</p>
          <div className='flex gap-2 flex-wrap py-2'>
            {eventObj?.event?.EventFacility?.toilet ? (
              <div className='flex gap-3 items-center'>
                <ToiletIcon /> Toilet
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.parking ? (
              <div className='flex gap-2 items-center'>
                <CarParkIcon /> Park
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.meditationRoom ? (
              <div className='flex gap-2 items-center'>
                <PrayIcon /> Pray room
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.petFriend ? (
              <div className='flex gap-2 items-center'>
                <DogIcon /> Pet
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.food ? (
              <div className='flex gap-2 items-center'>
                <FoodIcon /> Food Store
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.wifi ? (
              <div className='flex gap-2 items-center'>
                <WifiIcon /> Free Wi-fi
              </div>
            ) : null}
            {eventObj?.event?.EventFacility?.medicalService ? (
              <div className='flex gap-2 items-center'>
                <MedicalIcon /> Medical Store
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='h-dvh mx-auto flex justify-center items-center loading loading-spinner loading-lg'>
        loading...
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-4 '>
      {/* cover picture */}
      <div className='w-full flex justify-center h-[36vh] mx-auto'>
        <img
          className='object-cover w-[100%]'
          src={eventObj.event?.coverImage}
          alt=''
        />
      </div>
      {/* header description */}
      <div className='border-2 rounded-xl px-4 py-2 flex flex-col gap-2 '>
        <h1 className='text-[1.5rem] font-semibold'>
          {eventObj?.event?.title}
        </h1>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <ClockIcon />
            {eventObj.event?.timePeriod}
          </div>
          <div className='flex items-center gap-2'>
            <CouponIcon />
            Entrance:
            {eventObj?.event?.EventFacility?.entranceFee ? (
              <span className='text-green-500'>Free </span>
            ) : (
              <span className='text-amber-500'>Paid </span>
            )}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarIconGray />
          Date
        </div>
        <div className='flex justify-between'>
          <div className='border-2 p-2 rounded-xl'>
            <p>Start : {formatDate(eventObj.event?.startDate)}</p>
            <p>End : {formatDate(eventObj.event?.endDate)}</p>
          </div>
          <div className='flex gap-2 items-baseline max-w-[10rem] '>
            <div>
              <PinIcon className='w-[1rem] h-[1rem]' />
            </div>
            <p>{eventObj?.event?.EventAddress?.address}</p>
          </div>
        </div>
        <div />
      </div>
      {/* Host */}
      <div className='flex justify-between items-center  px-4'>
        <div className='flex items-center justify-center gap-3'>
          <Avatar
            src={eventObj?.event?.organizerInformation?.user?.profileImage}
          />
          <p>
            Hosted By : {eventObj?.event?.organizerInformation?.officialName}
          </p>
        </div>

        {authUser?.id === event?.organizerInformationId && (
          <div className=''>
            <Dropdown icon={<DotIcon />} size='xs' placement='bottomEnd'>
              <button
                type='button'
                onClick={() => nevigate(`/editevent/${eventId}`)}
              >
                <Dropdown.Item>Edit Event</Dropdown.Item>
              </button>
              <Dropdown.Item>Delete Event</Dropdown.Item>
            </Dropdown>
          </div>
        )}
      </div>
      {/* Description */}
      <div className='flex flex-col px-4 '>
        <p className='text-[1.5rem] font-bold'>Description</p>
        <span className='break-all'>{eventObj?.event?.description}</span>
        <div className='flex justify-end py-4'>
          <div className='border-2 border-red-400 flex items-center justify-center gap-2 p-2 rounded-full'>
            {authUser ? (
              <div>
                {checkReminded?.length === 0 ? (
                  <button
                    type='button'
                    onClick={handleReminderClick}
                    aria-label='Save'
                  >
                    <HearthIconOutline />
                  </button>
                ) : (
                  <button
                    type='button'
                    aria-label='Save'
                    onClick={handleDelReminderClick}
                  >
                    <HearthIconOutline className='fill-red-500' />
                  </button>
                )}
              </div>
            ) : (
              <button
                type='button'
                aria-label='Save'
                onClick={handleDelReminderClick}
              >
                <HearthIconOutline />
              </button>
            )}

            <div className='text-red-400 text-[0.75rem]'>Remind Me</div>
          </div>
        </div>
      </div>
      {/* Facility */}
      <div className='flex flex-col px-4 '>
        <p className='text-[1.5rem] font-bold'>Facility</p>
        <div className='flex gap-2 flex-wrap py-2'>
          {eventObj?.event?.EventFacility?.toilet ? (
            <div className='flex gap-3 items-center'>
              <ToiletIcon /> Toilet
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.parking ? (
            <div className='flex gap-2 items-center'>
              <CarParkIcon /> Park
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.prayerRoom ? (
            <div className='flex gap-2 items-center'>
              <PrayIcon /> Pray room
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.petFriend ? (
            <div className='flex gap-2 items-center'>
              <DogIcon /> Pet
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.food ? (
            <div className='flex gap-2 items-center'>
              <FoodIcon /> Food Store
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.wifi ? (
            <div className='flex gap-2 items-center'>
              <WifiIcon /> Free Wi-fi
            </div>
          ) : null}
          {eventObj?.event?.EventFacility?.medicalService ? (
            <div className='flex gap-2 items-center'>
              <MedicalIcon /> Medical Store
            </div>
          ) : null}
        </div>
      </div>
      {/* Carousel Preview */}
      {event?.EventImage.length > 0 && (
        <Carousel autoplay>
          {event.EventImage.map((el) => (
            <img
              key={el.id}
              src={el.image}
              height='100'
              alt=''
              className='object-cover'
            />
          ))}
        </Carousel>
      )}
      {authUser?.id === event?.organizerInformationId ? (
        <EventModalImage />
      ) : null}

      {eventObj?.event && <EventMapLocation />}
    </div>
  );
}
