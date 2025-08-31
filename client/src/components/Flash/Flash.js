import { useEffect, useRef, useState } from 'react';
import Bus from '../Utilities/Bus';
import '../../index.css';

export default function Flash() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('success');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handler = ({ message, type = 'success', delay = 3000 }) => {
      // clear any previous timers
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setMsg(message);
      setType(type);
      setOpen(true);

      // auto-dismiss
      timeoutRef.current = setTimeout(() => setOpen(false), delay);
    };

    // Subscribe
    Bus.addListener('flash', handler);

    // Cleanup
    return () => {
      Bus.removeListener('flash', handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!open) return null;

  return (
    <div className={`alert alert-${type}`} role="alert" aria-live="polite">
      <button
        className="close"
        aria-label="Close notification"
        onClick={() => setOpen(false)}
      >
        ×
      </button>
      <p>{msg}</p>
    </div>
  );
}
