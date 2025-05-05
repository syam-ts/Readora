import { Toaster, toast } from 'sonner';


export const Sonner = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <button className='hidden' onClick={() => toast.error('M')}></button>
    </div>
  );
}