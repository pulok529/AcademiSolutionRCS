import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export interface ConfirmOptions {
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
}

export const confirmDialog = async ({
  title,
  text = 'This action cannot be undone.',
  confirmButtonText = 'Yes, proceed',
  cancelButtonText = 'Cancel',
  icon = 'warning',
}: ConfirmOptions): Promise<boolean> => {
  const result = await MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#2563eb', // Paces brand accent
    cancelButtonColor: '#94a3b8',
    confirmButtonText,
    cancelButtonText,
    customClass: {
      popup: 'rounded-2xl border border-slate-100 shadow-2xl font-sans',
      title: 'text-lg font-bold text-slate-800',
      htmlContainer: 'text-xs text-slate-500',
      confirmButton: 'px-4 py-2 text-xs font-semibold rounded-lg shadow-sm',
      cancelButton: 'px-4 py-2 text-xs font-semibold rounded-lg shadow-sm',
    },
  });

  return result.isConfirmed;
};
