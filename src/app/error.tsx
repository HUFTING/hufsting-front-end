'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div>알 수 없는 오류입니다.</div>
      <div>{error.message}</div>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Try again
      </button>
    </>
  );
}
