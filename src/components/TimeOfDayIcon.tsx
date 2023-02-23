import Time1 from './icons/time/Time1';
import Time2 from './icons/time/Time2';
import Time3 from './icons/time/Time3';
import Time4 from './icons/time/Time4';
import Time5 from './icons/time/Time5';
import Time6 from './icons/time/Time6';
import Time7 from './icons/time/Time7';
import Time8 from './icons/time/Time8';

interface TimeOfDayIconProps {
  Time: moment.Moment;
}

const TimeOfDayIcon = ({ Time }: TimeOfDayIconProps) => {
  const getContent = () => {
    const hour = Time.hour();
    switch (hour) {
      case 6:
      case 7:
      case 8:
        return <Time1 Size="x-small" />;
      case 9:
      case 10:
      case 11:
        return <Time2 Size="x-small" />;
      case 12:
      case 13:
      case 14:
        return <Time3 Size="x-small" />;
      case 15:
      case 16:
      case 17:
        return <Time4 Size="x-small" />;
      case 18:
      case 19:
      case 20:
        return <Time5 Size="x-small" />;
      case 21:
      case 22:
      case 23:
        return <Time6 Size="x-small" />;
      case 24:
      case 0:
      case 1:
      case 2:
        return <Time7 Size="x-small" />;
      case 3:
      case 4:
      case 5:
        return <Time8 Size="x-small" />;
    }
  };
  return getContent() || null;
};

export { TimeOfDayIcon };
