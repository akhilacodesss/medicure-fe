export default function Loader({ small }) {
  return (
    <div className={`flex items-center justify-center ${small ? 'py-4' : 'py-20'}`}>
      <div className={`animate-spin rounded-full border-4 border-primary-100 border-t-primary-600 ${small ? 'h-6 w-6' : 'h-12 w-12'}`} />
    </div>
  );
}
