import { MapPin, Compass } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-24',  // Adjusted for wide logo
    md: 'w-32',
    lg: 'w-48',
    xl: 'w-96',
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="Adventure Holidays"
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};

export default Logo;
