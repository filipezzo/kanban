import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useKanban } from '../../app/hooks/useKanban';
import { ISub, ITask } from '../../app/models/board';
import { BaseModal } from './base-modal';

interface ModalInfoProps {
  task: ITask | null;
  onModalClose(): void;
}

export function ModalInfo({ task, onModalClose }: ModalInfoProps) {
  const [checkbox, setCheckbox] = useState<ISub[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { onUpdateItem, onUpdateStatus } = useKanban();

  useEffect(() => {
    if (task) {
      setCheckbox(task.subtask);
    }
  }, [task]);

  useEffect(() => {
    const handleCloseModal = (event: MouseEvent) => {
      const  target  = event.target as Node;
      if (divRef.current && !divRef.current.contains(target)) {
        onModalClose();
        if (task) {
          onUpdateItem(task.id, checkbox);
        }
      }
    };
    window.addEventListener('mousedown', handleCloseModal);

    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [onModalClose, onUpdateItem, task, checkbox]);

  if (!task) return null;

  const handleChange = (id: string) => {
    const updatedInfo = checkbox.map((input) =>
      input.id === id ? { ...input, completed: !input.completed } : input
    );
    setCheckbox(updatedInfo);
  };

  return (
    <BaseModal>
      <div ref={divRef} className="rounded-lg max-w-2xl space-y-4 bg-neutral-900 p-8 w-full">
        <div className='flex items-center gap-2 justify-between'>
        <h2>{task.title}</h2>
        <button onClick={() => onUpdateStatus(task.id)} className='flex items-center gap-2'><ArrowRight /> change status</button>
          </div>
        <p className="text-neutral-500">{task.description}</p>
        <ul className="flex flex-col gap-4">
          {checkbox.length > 0 ? (
            checkbox.map((t) => (
              <li className="flex items-center p-2 rounded-md gap-4 bg-neutral-800" key={t.id}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleChange(t.id)}
                />
                <p className="flex-1">{t.text}</p>
              </li>
            ))
          ) : (
            <li>No subtask</li>
          )}
        </ul>
      </div>
    </BaseModal>
  );
}
